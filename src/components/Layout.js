import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './Header';
import Footer from './Footer';

function Layout({ locale, id = '', variants = {}, children }) {
	return (
		<div className="site">
			<Helmet>
				<html lang={locale} />
				{locale === 'ja' && (
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=M+PLUS+1p:400,700&amp;display=swap&amp;subset=japanese"
					/>
				)}
			</Helmet>

			<Header locale={locale} id={id} />

			<AnimatePresence>
				<motion.main
					key={`main-content-${id}`}
					className="site-main"
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
				</motion.main>

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
