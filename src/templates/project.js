import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import ReactMarkdown from 'react-markdown/with-html';
import ReactCompareImage from 'react-compare-image';

import SEO from '../components/SEO';
import Page from '../components/Page';

function ProjectTemplate({ data, pageContext }) {
	const { locale } = pageContext;
	const { titleSuffix } = data.site.globalSeo;
	const {
		metaTags,
		meta,
		position,
		title,
		subtitle,
		intro,
		content,
	} = data.project;
	const projects = data.projects.edges;

	const nextProject =
		position !== 8 &&
		projects.filter(x => position + 1 === x.node.position)[0].node;
	const previousProject =
		position !== 1 &&
		projects.filter(x => position - 1 === x.node.position)[0].node;

	const nowrapTypes = ['text', 'emphasis', 'strong', 'html'];

	const projectTitle = (
		<ReactMarkdown
			source={title}
			escapeHtml={false}
			allowedTypes={nowrapTypes}
			unwrapDisallowed={true}
		/>
	);

	const projectSubtitle = (
		<ReactMarkdown
			source={subtitle}
			escapeHtml={false}
			allowedTypes={nowrapTypes}
			unwrapDisallowed={true}
		/>
	);

	const projectIntro = intro.map(introItem => {
		return (
			<div key={introItem.id} className="project-challenge">
				<h2>{introItem.title}</h2>
				<ReactMarkdown source={introItem.description} escapeHtml={false} />
			</div>
		);
	});

	const projectContent = content.map(contentSection => {
		if ('DatoCmsImageComparison' === contentSection.__typename) {
			return (
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
			return (
				<section className="section" key={contentSection.id}>
					<ReactMarkdown source={contentSection.content} escapeHtml={false} />
				</section>
			);
		}
	});

	return (
		<>
			<SEO
				title={metaTags.title}
				titleSuffix={titleSuffix}
				description={metaTags.description}
				updated={meta.updatedAt}
			/>

			<Page>
				<section className="section">
					<h1>{projectTitle ? projectTitle : title}</h1>
					<p className="subtitle">
						{projectSubtitle ? projectSubtitle : subtitle}
					</p>
					<div className="project-intro">{projectIntro}</div>
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
								<ReactMarkdown
									source={previousProject.title}
									escapeHtml={false}
									allowedTypes={nowrapTypes}
									unwrapDisallowed={true}
								/>
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
								<ReactMarkdown
									source={nextProject.title}
									escapeHtml={false}
									allowedTypes={nowrapTypes}
									unwrapDisallowed={true}
								/>
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
			meta: PropTypes.shape({
				updatedAt: PropTypes.string.isRequired,
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
			meta {
				updatedAt
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
