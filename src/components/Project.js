import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import marked from 'marked';
import createDOMPurify from 'dompurify';
import Parser from 'html-react-parser';

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

	const [projectTitle, setProjectTitle] = useState('');
	const [projectSubtitle, setProjectSubtitle] = useState('');
	const [projectDescription, setProjectDescription] = useState('');

	useEffect(() => {
		if (window && !projectDescription) {
			const DOMPurify = createDOMPurify(window);
			setProjectTitle(
				Parser(DOMPurify.sanitize(marked(project.title)))[0].props.children
			);
			setProjectSubtitle(
				Parser(DOMPurify.sanitize(marked(project.thumbnailSubtitle)))[0].props
					.children
			);
			setProjectDescription(
				Parser(DOMPurify.sanitize(marked(project.description)))
			);
		}
	}, [projectTitle, projectSubtitle, projectDescription]);

	return (
		<article className={classes}>
			<div className="project-background">
				<Img fluid={project.thumbnail.fluid} />
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
