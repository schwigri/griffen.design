// import React from 'react';
// import PropTypes from 'prop-types';
// import { graphql } from 'gatsby';

// import Layout from '../components/Layout';
// import SEO from '../components/SEO';
// import Page from '../components/Page';

// function PageTemplate({ data, pageContext }) {
// 	const { locale } = pageContext;
// 	const { titleSuffix } = data.site.globalSeo;

// 	return (
// 		<Layout locale={locale}>
// 			<SEO
// 				titleSuffix={titleSuffix}
// 			/>
// 			<Page>
// 				<h1 className="page-title">{titleSuffix}</h1>
// 			</Page>
// 		</Layout>
// 	);
// }

// PageTemplate.propTypes = {
// 	data: PropTypes.shape({
// 		site: PropTypes.shape({
// 			globalSeo: PropTypes.shape({
// 				titleSuffix: PropTypes.string.isRequired,
// 			}).isRequired,
// 		}).isRequired,
// 	}).isRequired,
// 	pageContext: PropTypes.shape({
// 		id: PropTypes.string.isRequired,
// 		locale: PropTypes.string.isRequired,
// 	}).isRequired,
// };

// export default PageTemplate;

// export const query = graphql`
// 	query PageTemplateQuery($locale: String!) {
// 		site: datoCmsSite(locale: { eq: $locale }) {
// 			globalSeo {
// 				titleSuffix
// 			}
// 		}
// 		page: datoCmsPage(id: { eq: $id }) {
// 			title
// 		}
// 	}
// `;
