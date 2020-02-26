import React from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

import Layout from './src/components/Layout';

function wrapPageElement({ element, props }) {
	const { pageContext } = props;

	const locale = pageContext && pageContext.locale ? pageContext.locale : 'en';

	const id = pageContext && pageContext.id ? btoa(pageContext.id): uniqid();

	const home = pageContext && pageContext.home ? pageContext.home : false;

	return (
		<Layout locale={locale} id={id} home={home} {...props}>
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
};

export default wrapPageElement;
