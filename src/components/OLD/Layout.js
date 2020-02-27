import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { motion, AnimatePresence } from 'framer-motion';

import Header from './Header';
import Footer from './Footer';

const variants = {
	hidden: {
		opacity: 0,
		scale: 0.8,
		transform: 'translateY(1em)',
	},
	visible: {
		opacity: 1,
		scale: 1,
		transform: 'translateY(0)',
		transition: {
			delay: 0.6,
		},
	},
	exit: {
		opacity: 0,
		scale: 0.8,
		transform: 'translateY(-1em)',
	},
};

function Layout({ locale, id = '', home = false, children }) {
	const data = useStaticQuery(
		graphql`
			query LayoutQuery {
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

	const menuLinks = data.menus.edges
		.filter(x => locale === x.node.locale)[0]
		.node.links.map(item => {
			const linkSlug =
				locale === 'en' ? `/${item.slug}/` : `/${locale}/${item.slug}/`;

			return (
				<Link className="menu-link" to={linkSlug} key={`menu-link-${item.id}`}>
					{item.title}
				</Link>
			);
		});

	const [colorScheme, setColorScheme] = useState('light');
	const [colorSchemeWatcher, setColorSchemeWatcher] = useState(false);

	const watchColorScheme = e => {
		setColorScheme(e.matches ? 'dark' : 'light');
	};

	useEffect(() => {
		if (window && !colorSchemeWatcher) {
			setColorSchemeWatcher(true);

			const theColorSchemeWatcher = window.matchMedia(
				'(prefers-color-scheme: dark)'
			);
			theColorSchemeWatcher.addListener(watchColorScheme);

			return () => {
				theColorSchemeWatcher.removeListener(watchColorScheme);
			};
		}
	}, []);

	return (
		<>
			<Helmet>
				<html lang={locale} />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
				/>
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content={colorScheme === 'light' ? 'default' : 'black-translucent'}
				/>
				{locale === 'ja' && (
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=M+PLUS+1p:400,700&amp;display=swap&amp;subset=japanese"
					/>
				)}
			</Helmet>

			<Header locale={locale} home={home}>
				<nav className="menu">{menuLinks}</nav>
			</Header>

			<main className="site-main">
				<AnimatePresence>
					<motion.div
						key={`main-content-${id}`}
						className="main-content"
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={variants}
						style={{
							translateY: '0',
						}}
					>
						{children}
					</motion.div>
				</AnimatePresence>
			</main>

			<Footer locale={locale} />
		</>
	);
}

Layout.propTypes = {
	locale: PropTypes.string.isRequired,
	id: PropTypes.string,
	home: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

export default Layout;
