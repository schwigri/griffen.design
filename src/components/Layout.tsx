import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Helmet } from "react-helmet";
import styled, { DefaultTheme, ThemeProvider } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import uniqid from "uniqid";

import Header from "./Header";
import Footer from "./Footer";

import needsReducedMotion from "../utils/needsReducedMotion";
import theme, { darkTheme } from "../utils/theme";
import GlobalStyle from "../utils/globalStyle";

const MainWrapper = styled("main")`
	background-color: ${props => props.theme.colors.background};
	padding: 4em 0;
	position: relative;
	z-index: 2;

	@media (min-width: ${theme.breakpoints.md}) {
		padding: 4em 0 4em 6em;
	}
`;

const LayoutWrapper = styled("div")`

`;

interface LayoutState {
	currentTheme: DefaultTheme;
	darkModeQuery?: MediaQueryList;
}

class Layout extends React.Component<InferProps<typeof Layout.propTypes>, LayoutState> {
	static propTypes = {
		shouldReduceMotion: PropTypes.bool.isRequired,
		id: PropTypes.string,
	};

	constructor(props: InferProps<typeof Layout.propTypes>) {
		super(props);

		this.state = { currentTheme: darkTheme };
	}

	componentDidMount() {
		const darkModeQuery = window.matchMedia("print, (prefers-color-scheme: light)");

		const updateTheme = () => {
			darkModeQuery.matches ? this.setState({ currentTheme: theme }) : this.setState({ currentTheme: darkTheme });
		};

		darkModeQuery.addListener(updateTheme);

		updateTheme();
	}

	render() {
		const { currentTheme } = this.state;
		const { shouldReduceMotion, id } = this.props;

		return (
			<ThemeProvider theme={currentTheme}>
				<LayoutWrapper>
					<Helmet>
						<link
							rel="stylesheet"
							href="https://fonts.googleapis.com/css?family=M+PLUS+1p:400,700&amp;display=swap&amp;subset=japanese"
						/>
					</Helmet>

					<GlobalStyle />

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
			</ThemeProvider>
		);
	}
}

export default needsReducedMotion(Layout);
