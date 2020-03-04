import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { motion } from 'framer-motion';
import uniqid from 'uniqid';

function Footer({ locale, id = '', variants }) {
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
		<Link
			to={
				locale === 'en'
					? `/${privacyPolicy.slug}`
					: `/${locale}/${privacyPolicy.slug}/`
			}
		>
			{privacyPolicy.metaTags.title}
		</Link>
	);

	const locales = [
		{
			name: 'English',
			code: 'en',
		},
		{
			name: 'Deutsch',
			code: 'de',
		},
		{
			name: '日本語',
			code: 'ja',
		},
	];

	const localeLinks = locales.map(possibleLocale => {
		let linkClasses = 'locale-link special-link';
		if (locale === possibleLocale.code) linkClasses += ' current';

		let linkTo =
			possibleLocale.code === 'en' ? '/' : `/${possibleLocale.code}/`;

		if (variants && variants[possibleLocale.code]) {
			linkTo = variants[possibleLocale.code].link;
		}

		return (
			<Link
				key={`locale-link-${possibleLocale.code}`}
				to={linkTo}
				lang={possibleLocale.code}
				className={linkClasses}
			>
				<span className="sr-only">{possibleLocale.name}</span>
				<span className="presentation-only">
					{possibleLocale.code.toUpperCase()}
				</span>
			</Link>
		);
	});

	return (
		<motion.footer
			key={id ? id : uniqid('footer-')}
			className="site-footer"
			variants={{
				hidden: {
					opacity: 0,
				},
				visible: {
					opacity: 1,
					transition: {
						delay: 1,
						duration: 0.25,
					},
				},
				exit: {
					opacity: 0,
					transition: {
						duration: 0.25,
					},
				},
			}}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			<div className="copyright-container">
				<span className="copyright">{copyrightText}</span>
				<span className="privacy-link-container">{privacyLink}</span>
				<span className="privacy-link-container">
					<a
						href="https://github.com/schwigri/griffen.design"
						target="_blank"
						rel="noopener noreferrer"
					>
						<abbr title="Made with love, peace, and React">
							<span
								className="emoji"
								role="img"
								aria-label="Sparkling heart emoji"
							>
								💖
							</span>
							<span className="emoji" role="img" aria-label="Peace-sign emoji">
								✌️
							</span>
							<span className="emoji" role="img" aria-label="Atom symbol emoji">
								⚛️
							</span>
						</abbr>
					</a>
				</span>
			</div>

			<div className="locale-select">
				<div className="locale-item">{localeLinks}</div>
			</div>
		</motion.footer>
	);
}

Footer.propTypes = {
	locale: PropTypes.string.isRequired,
	id: PropTypes.string,
	variants: PropTypes.shape({
		en: PropTypes.shape({
			link: PropTypes.string.isRequired,
		}).isRequired,
		de: PropTypes.shape({
			link: PropTypes.string.isRequired,
		}).isRequired,
		ja: PropTypes.shape({
			link: PropTypes.string.isRequired,
		}).isRequired,
	}),
};

export default Footer;
