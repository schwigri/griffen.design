import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";

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

	const [userCountry, setUserCountry] = useState(false);
	useEffect(() => {
		if (window && window._paq && !userCountry) {
			fetch(
				`https://ipinfo.io/country?token=${process.env.GATSBY_IPINFO_API_TOKEN}`
			)
				.then(response => {
					return response.text();
				})
				.then(countryCode => {
					if ("us" === countryCode.trim().toLowerCase()) {
						window._paq.push(["setConsentGiven"]);
					}
				})
				.catch(() => {
					setUserCountry(false);
				});
		}
	}, [userCountry]);

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
	updated: PropTypes.string
};

export default SEO;
