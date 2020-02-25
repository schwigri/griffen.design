import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { motion, AnimatePresence } from 'framer-motion';
import uniqid from 'uniqid';

import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';

const variants = {
	hidden: {
		opacity: 0,
		scale: 0.8,
		translateY: '1em',
	},
	visible: {
		opacity: 1,
		scale: 1,
		translateY: 0,
		transition: {
			delay: 0.6,
		},
	},
	exit: {
		opacity: 0,
		scale: 0.8,
		translateY: '-1em',
	},
};

function Layout({ locale, home = false, children }) {
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

	// const shouldReduceMotion = useReducedMotion();

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
			</Helmet>

			<Header locale={locale} home={home}>
				<Menu>
					<Link to="/about" className="menu-link">About</Link>
				</Menu>
			</Header>

			<main className="site-main">
				<AnimatePresence>
					<motion.div
						key={uniqid('main-content-')}
						className="main-content"
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={variants}
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
	home: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

export default Layout;
