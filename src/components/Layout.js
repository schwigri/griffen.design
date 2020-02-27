import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './Header';
import Footer from './Footer';

function Layout({ locale, id = '', variants = {}, children }) {
	const [colorScheme, setColorScheme] = useState('light');
	const [colorSchemeListener, setColorSchemeListener] = useState(false);

	useEffect(() => {
		let colorSchemeQuery;

		if (window && !colorSchemeListener) {
			console.log('Hi');
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
							},
							visible: {
								opacity: 1,
								transition: {
									duration: 0.25,
									delay: 0.5,
								},
							},
							exit: {
								opacity: 0,
								transition: {
									duration: 0.25,
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
