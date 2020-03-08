import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import marked from 'marked';
import createDOMPurify from 'dompurify';
import Parser from 'html-react-parser';
import ReactCompareImage from 'react-compare-image';

import SEO from '../components/SEO';
import Page from '../components/Page';

function ProjectTemplate({ data, pageContext }) {
	const { locale } = pageContext;
	const { titleSuffix } = data.site.globalSeo;
	const { metaTags, position, title, subtitle, intro, content } = data.project;
	const projects = data.projects.edges;

	const nextProject =
		position !== 8 &&
		projects.filter(x => position + 1 === x.node.position)[0].node;
	const previousProject =
		position !== 1 &&
		projects.filter(x => position - 1 === x.node.position)[0].node;

	const [introContent, setIntroContent] = useState(null);
	const [projectContent, setProjectContent] = useState(null);
	const [projectTitle, setProjectTitle] = useState('');
	const [projectSubtitle, setProjectSubtitle] = useState('');

	useEffect(() => {
		if (window && (!introContent || !projectTitle || !projectSubtitle)) {
			const DOMPurify = createDOMPurify(window);
			DOMPurify.addHook('afterSanitizeAttributes', node => {
				if ('target' in node) {
					node.setAttribute('target', '_blank');
				}
			});

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
				if ('DatoCmsImageComparison' === contentSection.__typename) {
					sections.push(
						<section className="section" key={contentSection.id}>
							<figure className="wide">
								<ReactCompareImage
									leftImage={contentSection.imageOne.url}
									leftImageAlt={contentSection.imageOne.alt}
									rightImage={contentSection.imageTwo.url}
									rightImageAlt={contentSection.imageTwo.alt}
								/>

								{contentSection.caption && (
									<figcaption>{contentSection.caption}</figcaption>
								)}
							</figure>
						</section>
					);
				} else {
					sections.push(
						<section className="section" key={contentSection.id}>
							{Parser(DOMPurify.sanitize(marked(contentSection.content)))}
						</section>
					);
				}
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

				<section className="project-navigation-container">
					{previousProject && (
						<div className="project-navigation previous-project">
							<span>
								{locale === 'de'
									? 'Zurück'
									: locale === 'ja'
									? '前'
									: 'Previous'}
							</span>
							<Link
								to={
									locale === 'en'
										? `/${previousProject.slug}/`
										: `/${locale}/${previousProject.slug}/`
								}
							>
								{Parser(marked(previousProject.title))[0].props.children}
							</Link>
						</div>
					)}
					{nextProject && (
						<div className="project-navigation next-project">
							<span>
								{locale === 'de' ? 'Weiter' : locale === 'ja' ? '次' : 'Next'}
							</span>
							<Link
								to={
									locale === 'en'
										? `/${nextProject.slug}/`
										: `/${locale}/${nextProject.slug}/`
								}
							>
								{Parser(marked(nextProject.title))[0].props.children}
							</Link>
						</div>
					)}
				</section>
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
			position: PropTypes.number.isRequired,
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
				PropTypes.oneOfType([
					PropTypes.shape({
						id: PropTypes.string.isRequired,
						classes: PropTypes.string,
						content: PropTypes.string.isRequired,
					}),
					PropTypes.shape({
						id: PropTypes.string.isRequired,
						vertical: PropTypes.bool.isRequired,
						imageOne: PropTypes.shape({
							url: PropTypes.string.isRequired,
							alt: PropTypes.string.isRequired,
						}).isRequired,
						imageTwo: PropTypes.shape({
							url: PropTypes.string.isRequired,
							alt: PropTypes.string.isRequired,
						}).isRequired,
						caption: PropTypes.string,
					}),
				]).isRequired
			).isRequired,
		}),
		projects: PropTypes.shape({
			edges: PropTypes.arrayOf(
				PropTypes.shape({
					node: PropTypes.shape({
						id: PropTypes.string.isRequired,
						position: PropTypes.number.isRequired,
						slug: PropTypes.string.isRequired,
						title: PropTypes.string.isRequired,
					}).isRequired,
				})
			).isRequired,
		}).isRequired,
	}).isRequired,
	pageContext: PropTypes.shape({
		locale: PropTypes.string.isRequired,
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
			position
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
				... on DatoCmsImageComparison {
					id
					vertical
					imageOne {
						url
						alt
					}
					imageTwo {
						url
						alt
					}
					caption
				}
			}
		}
		projects: allDatoCmsProject(
			filter: { locale: { eq: $locale } }
			sort: { fields: position }
		) {
			edges {
				node {
					id
					position
					slug
					title
				}
			}
		}
	}
`;
