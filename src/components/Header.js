import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { motion, useReducedMotion } from 'framer-motion';

import * as Grahpics from '../graphics/graphics';

function Header({ locale }) {
	const [isVertical, setIsVertical] = useState(true);
	const [resizeListener, setResizeListener] = useState(false);

	useEffect(() => {
		if (window && window.innerWidth < 768 && !isVertical) {
			setIsVertical(true);
		} else if (window && window.innerWidth >= 768 && isVertical) {
			setIsVertical(false);
		}
	}, [isVertical]);

	useEffect(() => {
		if (window && !resizeListener) {
			setResizeListener(true);
			window.addEventListener('resize', e => {
				if (e.innerWidth < 768 && !isVertical) {
					setIsVertical(true);
				} else if (isVertical) {
					setIsVertical(false);
				}
			});
		}
	}, [isVertical, resizeListener]);

	const data = useStaticQuery(
		graphql`
			query HeaderQuery {
				menus: allDatoCmsMenu {
					edges {
						node {
							locale
							links {
								id
								title
								slug
							}
						}
					}
				}
			}
		`
	);

	const homeLink = locale === 'en' ? '/' : `/${locale}/`;

	const navLinks = data.menus.edges
		.filter(x => locale === x.node.locale)[0]
		.node.links.map(item => {
			const linkSlug =
				locale === 'en' ? `/${item.slug}/` : `/${locale}/${item.slug}/`;

			return (
				<Link
					key={`nav-link-${item.id}`}
					to={linkSlug}
					className="nav-link special-link"
				>
					{item.title}
				</Link>
			);
		});

	const shouldReduceMotion = useReducedMotion();

	return (
		<header
			className="site-header"
			// variants={{
			// 	hidden: {
			// 		opacity: shouldReduceMotion ? 0 : 1,
			// 		transform: shouldReduceMotion
			// 			? 'translate3d(0, 0, 0)'
			// 			: isVertical
			// 			? 'translate3d(0, -150%, 0'
			// 			: 'translate3d(-150%, 0, 0)',
			// 	},
			// 	visible: {
			// 		opacity: 1,
			// 		transform: 'translate3d(0, 0, 0)',
			// 		transition: {
			// 			duration: 0.25,
			// 		},
			// 	},
			// 	exit: {
			// 		opacity: 0,
			// 		transform: 'translate3d(-150%, 0, 0)',
			// 		transition: {
			// 			delay: 0.25,
			// 			duration: 0.25,
			// 		},
			// 	},
			// }}
			// initial="hidden"
			// animate="visible"
		>
			<div className="stars-container">
				<Link to={homeLink} className="special-link">
					<Grahpics.Stars />
				</Link>
			</div>

			<div className="site-title-container">
				<Link to={homeLink} className="site-title heading special-link">
					{locale === 'ja' ? 'グリフィン・シュヴィーゾー' : 'Griffen Schwiesow'}
				</Link>
			</div>

			<div className="site-nav-container">
				<nav className="site-nav">{navLinks}</nav>
			</div>
		</header>
	);
}

Header.propTypes = {
	locale: PropTypes.string.isRequired,
};

export default Header;
