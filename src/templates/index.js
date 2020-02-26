import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import marked from 'marked';
import createDOMPurify from 'dompurify';
import Parser from 'html-react-parser';

import SEO from '../components/SEO';
import Page from '../components/Page';

function IndexTemplate({ data }) {
	const { titleSuffix } = data.site.globalSeo;
	const { metaTags, content } = data.home;

	const [pageContent, setPageContent] = useState(null);

	useEffect(() => {
		if (window && !pageContent && content) {
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
						<section
							key={Buffer.from(item.id).toString('base64')}
							className="section"
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

			<Page>{pageContent}</Page>
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
				}
			}
		}
	}
`;
