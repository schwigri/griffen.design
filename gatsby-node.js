const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	await graphql(`
		{
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
