import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown/with-html";
import uniqid from "uniqid";

import SEO from "../components/SEO";
import { Article } from "../components/Project";

function IndexTemplate({ data }) {
	const { titleSuffix } = data.site.globalSeo;
	const { metaTags, meta, content } = data.home;

	const projectSizes = ["large", "medium", "medium", "small"];
	const pageContent = content.map(item => {
		let sectionContent = null;

		if ("DatoCmsSection" === item.__typename) {
			sectionContent = (
				<ReactMarkdown
					source={item.content ? item.content : ""}
					escapeHtml={false}
				/>
			);
		} else if ("DatoCmsCollection" === item.__typename) {
			sectionContent = [];
			if (item.title || item.description) {
				sectionContent.push(
					<header key={uniqid()} className="section-header">
						{item.title && <h2>{item.title}</h2>}
						{item.description && <p className="subtitle">{item.description}</p>}
					</header>
				);
			}

			let sectionLeftContent = [];
			let sectionRightContent = [];

			if (item.projects && item.projects.length > 0) {
				item.projects.forEach((project, index) => {
					const projectArticle = (
						<Article
							key={uniqid()}
							project={project}
							size={projectSizes[index]}
						/>
					);
					if (item.classes.indexOf("opposite") > -1) {
						if (0 === index % 2) {
							sectionRightContent.push(projectArticle);
						} else {
							sectionLeftContent.push(projectArticle);
						}
					} else {
						if (0 === index % 2) {
							sectionLeftContent.push(projectArticle);
						} else {
							sectionRightContent.push(projectArticle);
						}
					}
				});
			}

			const sectionLeft = <div className="left">{sectionLeftContent}</div>;

			const sectionRight = <div className="right">{sectionRightContent}</div>;

			let projectsClasses = "projects";
			if (item.classes.indexOf("opposite") > -1) projectsClasses += " opposite";

			sectionContent.push(
				<div className={projectsClasses} key={uniqid()}>
					{sectionLeft}
					{sectionRight}
				</div>
			);
		}

		let sectionClasses = "section";
		if (item.classes) sectionClasses += ` ${item.classes}`;

		return (
			<section
				key={Buffer.from(item.id).toString("base64")}
				className={sectionClasses}
			>
				{sectionContent}
			</section>
		);
	});

	return (
		<>
			<SEO
				title={metaTags.title}
				titleSuffix={titleSuffix}
				description={metaTags.description}
				updated={meta.updatedAt}
			/>

			{pageContent}
		</>
	);
}

IndexTemplate.propTypes = {
	data: PropTypes.shape({
		site: PropTypes.shape({
			globalSeo: PropTypes.shape({
				titleSuffix: PropTypes.string.isRequired
			}).isRequired
		}).isRequired,
		home: PropTypes.shape({
			metaTags: PropTypes.shape({
				title: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired
			}).isRequired,
			meta: PropTypes.shape({
				updatedAt: PropTypes.string.isRequired
			}).isRequired,
			content: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string.isRequired,
					classes: PropTypes.string,
					content: PropTypes.string
				})
			)
		}).isRequired
	}).isRequired
};

export default IndexTemplate;

export const query = graphql`
	query IndexTemplateQuery($id: String!, $locale: String!) {
		site: datoCmsSite(locale: { eq: $locale }) {
			globalSeo {
				titleSuffix
			}
		}
		home: datoCmsHome(id: { eq: $id }) {
			metaTags {
				title
				description
			}
			meta {
				updatedAt
			}
			content {
				... on DatoCmsSection {
					id
					classes
					content
				}
				... on DatoCmsCollection {
					id
					classes
					title
					description
					projects {
						locale
						slug
						title
						thumbnailSubtitle
						description
						thumbnail {
							fluid(maxWidth: 562) {
								...GatsbyDatoCmsFluid
							}
						}
					}
				}
			}
		}
	}
`;
