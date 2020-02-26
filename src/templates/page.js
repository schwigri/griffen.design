import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import marked from 'marked';
import createDOMPurify from 'dompurify';
import Parser from 'html-react-parser';

import SEO from '../components/SEO';
import Page from '../components/Page';

function PageTemplate({ data }) {
	const { titleSuffix } = data.site.globalSeo;
	const { metaTags, title, content } = data.page;

	const [pageContent, setPageContent] = useState(null);

	useEffect(() => {
		if (window && !pageContent) {
			const DOMPurify = createDOMPurify(window);
			setPageContent(
				content.map(item => {
					let sectionContent = null;

					if ('DatoCmsSection' === item.__typename) {
						sectionContent = Parser(
							DOMPurify.sanitize(marked(item.content ? item.content : ''))
						);
					}

					return (
						<section key={btoa(item.id)} className="section">
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
				title={title}
				titleSuffix={titleSuffix}
				description={metaTags.description}
			/>

			<Page>{pageContent}</Page>
		</>
	);
}

PageTemplate.propTypes = {
	data: PropTypes.shape({
		site: PropTypes.shape({
			globalSeo: PropTypes.shape({
				titleSuffix: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
		page: PropTypes.shape({
			metaTags: PropTypes.shape({
				title: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired,
			}).isRequired,
			title: PropTypes.string.isRequired,
			content: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string.isRequired,
					classes: PropTypes.string.isRequired,
					content: PropTypes.string,
				}).isRequired
			).isRequired,
		}).isRequired,
	}).isRequired,
};

export default PageTemplate;

export const query = graphql`
	query PageTemplateQuery($id: String!, $locale: String!) {
		site: datoCmsSite(locale: { eq: $locale }) {
			globalSeo {
				titleSuffix
			}
		}
		page: datoCmsPage(id: { eq: $id }) {
			metaTags {
				title
				description
			}
			title
			content {
				... on DatoCmsSection {
					id
					classes
					content
				}
				... on DatoCmsCollection {
					id
				}
			}
		}
	}
`;
