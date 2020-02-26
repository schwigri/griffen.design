const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	await graphql(`
		{
			homes: allDatoCmsHome {
				edges {
					node {
						id
						locale
					}
				}
			}
			pages: allDatoCmsPage {
				edges {
					node {
						id
						locale
						slug
					}
				}
			}
			privacyPolicies: allDatoCmsPrivacyPolicy {
				edges {
					node {
						id
						locale
						slug
					}
				}
			}
		}
	`).then(result => {
		result.data.homes.edges.forEach(item => {
			const { id, locale } = item.node;
			const homeSlug = locale === 'en' ? '/' : `/${locale}/`;

			createPage({
				path: homeSlug,
				component: path.resolve('./src/templates/index.js'),
				context: {
					id,
					locale,
					home: true,
				},
			});
		});

		result.data.pages.edges.forEach(item => {
			const { id, locale, slug } = item.node;
			const pageSlug = locale === 'en' ? `/${slug}` : `/${locale}/${slug}/`;

			createPage({
				path: pageSlug,
				component: path.resolve('./src/templates/page.js'),
				context: {
					id,
					locale,
				},
			});
		});

		result.data.privacyPolicies.edges.forEach(item => {
			const { id, locale, slug } = item.node;
			const privacyPolicySlug =
				locale === 'en' ? `/${slug}` : `/${locale}/${slug}/`;

			createPage({
				path: privacyPolicySlug,
				component: path.resolve('./src/templates/privacy.js'),
				context: {
					id,
					locale,
				},
			});
		});
	});
};
