import React from "react";
import styled from "@emotion/styled";
import { graphql, StaticQuery } from "gatsby";

import Stars from "./Stars";
import HeaderTitle from "./HeaderTitle";
import HeaderNav from "./HeaderNav";

import { theme } from "../../utils/theme";

const HeaderWrapper = styled("header")`
	align-items: center;
	background-image: ${theme.gradients.header.light};
	box-sizing: border-box;
	display: flex;
	height: 4em;
	justify-content: space-between;
	left: 0;
	padding: 1em 1em 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 3;

	@media only screen and (prefers-color-scheme: dark) {
		background-image: ${theme.gradients.header.dark};
	}

	@media (min-width: ${theme.breakpoints.md}) {
		background-color: ${theme.colors.background.light};
		background-image: none;
		box-shadow: ${theme.shadows.card};
		height: 100vh;
		padding: 1em;
		width: 6em;
		writing-mode: vertical-lr;

		@media only screen and (prefers-color-scheme: dark) {
			background-color: ${theme.colors.background.dark};
		}
	}
`;

class Header extends React.Component {
	render() {
		return (
			<HeaderWrapper>
				<Stars />

				<HeaderTitle />

				<HeaderNav />
			</HeaderWrapper>
		);
	}
}

export default Header;

export { HeaderNav };
