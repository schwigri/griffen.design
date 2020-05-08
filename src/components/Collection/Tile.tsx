import React from "react";
import PropTypes, { InferProps } from "prop-types";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";

const TileForeground = styled("div")`
	box-sizing: border-box;
	padding: 1em;
	position: relative;
	transition: opacity ${props => props.theme.timings.default};
	z-index: 2;

	@media (min-width: ${props => props.theme.breakpoints.xl}) {
		align-items: center;
		color: #fff;
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		opacity: 0;
		position: absolute;
		text-align: center;
		width: 100%;
	}

	h1,
	p {
		width: 100%;
	}

	h1 {
		font-size: 1.8em;
		margin-top: 0;
	}

	p {
		@media (min-width: ${props => props.theme.breakpoints.xl}) {
			box-sizing: border-box;
			padding: 0 3em;
		}

		&:last-child {
			margin-bottom: 0;
		}

		&:nth-child(2):not(:nth-last-child(2)) {
			color: ${props => props.theme.colors.subtitle};
			font-family: ${props => props.theme.fonts.heading};
			font-size: 1.2em;

			@media (min-width: ${props => props.theme.breakpoints.xl}) {
				color: inherit;
			}
		}
	}
`;

const TileBackgroundImage = styled("img")`
	height: 100%;
	left: 0;
	object-fit: cover;
	position: absolute;
	top: 0;
	transition: opacity ${props => props.theme.timings.default};
	width: 100%;
`;

const TileBackground = styled("div")`
	background-color: #000;
	height: 0;
	padding-bottom: calc(9 / 16 * 100%);
	position: relative;
	width: 100%;
	z-index: 1;

	@media (min-width: ${props => props.theme.breakpoints.xl}) {
		position: absolute;
	}
`;

const TileWrapper = styled("div")`
	box-shadow: ${props => props.theme.shadows.card};
	margin: 0 0 2em;
	overflow: hidden;
	pointer-events: auto;
	position: relative;
	transition:
		box-shadow ${props => props.theme.timings.default},
		transform ${props => props.theme.timings.default};
	width: 100%;

	@media (min-width: ${props => props.theme.breakpoints.xl}) {
		border: 0;
		border-radius: 2px;
		height: 0;
		padding-bottom: 47.8125%;
		width: 85%;
	}

	&:hover {
		${TileForeground} {
			opacity: 1;
		}

		${TileBackgroundImage} {
			@media (min-width: ${props => props.theme.breakpoints.xl}) {
				opacity: 0.1;
			}
		}
	}
`;

class Tile extends React.Component<InferProps<typeof Tile.propTypes>> {
	static propTypes = {
		element: PropTypes.string,
		image: PropTypes.string,
		title: PropTypes.array,
		subtitle: PropTypes.array,
		description: PropTypes.array,
		link: PropTypes.node,
	};

	render() {
		const element = (this.props.element || "div") as React.ElementType;
		const { image, title, subtitle, description, link } = this.props;

		console.log(title, subtitle);

		return (
			<TileWrapper as={element}>
				<TileBackground>
					{image && <TileBackgroundImage src={image} />}
				</TileBackground>

				<TileForeground>
					{title && <RichText render={title} />}
					{subtitle && <RichText render={subtitle} />}
					{description && <RichText render={description} />}
					{link && <p>{link}</p>}
				</TileForeground>
			</TileWrapper>
		);
	}
}

export default Tile;

export { TileWrapper, TileForeground };
