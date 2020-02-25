import React from 'react';
import PropTypes from 'prop-types';

function Menu({ children }) {
	return <nav className="menu">{children}</nav>;
}

Menu.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Menu;
