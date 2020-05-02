import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Helmet } from "react-helmet";
import { css, Global } from "@emotion/core";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import uniqid from "uniqid";

import Header from "./Header";
import Footer from "./Footer";

import needsReducedMotion from "../utils/needsReducedMotion";
import { theme } from "../utils/theme";

const MainWrapper = styled("main")`
	background-color: ${theme.colors.background.light};
	padding: 4em 0;
	position: relative;
	z-index: 2;

	@media only screen and (prefers-color-scheme: dark) {
		background-color: ${theme.colors.background.dark};
	}

	@media (min-width: ${theme.breakpoints.md}) {
		padding: 4em 0 4em 6em;
	}
`;

const LayoutWrapper = styled("div")`

`;

class Layout extends React.Component<InferProps<typeof Layout.propTypes>> {
	static propTypes = {
		shouldReduceMotion: PropTypes.bool.isRequired,
		id: PropTypes.string,
	};

	render() {
		const { shouldReduceMotion, id } = this.props;

		return (
			<LayoutWrapper>
				<Helmet>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=M+PLUS+1p:400,700&amp;display=swap&amp;subset=japanese"
					/>
				</Helmet>
				<Global
					styles={css`
						html {
							font-size: 62.5%;
						}

						body {
							background-color: ${theme.colors.accent.light};
							color: ${theme.colors.copy.light};
							font-family: ${theme.fonts.copy};
							font-size: 1.6rem;
							margin: 0;

							@media only screen and (prefers-color-scheme: dark) {
								background-color: ${theme.colors.accent.dark};
								color: ${theme.colors.copy.dark};
							}
						}

						p {
							line-height: 1.666;
							margin: 0 auto 1em;
							max-width: 65rem;
							width: calc(100% - 3.2rem);
						}

						img {
							max-width: 100%;
						}

						h1,
						h2,
						h3,
						h4,
						h5,
						h6 {
							font-family: ${theme.fonts.heading};
							line-height: 1;
							margin: 1em auto 0.5em;
							max-width: 65rem;
							width: calc(100% - 3.2rem);
						}

						ol,
						ul {
							box-sizing: border-box;
							line-height: 1.666;
							margin: 0 auto 1em;
							max-width: 65rem;
							width: calc(100% - 3.2rem);
						}

						a {
							border-bottom: 2px solid ${theme.colors.linkAccent.light};
							border-radius: 0;
							color: ${theme.colors.theme.light};
							font-weight: 500;
							text-decoration: none;
							transition:
								background-color ${theme.timings.default},
								border-bottom-color ${theme.timings.default},
								border-radius ${theme.timings.default},
								box-shadow ${theme.timings.default};

							@media only screen and (prefers-color-scheme: dark) {
								border-bottom-color: ${theme.colors.linkAccent.dark};
								color: ${theme.colors.theme.dark};
							}

							&:active {
								border-bottom-style: dashed;
							}

							&:focus,
							&:hover {
								background-color: ${theme.colors.linkAccent.light};
								border-bottom-color: ${theme.colors.theme.light};

								@media only screen and (prefers-color-scheme: dark) {
									background-color: ${theme.colors.linkAccent.dark};
									border-bottom-color: ${theme.colors.theme.dark};
								}
							}

							&:focus {
								border-radius: 2px;
								box-shadow:
									0 0 0 0.25em ${theme.colors.background.light},
									0 0 0 0.5em ${theme.colors.theme.light};
								outline: none;

								@media only screen and (prefers-color-scheme: dark) {
									box-shadow:
										0 0 0 0.25em ${theme.colors.background.dark},
										0 0 0 0.5em ${theme.colors.theme.dark};
								}
							}
						}

						.sr-only {
							border: 0;
							clip-path: inset(50%);
							height: 1px;
							margin: -1px;
							overflow: hidden;
							padding: 0;
							position: absolute;
							width: 1px;
							word-wrap: normal;
						}
					`}
				/>

				<Header />

				<MainWrapper>
					<AnimatePresence exitBeforeEnter>
						<motion.div
							key={id || uniqid()}
							variants={{
								hidden: {
									opacity: 0,
									y: shouldReduceMotion ? 0 : 50
								},
								visible: {
									opacity: 1,
									y: 0,
								},
							}}
							initial="hidden"
							animate="visible"
							exit="hidden"
						>
							{this.props.children}
						</motion.div>
					</AnimatePresence>
				</MainWrapper>

				<Footer />
			</LayoutWrapper>
		);
	}
}

export default needsReducedMotion(Layout);
