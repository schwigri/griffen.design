import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown/with-html';

import SEO from '../components/SEO';
import Page from '../components/Page';

function PageTemplate({ data }) {
	const { titleSuffix } = data.site.globalSeo;
	const { metaTags, meta, title, content } = data.privacyPolicy;

	return (
		<>
			<SEO
				title={metaTags.title}
				titleSuffix={titleSuffix}
				description={metaTags.description}
				updated={meta.updatedAt}
			/>
			<Page>
				<h1 className="page-title">{title}</h1>
				<ReactMarkdown source={content} escapeHtml={false} />
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
			meta: PropTypes.shape({
				updatedAt: PropTypes.string.isRequired,
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
			meta {
				updatedAt
			}
			title
			content
		}
	}
`;
