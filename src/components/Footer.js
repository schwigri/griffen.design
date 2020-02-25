import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link, useStaticQuery } from 'gatsby';

function Footer({ locale }) {
	const data = useStaticQuery(
		graphql`
			query FooterQuery {
				footers: allDatoCmsFooter {
					edges {
						node {
							locale
							copyright
						}
					}
				}
				privacyPolicies: allDatoCmsPrivacyPolicy {
					edges {
						node {
							locale
							title
							slug
							metaTags {
								title
							}
						}
					}
				}
			}
		`
	);

	const copyrightText = data.footers.edges.filter(
		x => locale === x.node.locale
	)[0].node.copyright;

	const privacyPolicy = data.privacyPolicies.edges.filter(
		x => locale === x.node.locale
	)[0].node;

	const privacyLink = (
		<span className="privacy-link">
			<Link
				to={
					locale === 'en'
						? `/${privacyPolicy.slug}`
						: `/${locale}/${privacyPolicy.slug}/`
				}
			>
				{privacyPolicy.metaTags.title}
			</Link>
		</span>
	);

	return (
		<footer className="site-footer">
			<div className="footer-inner">
				<p>
					{copyrightText}
					{privacyLink}
				</p>
			</div>
		</footer>
	);
}

Footer.propTypes = {
	locale: PropTypes.string.isRequired,
};

export default Footer;
