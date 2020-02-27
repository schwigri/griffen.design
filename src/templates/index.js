import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import marked from 'marked';
import createDOMPurify from 'dompurify';
import Parser from 'html-react-parser';
import uniqid from 'uniqid';

import SEO from '../components/SEO';
import { Article } from '../components/Project';

function IndexTemplate({ data }) {
	const { titleSuffix } = data.site.globalSeo;
	const { metaTags, content } = data.home;

	const [pageContent, setPageContent] = useState(null);

	useEffect(() => {
		if (window && !pageContent && content) {
			const projectSizes = ['large', 'medium', 'medium', 'small'];
			const DOMPurify = createDOMPurify(window);
			setPageContent(
				content.map(item => {
					let sectionContent = null;

					if ('DatoCmsSection' === item.__typename) {
						sectionContent = Parser(
							DOMPurify.sanitize(marked(item.content ? item.content : ''))
						);
					} else if ('DatoCmsCollection' === item.__typename) {
						sectionContent = [];
						if (item.title || item.description) {
							sectionContent.push(
								<header key={uniqid()} className="section-header">
									{item.title && <h2>{item.title}</h2>}
									{item.description && (
										<p className="subtitle">{item.description}</p>
									)}
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
								if (item.classes.indexOf('opposite') > -1) {
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

						const sectionLeft = (
							<div className="left">{sectionLeftContent}</div>
						);

						const sectionRight = (
							<div className="right">{sectionRightContent}</div>
						);

						let projectsClasses = 'projects';
						if (item.classes.indexOf('opposite') > -1)
							projectsClasses += ' opposite';

						sectionContent.push(
							<div className={projectsClasses} key={uniqid()}>
								{sectionLeft}
								{sectionRight}
							</div>
						);
					}

					let sectionClasses = 'section';
					if (item.classes) sectionClasses += ` ${item.classes}`;

					return (
						<section
							key={Buffer.from(item.id).toString('base64')}
							className={sectionClasses}
						>
							{sectionContent}
						</section>
					);
				})
			);
		}
	}, [pageContent]);

	return (
		<>
			<SEO
				title={metaTags.title}
				titleSuffix={titleSuffix}
				description={metaTags.description}
			/>

			{pageContent}
		</>
	);
}

IndexTemplate.propTypes = {
	data: PropTypes.shape({
		site: PropTypes.shape({
			globalSeo: PropTypes.shape({
				titleSuffix: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
		home: PropTypes.shape({
			metaTags: PropTypes.shape({
				title: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired,
			}).isRequired,
			content: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string.isRequired,
					classes: PropTypes.string,
					content: PropTypes.string,
				})
			),
		}).isRequired,
	}).isRequired,
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
						subtitle
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
