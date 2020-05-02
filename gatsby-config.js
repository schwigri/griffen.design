const {
	NODE_ENV,
	URL: NETLIFY_SITE_URL = "https://www.griffen.design",
	DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
	CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;

const isNetlifyProduction = NETLIFY_ENV === "production";
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

require("dotenv").config({
	path: `.env.${NODE_ENV}`,
});

module.exports = {
	siteMetadata: {
		title: "Griffen Schwiesow",
		description: "With a degree in HCDE and professional design and development background, I am passionate about crafting beautiful, usable, and accessible experiences.",
		siteUrl: `https://www.griffen.design`,
	},
	plugins: [
		"gatsby-plugin-typescript",
		{
			resolve: "gatsby-source-prismic-graphql",
			options: {
				repositoryName: "griffen",
				accessToken: process.env.PRISMIC_ACCESS_TOKEN,
				path: "/preview",
				previews: true,
			},
		},
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
	],
};
