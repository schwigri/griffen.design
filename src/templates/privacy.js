import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import marked from 'marked';
import createDOMPurify from 'dompurify';
import Parser from 'html-react-parser';

import SEO from '../components/SEO';
import Page from '../components/Page';

function PageTemplate({ data }) {
	const { titleSuffix } = data.site.globalSeo;
	const { metaTags, title, content } = data.privacyPolicy;

	const [generatedContent, setGeneratedContent] = useState(null);

	useEffect(() => {
		if (window && !generatedContent) {
			const DOMPurify = createDOMPurify(window);
			setGeneratedContent(
				Parser(DOMPurify.sanitize(marked(content ? content : '')))
			);
		}
	}, [generatedContent]);

	return (
		<>
			<SEO
				title={metaTags.title}
				titleSuffix={titleSuffix}
				description={metaTags.description}
			/>
			<Page>
				<h1 className="page-title">{title}</h1>
				{/* <div dangerouslySetInnerHTML={{ __html: generatedContent }} /> */}
				{generatedContent}
			</Page>
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
		privacyPolicy: PropTypes.shape({
			metaTags: PropTypes.shape({
				title: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired,
			}).isRequired,
			title: PropTypes.string.isRequired,
			content: PropTypes.string,
		}).isRequired,
	}).isRequired,
	pageContext: PropTypes.shape({
		id: PropTypes.string.isRequired,
		locale: PropTypes.string.isRequired,
	}).isRequired,
};

export default PageTemplate;

export const query = graphql`
	query PrivacyPolicyTemplateQuery($id: String!, $locale: String!) {
		site: datoCmsSite(locale: { eq: $locale }) {
			globalSeo {
				titleSuffix
			}
		}
		privacyPolicy: datoCmsPrivacyPolicy(id: { eq: $id }) {
			metaTags {
				title
				description
			}
			title
			content
		}
	}
`;
