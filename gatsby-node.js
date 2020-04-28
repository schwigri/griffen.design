const path = require("path");

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
						_allSlugLocales {
							locale
							value
						}
						content {
							... on DatoCmsSection {
								content
							}
						}
					}
				}
			}
			projects: allDatoCmsProject {
				edges {
					node {
						id
						locale
						slug
						_allSlugLocales {
							locale
							value
						}
					}
				}
			}
			privacyPolicies: allDatoCmsPrivacyPolicy {
				edges {
					node {
						id
						locale
						slug
						_allSlugLocales {
							locale
							value
						}
					}
				}
			}
		}
	`).then(result => {
		result.data.homes.edges.forEach(item => {
			const { id, locale } = item.node;
			const homeSlug = locale === "en" ? "/" : `/${locale}/`;

			createPage({
				path: homeSlug,
				component: path.resolve("./src/templates/index.js"),
				context: {
					id,
					locale,
					home: true
				}
			});
		});

		result.data.pages.edges.forEach(item => {
			const { id, locale, slug, _allSlugLocales } = item.node;
			const pageSlug = locale === "en" ? `/${slug}/` : `/${locale}/${slug}/`;

			let jaFont = false;
			item.node.content.forEach(section => {
				if (
					!jaFont &&
					section.content &&
					section.content.match(
						/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/
					)
				) {
					jaFont = true;
				}
			});

			createPage({
				path: pageSlug,
				component: path.resolve("./src/templates/page.js"),
				context: {
					id,
					locale,
					_allSlugLocales,
					jaFont
				}
			});
		});

		result.data.projects.edges.forEach(item => {
			const { id, locale, slug, _allSlugLocales } = item.node;
			const projectSlug = locale === "en" ? `/${slug}/` : `/${locale}/${slug}/`;

			createPage({
				path: projectSlug,
				component: path.resolve("./src/templates/project.js"),
				context: {
					id,
					locale,
					_allSlugLocales
				}
			});
		});

		result.data.privacyPolicies.edges.forEach(item => {
			const { id, locale, slug, _allSlugLocales } = item.node;
			const privacyPolicySlug =
				locale === "en" ? `/${slug}` : `/${locale}/${slug}/`;

			createPage({
				path: privacyPolicySlug,
				component: path.resolve("./src/templates/privacy.js"),
				context: {
					id,
					locale,
					_allSlugLocales
				}
			});
		});
	});
};
