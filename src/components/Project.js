import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';

const Article = ({ project, size = '' }) => {
	const classes = `project ${size}`;

	const projectSlug =
		project.locale === 'en'
			? `/${project.slug}`
			: `/${project.locale}/${project.slug}/`;

	const readMoreLinkText =
		project.locale === 'en' ? (
			<>
				Read more
				<span className="sr-only"> about ${project.title}</span>
			</>
		) : project.locale === 'de' ? (
			<>
				Lesen Sie mehr
				<span className="sr-only"> über ${project.title}</span>
			</>
		) : (
			<>
				<span className="sr-only">${project.title} について</span>
				もっと読む
			</>
		);

	const nowrapTypes = ['text'];

	const projectTitle = (
		<ReactMarkdown
			source={project.title}
			escapeHtml={false}
			allowedTypes={nowrapTypes}
			unwrapDisallowed={true}
		/>
	);

	const projectSubtitle = (
		<ReactMarkdown
			source={project.thumbnailSubtitle}
			escapeHtml={false}
			allowedTypes={nowrapTypes}
			unwrapDisallowed={true}
		/>
	);

	const projectDescription = (
		<ReactMarkdown source={project.description} escapeHtml={false} />
	);

	return (
		<article className={classes}>
			<div className="project-background">
				<Link to={projectSlug} className="special-link">
					<span className="sr-only">{readMoreLinkText}</span>
					<Img fluid={project.thumbnail.fluid} alt="" aria-hidden="true" />
				</Link>
			</div>
			<div className="project-foreground">
				<h1 className="project-title">{projectTitle}</h1>
				<p className="subtitle">{projectSubtitle}</p>
				{projectDescription}
				<p>
					<Link to={projectSlug} className="project-link">
						{readMoreLinkText}
					</Link>
				</p>
			</div>
		</article>
	);
};

Article.propTypes = {
	project: PropTypes.shape({
		locale: PropTypes.string.isRequired,
		slug: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		thumbnailSubtitle: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		thumbnail: PropTypes.shape({
			fluid: PropTypes.object.isRequired,
		}).isRequired,
	}).isRequired,
	size: PropTypes.string.isRequired,
};

export { Article };
