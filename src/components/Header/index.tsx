import React from "react";
import styled from "styled-components";
import { graphql, StaticQuery } from "gatsby";

import Stars from "./Stars";
import HeaderTitle from "./HeaderTitle";
import HeaderNav from "./HeaderNav";

const HeaderWrapper = styled("header")`
	align-items: center;
	background-image: ${props => props.theme.gradients.header};
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
		background-image: ${props => props.theme.gradients.header};
	}

	@media (min-width: ${props => props.theme.breakpoints.md}) and (min-height: ${props => props.theme.breakpoints.v}) {
		background-color: ${props => props.theme.colors.background};
		background-image: none;
		box-shadow: ${props => props.theme.shadows.card};
		height: 100vh;
		padding: 1em;
		width: 6em;
		writing-mode: vertical-lr;
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
