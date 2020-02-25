import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

function SEO({
	title,
	titleSuffix,
	description,
}) {
	const pageTitle = `${title}${titleSuffix}`;

	return (
		<Helmet>
			<title>{pageTitle}</title>
			<meta name="description" content={description} />
		</Helmet>
	);
}

SEO.propTypes = {
	title: PropTypes.string.isRequired,
	titleSuffix: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default SEO;
