import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import marked from 'marked';
import createDOMPurify from 'dompurify';
import Parser from 'html-react-parser';

const Article = ({ project, size }) => {
	let classes = 'project';

	if (size) classes += ` ${size}`;

	const projectSlug =
		project.locale === 'en'
			? `/${project.slug}`
			: `/${project.locale}/${project.slug}/`;

	const [projectDescription, setProjectDescription] = useState('');

	useEffect(() => {
		if (window && !projectDescription) {
			const DOMPurify = createDOMPurify(window);
			setProjectDescription(
				Parser(DOMPurify.sanitize(marked(project.description)))
			);
		}
	});

	return (
		<article className={classes}>
			<div className="project-background">
				<Img fluid={project.thumbnail.fluid} />
			</div>
			<div className="project-foreground">
				<h1 className="project-title">{project.title}</h1>
				<p className="subtitle">{project.subtitle}</p>
				{projectDescription}
				<p>
					<Link to={projectSlug}>
						Read more
						<span className="sr-only"> about {project.title}</span>
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
		subtitle: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		thumbnail: PropTypes.shape({
			fluid: PropTypes.object.isRequired,
		}).isRequired,
	}).isRequired,
	size: PropTypes.string.isRequired,
};

export { Article };
