import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import * as Graphics from '../graphics/graphics';

function Header({ locale, home = false, children }) {
	const homeLink = locale === 'en' ? '/' : `/${locale}/`;
	const siteTitle = home ? (
		<h1 className="site-title">
			Griffen <span className="md-plus">Schwiesow</span>
		</h1>
	) : (
		<Link className="site-title" to={homeLink}>
			Griffen <span className="md-plus">Schwiesow</span>
		</Link>
	);

	return (
		<header className="site-header">
			<div className="header-inner">
				<div className="site-title-container">{siteTitle}</div>

				<div className="stars-container" aria-hidden="true">
					<Link to={homeLink} className="stars-link">
						<Graphics.Stars />
					</Link>
				</div>

				{children}
			</div>
		</header>
	);
}

Header.propTypes = {
	locale: PropTypes.string.isRequired,
	home: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

export default Header;
