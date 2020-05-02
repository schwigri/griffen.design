const path = require("path");
const fs = require("fs");

const pageTypes = {
	home: "Home",
	privacy: "Privacy",
	page: "Page",
};

const langPrefixes = {
	"en-us": "",
	"ja-jp": "/ja",
	"de-ch": "/de",
};

const cacheDir = "./.cache/caches/gatsby-source-prismic-graphql";

exports.onPreBootstrap = () => {
	if (!fs.existsSync(cacheDir)) {
		fs.mkdirSync(cacheDir);
	}
};

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	await graphql(`
		{
			site {
				siteMetadata {
					title
					description
					siteUrl
				}
			}

			prismic {
				allLayouts {
					edges {
						node {
							_meta {
								lang
							}
							title_suffix
						}
					}
				}

				allPages {
					edges {
						node {
							type
							_meta {
								id
								uid
								lang
								alternateLanguages {
									uid
									lang
								}
							}
						}
					}
				}

				allProjects {
					edges {
						node {
							_meta {
								id
								uid
								lang
								alternateLanguages {
									uid
									lang
								}
							}
						}
					}
				}
			}
		}
	`).then(result => {
		const { siteMetadata } = result.data.site;
		const layouts = result.data.prismic.allLayouts.edges;

		result.data.prismic.allPages.edges.forEach(page => {
			const { type } = page.node;
			const { uid, lang } = page.node._meta;
			const slug = type === pageTypes.home ? `${langPrefixes[lang]}/` : `${langPrefixes[lang]}/${uid}`;

			createPage({
				path: slug,
				component: path.resolve("./src/templates/page.tsx"),
				context: {
					uid,
					lang,
					siteMetadata,
					titleSuffix: layouts.filter(x => x.node._meta.lang === lang)[0].node.title_suffix,
					...page.node,
				},
			});
		});

		result.data.prismic.allProjects.edges.forEach(project => {
			const { uid, lang } = project.node._meta;
			const slug = `${langPrefixes[lang]}/${uid}`;

			createPage({
				path: slug,
				component: path.resolve("./src/templates/project.tsx"),
				context: {
					uid,
					lang,
					siteMetadata,
					titleSuffix: layouts.filter(x => x.node._meta.lang === lang)[0].node.title_suffix,
					...project.node,
				},
			});
		});
	});
};
