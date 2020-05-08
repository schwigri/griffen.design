import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Link } from "gatsby";
import styled from "styled-components";
import uniqid from "uniqid";

import Tile, { TileWrapper, TileSubtitle } from "./Tile";

import { PageHeading } from "../Page";

import { getSlug, getReadMoreText } from "../../utils/functions";

const CollectionColumn = styled("div")`
	display: flex;
	flex-direction: column;

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		width: calc(50% - 1em);
	}

	&:first-child {
		@media (min-width: ${props => props.theme.breakpoints.md}) {
			align-items: flex-end;
			margin-right: 2em;
			margin-top: 2em;
		}

		${TileWrapper} {
			&:first-child {
				@media (min-width: ${props => props.theme.breakpoints.xl}) {
					padding-bottom: calc(9 / 16 * 100%);
					width: 100%;
				}
			}
		}
	}

	&:last-child {
		@media (min-width: ${props => props.theme.breakpoints.md}) {
			margin-top: 4em;
		}

		${TileWrapper}:last-child {
			@media (min-width: ${props => props.theme.breakpoints.xl}) {
				padding-bottom: 36.5625%;
				width: 65%;
			}

			${TileSubtitle} + p:not(:last-child) {
				@media (min-width: ${props => props.theme.breakpoints.xl}) {
					display: none;
				}
			}
		}
	}
`;

const CollectionWrapper = styled("div")`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	pointer-events: none;
	width: 100%;

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		flex-direction: row;
		width: calc(100% - 4em);
	}

	&:hover {
		${TileWrapper} {
			@media (min-width: ${props => props.theme.breakpoints.xl}) {
				transform: scale(0.95);
			}

			&:hover {
				@media (min-width: ${props => props.theme.breakpoints.xl}) {
					transform: scale(1.05);
				}
			}
		}
	}
`;

class Collection extends React.Component<InferProps<typeof Collection.propTypes>> {
	static propTypes = {
		items: PropTypes.arrayOf(
			PropTypes.shape({
				_meta: PropTypes.shape({
					lang: PropTypes.string.isRequired,
					type: PropTypes.string.isRequired,
					uid: PropTypes.string.isRequired,
				}).isRequired,
				title: PropTypes.array,
				tile_subtitle: PropTypes.string,
				tile_description: PropTypes.array,
				thumbnail: PropTypes.shape({
					url: PropTypes.string,
					alt: PropTypes.string,
				}),
			})
		),
		itemElement: PropTypes.string,
		title: PropTypes.array,
		subtitle: PropTypes.array,
	};

	render() {
		const collectionId = uniqid();
		const itemElement = this.props.itemElement || "div";
		const leftItems: React.ReactNode[] = [];
		const rightItems: React.ReactNode[] = [];

		this.props.items?.forEach((item, index) => {
			if (item) {
				const slug = getSlug(
					item._meta.lang,
					item._meta.type,
					item._meta.uid
				);

				const link = (
					<Link to={slug}>
						{getReadMoreText(
							item.title && item.title[0].text,
							item._meta.lang
						)}
					</Link>
				);

				const tile = (
					<Tile
						key={`${collectionId}-tile-${index}`}
						element={itemElement}
						image={item.thumbnail?.url}
						title={item.title}
						subtitle={item.tile_subtitle}
						description={item.tile_description}
						link={link}
					/>
				);
				index % 2 === 0 ? leftItems.push(tile) : rightItems.push(tile);
			}
		});

		return (
			<>
				{this.props.title && (
					<PageHeading title={this.props.title} subtitle={this.props.subtitle} />
				)}

				<CollectionWrapper>
					<CollectionColumn>{leftItems}</CollectionColumn>
					<CollectionColumn>{rightItems}</CollectionColumn>
				</CollectionWrapper>
			</>
		);
	}
}

export default Collection;

export { Tile };
