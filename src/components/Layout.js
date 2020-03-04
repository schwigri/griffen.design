import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import Header from './Header';
import Footer from './Footer';
import { Link } from 'gatsby';

import * as Graphics from '../graphics/graphics';

function Layout({ locale, id = '', variants = {}, children }) {
	const shouldReduceMotion = useReducedMotion();
	const availableLanguages = {
		en: {
			name: 'English',
			message: 'This page is available in English.',
			close: 'Close this notice',
		},
		de: {
			name: 'Deutsch',
			message: 'Diese Seite ist in deutsch verfügbar.',
			clost: 'Schliessen',
		},
		ja: {
			name: '日本語',
			message: 'このページは日本語でも読めます。',
			close: '閉じる',
		},
	};

	const [colorScheme, setColorScheme] = useState('light');
	const [colorSchemeListener, setColorSchemeListener] = useState(false);
	const [userLanguage, setUserLanguage] = useState(null);
	const [noticeVisible, setNoticeVisible] = useState(false);

	useEffect(() => {
		if (!userLanguage) {
			const detectBrowserLanguage = require('detect-browser-language');
			setUserLanguage(detectBrowserLanguage().substring(0, 2));

			const userSettings = sessionStorage.getItem('hide-lang-notice')
				? JSON.parse(sessionStorage.getItem('hide-lang-notice'))
				: null;
			if (
				userSettings &&
				userSettings.hide === true &&
				userSettings.lang === detectBrowserLanguage().substring(0, 2)
			) {
				setNoticeVisible(false);
			} else {
				setNoticeVisible(true);
			}
		}
	}, [userLanguage, noticeVisible]);

	const hideNotice = () => {
		setNoticeVisible(false);
		const userSettings = {
			hide: true,
			lang: userLanguage,
		};
		sessionStorage.setItem('hide-lang-notice', JSON.stringify(userSettings));
	};

	const langNotice = () => {
		if (
			userLanguage &&
			availableLanguages[userLanguage] &&
			locale !== userLanguage &&
			noticeVisible
		) {
			const toLink =
				variants && variants[userLanguage]
					? variants[userLanguage].link
					: 'en' === userLanguage
					? '/'
					: `/${userLanguage}/`;

			return (
				<motion.div
					key="lang-notice"
					className="language-notice"
					data-visible={noticeVisible}
					variants={{
						hidden: {
							opacity: 0,
							y: shouldReduceMotion ? 0 : -50,
						},
						visible: {
							opacity: 1,
							y: 0,
							transition: {
								delay: 0.9,
							},
						},
					}}
					initial="hidden"
					animate="visible"
					exit="hidden"
				>
					<p>
						<Link to={toLink}>{availableLanguages[userLanguage].message}</Link>
					</p>
					<button className="toggle" onClick={hideNotice}>
						<span className="sr-only">{availableLanguages[locale].close}</span>
						<span className="toggle-icon">
							<Graphics.Close />
						</span>
					</button>
				</motion.div>
			);
		}
	};

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

				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=M+PLUS+1p:400,700&amp;display=swap&amp;subset=japanese"
				/>
			</Helmet>

			<Header locale={locale} id={id} />

			<AnimatePresence>
				{langNotice()}

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
									ease: 'easeIn',
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
