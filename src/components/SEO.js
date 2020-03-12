import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

function SEO({ title, titleSuffix, description }) {
	const pageTitle = `${title}${titleSuffix}`;

	const data = useStaticQuery(
		graphql`
			query SeoQuery {
				datoCmsSite {
					globalSeo {
						fallbackSeo {
							image {
								url
							}
						}
					}
				}
			}
		`
	);

	const defaultCover = data.datoCmsSite.globalSeo.fallbackSeo.image.url;

	return (
		<Helmet>
			<title>{pageTitle}</title>
			<meta name="description" content={description} />
			<meta property="og:image" content={defaultCover} />
		</Helmet>
	);
}

SEO.propTypes = {
	title: PropTypes.string.isRequired,
	titleSuffix: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default SEO;
