import React from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

import Layout from './src/components/Layout';
import { useStaticQuery, graphql } from 'gatsby';

function wrapPageElement({ element, props }) {
	const { pageContext } = props;

	const locale = pageContext && pageContext.locale ? pageContext.locale : 'en';

	const id =
		pageContext && pageContext.id
			? Buffer.from(pageContext.id).toString('base64')
			: uniqid();

	let variants = null;

	if (pageContext && pageContext._allSlugLocales) {
		variants = {};
		pageContext._allSlugLocales.forEach(slugLocale => {
			variants[slugLocale.locale] = {
				link:
					slugLocale.locale === 'en'
						? `/${slugLocale.value}/`
						: `/${slugLocale.locale}/${slugLocale.value}/`,
			};
		});
	}

	return (
		<Layout locale={locale} id={id} variants={variants} {...props}>
			{element}
		</Layout>
	);
}

wrapPageElement.propTypes = {
	element: PropTypes.node.isRequired,
	props: PropTypes.shape({
		pageContext: PropTypes.shape({
			locale: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
			home: PropTypes.bool,
		}).isRequired,
	}),
	pageContext: PropTypes.shape({
		locale: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		_allSlugLocales: PropTypes.arrayOf(
			PropTypes.shape({
				locale: PropTypes.string.isRequired,
				value: PropTypes.string.isRequired,
			})
		),
	}).isRequired,
};

export default wrapPageElement;
