import React from 'react';
import PropTypes from 'prop-types';

function Page({ children }) {
	return <div className="page-content">{children}</div>;
}

Page.propTypes = {
	children: PropTypes.node,
};

export default Page;
