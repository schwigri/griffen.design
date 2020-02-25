import React from 'react';
import PropTypes from 'prop-types';

import Layout from './src/components/Layout';

function wrapPageElement({ element, props }) {
	const locale =
		props.pageContext && props.pageContext.locale
			? props.pageContext.locale
			: 'en';

	return (
		<Layout locale={locale} {...props}>
			{element}
		</Layout>
	);
}

wrapPageElement.propTypes = {
	element: PropTypes.node.isRequired,
	props: PropTypes.shape({
		pageContext: PropTypes.shape({
			id: PropTypes.string.isRequired,
			locale: PropTypes.string.isRequired,
		}),
	}).isRequired,
};

export default wrapPageElement;
