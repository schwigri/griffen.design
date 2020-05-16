import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import * as Graphics from "../../graphics/graphics";

const HeaderStars = styled(Graphics.Stars)`
	height: 100%;
	width: auto;

	@media (min-width: ${props => props.theme.breakpoints.md}) and (min-height: ${props => props.theme.breakpoints.v}) {
		height: auto;
		width: 100%;
	}
`;

const HeaderStarsLink = styled(Link)`
	border-bottom: 0;
	display: block;
	height: 100%;
	width: auto;

	&:focus,
	&:hover {
		background-color: transparent;
	}

	@media (min-width: ${props => props.theme.breakpoints.md}) and (min-height: ${props => props.theme.breakpoints.v}) {
		height: auto;
		width: 100%;
	}
`;

class Stars extends React.Component {
	render() {
		return (
			<HeaderStarsLink to="/">
				<HeaderStars />
			</HeaderStarsLink>
		);
	}
}

export default Stars;
