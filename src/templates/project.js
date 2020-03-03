import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import marked from 'marked';
import createDOMPurify from 'dompurify';
import Parser from 'html-react-parser';

import SEO from '../components/SEO';
import Page from '../components/Page';

function ProjectTemplate({ data }) {
	const { titleSuffix } = data.site.globalSeo;
	const { metaTags, title, subtitle, intro, content } = data.project;

	const [introContent, setIntroContent] = useState(null);
	const [projectContent, setProjectContent] = useState(null);
	const [projectTitle, setProjectTitle] = useState('');
	const [projectSubtitle, setProjectSubtitle] = useState('');

	useEffect(() => {
		if (window && (!introContent || !projectTitle || !projectSubtitle)) {
			const DOMPurify = createDOMPurify(window);

			setProjectTitle(
				Parser(DOMPurify.sanitize(marked(title)))[0].props.children
			);

			setProjectSubtitle(
				Parser(DOMPurify.sanitize(marked(subtitle)))[0].props.children
			);

			const projectIntro = [];
			intro.forEach(introItem => {
				projectIntro.push(
					<div key={introItem.id} className="project-challenge">
						<h2>{introItem.title}</h2>
						{Parser(DOMPurify.sanitize(marked(introItem.description)))}
					</div>
				);
			});
			setIntroContent(projectIntro);
		}
	}, [introContent, projectTitle, projectSubtitle]);

	useEffect(() => {
		if (window && !projectContent) {
			const sections = [];
			const DOMPurify = createDOMPurify(window);
			DOMPurify.addHook('afterSanitizeAttributes', node => {
				if ('target' in node) {
					node.setAttribute('target', '_blank');
				}
			});

			content.forEach(contentSection => {
				sections.push(
					<section className="section">
						{Parser(DOMPurify.sanitize(marked(contentSection.content)))}
					</section>
				);
			});

			setProjectContent(sections);
		}
	}, [projectContent]);

	return (
		<>
			<SEO
				title={metaTags.title}
				titleSuffix={titleSuffix}
				description={metaTags.description}
			/>

			<Page>
				<section className="section">
					<h1>{projectTitle ? projectTitle : title}</h1>
					<p className="subtitle">
						{projectSubtitle ? projectSubtitle : subtitle}
					</p>
					<div className="project-intro">{introContent}</div>
				</section>
				{projectContent}
			</Page>
		</>
	);
}

ProjectTemplate.propTypes = {
	data: PropTypes.shape({
		site: PropTypes.shape({
			globalSeo: PropTypes.shape({
				titleSuffix: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
		project: PropTypes.shape({
			metaTags: PropTypes.shape({
				title: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired,
			}).isRequired,
			title: PropTypes.string.isRequired,
			subtitle: PropTypes.string.isRequired,
			intro: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string.isRequired,
					title: PropTypes.string.isRequired,
					description: PropTypes.string.isRequired,
				})
			).isRequired,
			content: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string.isRequired,
					classes: PropTypes.string,
					content: PropTypes.string.isRequired,
				})
			).isRequired,
		}).isRequired,
	}).isRequired,
};

export default ProjectTemplate;

export const query = graphql`
	query ProjectTemplateQuery($id: String!, $locale: String!) {
		site: datoCmsSite(locale: { eq: $locale }) {
			globalSeo {
				titleSuffix
			}
		}
		project: datoCmsProject(id: { eq: $id }) {
			metaTags {
				title
				description
			}
			title
			subtitle
			intro {
				id
				title
				description
			}
			content {
				... on DatoCmsSection {
					id
					classes
					content
				}
			}
		}
	}
`;
