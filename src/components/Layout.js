import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import Header from './Header';
import Footer from './Footer';

function Layout({ locale, id = '', variants = {}, children }) {
	const shouldReduceMotion = useReducedMotion();

	const [colorScheme, setColorScheme] = useState('light');
	const [colorSchemeListener, setColorSchemeListener] = useState(false);

	useEffect(() => {
		let colorSchemeQuery;

		if (window && !colorSchemeListener) {
			setColorSchemeListener(true);
			colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

			if (colorSchemeQuery.matches) {
				setColorScheme('dark');
			} else {
				setColorScheme('light');
			}

			colorSchemeQuery.addListener(() => {
				if (colorSchemeQuery.matches) {
					setColorScheme('dark');
				} else {
					setColorScheme('light');
				}
			});
		}
	}, [colorScheme, colorSchemeListener]);

	return (
		<div className="site">
			<Helmet>
				<html lang={locale} className={colorScheme} />

				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no, 	viewport-fit=cover"
				/>

				{locale === 'ja' && (
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=M+PLUS+1p:400,700&amp;display=swap&amp;subset=japanese"
					/>
				)}
			</Helmet>

			<Header locale={locale} id={id} />

			<AnimatePresence>
				<main className="site-main" key={`main-${id}`}>
					<motion.div
						key={`main-content-${id}`}
						className="main-content"
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={{
							hidden: {
								opacity: 0,
								y: shouldReduceMotion ? 0 : 64,
							},
							visible: {
								opacity: 1,
								y: 0,
								transition: {
									delay: 0.6,
									ease: 'easeOut',
								},
							},
							exit: {
								opacity: 0,
								y: shouldReduceMotion ? 0 : 64,
								transition: {
									ease: 'easeOut',
								},
							},
						}}
					>
						{children}
					</motion.div>
				</main>

				<Footer locale={locale} id={`footer-${id}`} variants={variants} />
			</AnimatePresence>
		</div>
	);
}

Layout.propTypes = {
	locale: PropTypes.string.isRequired,
	id: PropTypes.string,
	variants: PropTypes.shape({
		en: PropTypes.shape({
			link: PropTypes.string.isRequired,
		}).isRequired,
		de: PropTypes.shape({
			link: PropTypes.string.isRequired,
		}).isRequired,
		ja: PropTypes.shape({
			link: PropTypes.string.isRequired,
		}).isRequired,
	}),
	children: PropTypes.node.isRequired,
};

export default Layout;
