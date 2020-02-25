import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import marked from 'marked';
import DOMPurify from 'dompurify';
import Parser from 'html-react-parser';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';

import SEO from '../components/SEO';
import Page from '../components/Page';

function PageTemplate({ data, pageContext }) {
	const { locale } = pageContext;
	const { titleSuffix } = data.site.globalSeo;
	const { metaTags, title, content } = data.privacyPolicy;

	const generatedContent = DOMPurify.sanitize(marked(content ? content : ''));

	const shouldReduceMotion = useReducedMotion();

	const fadeUp = {
		hidden: {
			scale: shouldReduceMotion ? 1 : 0.5,
			translateY: shouldReduceMotion ? 0 : '50%',
			opacity: 0,
		},
		visible: {
			scale: 1,
			translateY: 0,
			opacity: 1,
			transition: {
				delay: 1,
			},
		},
		exit: {
			opacity: 0,
		},
	};

	const privacyContent = Parser(generatedContent);
	//.map((item, index) => {
	// 	const itemControls = useAnimation();
	// 	const [itemRef, itemInView] = useInView();

	// 	useEffect(() => {
	// 		if (itemInView) {
	// 			itemControls.start('visible');
	// 		}
	// 	}, [itemControls, itemInView]);

	// 	return (
	// 		<motion.span
	// 			key={`motion-child-${index}`}
	// 			ref={itemRef}
	// 			initial="hidden"
	// 			exit="exit"
	// 			animate="visible"
	// 			variants={fadeUp}
	// 		>
	// 			{item}
	// 		</motion.span>
	// 	);
	// });

	console.log(privacyContent);

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
				{privacyContent}
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
