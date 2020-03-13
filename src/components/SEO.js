import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

function SEO({ title, titleSuffix, description, updated }) {
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
			<meta name="author" content="Griffen Schwiesow" />
			<meta property="og:image" content={defaultCover} />
			{updated && <meta property="og:updated_time" content={updated} />}
		</Helmet>
	);
}

SEO.propTypes = {
	title: PropTypes.string.isRequired,
	titleSuffix: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	updated: PropTypes.string,
};

export default SEO;
