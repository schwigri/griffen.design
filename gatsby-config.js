require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`
});

const {
	NODE_ENV,
	URL: NETLIFY_SITE_URL = "https://www.griffen.design",
	DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
	CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;

const isNetlifyProduction = NETLIFY_ENV === "production";
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

module.exports = {
	siteMetadata: {
		title: "griffen.design",
		description: "Fine, fresh, fierce. A modern portfolio.",
		siteUrl
	},
	plugins: [
		"gatsby-plugin-sass",
		"gatsby-plugin-react-helmet",
		{
			resolve: "gatsby-source-datocms",
			options: {
				apiToken: process.env.DATO_CMS_TOKEN,
				previewMode: !isNetlifyProduction,
				disableLiveReload: isNetlifyProduction
			}
		},
		"gatsby-plugin-sitemap",
		{
			resolve: "gatsby-plugin-robots-txt",
			options: {
				resolveEnv: () => NETLIFY_ENV,
				env: {
					production: {
						policy: [{ userAgent: "*" }]
					},
					"branch-deploy": {
						policy: [{ userAgent: "*", disallow: ["/"] }],
						sitemap: null,
						host: null
					},
					"deploy-preview": {
						policy: [{ userAgent: "*", disallow: ["/"] }],
						sitemap: null,
						host: null
					}
				}
			}
		},
		{
			resolve: "gatsby-plugin-matomo",
			options: {
				siteId: isNetlifyProduction ? "1" : "2",
				matomoUrl: "https://access.griffen.design",
				disableCookies: true,
				siteUrl: isNetlifyProduction
					? siteUrl
					: "https://staging.griffen.design",
				requireConsent: true,
				dev: isNetlifyProduction ? false : true
			}
		},
		{
			resolve: "gatsby-plugin-canonical-urls",
			options: {
				siteUrl: isNetlifyProduction
					? siteUrl
					: "https://staging.griffen.design",
				stripQueryString: true
			}
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: "Griffen Schwiesow",
				short_name: "Griffen",
				description: "Fine, fresh, fiernce. A modern portfolio.",
				start_url: "/",
				background_color: "#fff8dc",
				theme_color: "#1467ff",
				display: "standalone",
				icon: "src/graphics/icon.png",
				localize: [
					{
						start_url: "/de/",
						lang: "de",
						name: "Griffen Schwiesow",
						short_name: "Griffen",
						description:
							"Hübsch, frech, leidenschaftlich. Ein modernes Portfolio."
					},
					{
						start_url: "/ja/",
						lang: "ja",
						name: "グリフィン・シュヴィーゾー",
						short_name: "グリフィン",
						description: "見た目も良くて激しくてモダーンのポートフォリオ"
					}
				]
			}
		},
		"gatsby-plugin-offline"
	]
};
