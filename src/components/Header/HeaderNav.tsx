import React from "react";
import PropTypes, { InferProps } from "prop-types";
import styled from "styled-components";
import { Link, graphql, StaticQuery } from "gatsby";

import LangContext from "../LangContext";

import { PageTypes } from "../../utils/enums";
import { getSlug, getLanguageCode, getPageType } from "../../utils/functions";

const HeaderNavLink = styled(Link)`
	border-bottom: 2px solid ${props => props.theme.colors.headerLinkAccent};
	color: ${props => props.theme.colors.copy};
	display: block;
	font-weight: 500;
	margin-left: 1em;
	text-decoration: none;

	&:focus,
	&:hover {
		background-color: ${props => props.theme.colors.headerLinkAccent};
		border-bottom-color: ${props => props.theme.colors.copy};
	}

	&:focus {
		box-shadow:
			0 0 0 0.25em ${props => props.theme.colors.background},
			0 0 0 0.5em ${props => props.theme.colors.copy};
	}

	&[aria-current="page"] {
		border-bottom-color: ${props => props.theme.colors.linkAccent};
		color: ${props => props.theme.colors.theme};

		&:hover {
			background-color: ${props => props.theme.colors.linkAccent};
			border-bottom-color: ${props => props.theme.colors.theme};
		}
	}

	@media (min-width: ${props => props.theme.breakpoints.md}) and (min-height: ${props => props.theme.breakpoints.v}) {
		border-bottom: 0;
		margin-bottom: 1em;
		margin-left: 0;
		transform: scale(-1);
		border-left: 2px solid ${props => props.theme.colors.headerLinkAccent};

		&:lang(ja) {
			transform: none;
		}
	}
`;

const HeaderNavWrapper = styled("nav")`
	display: flex;

	@media (min-width: ${props => props.theme.breakpoints.md}) and (min-height: ${props => props.theme.breakpoints.v}) {
		flex-direction: row-reverse;
	}
`;

class HeaderNav extends React.Component<InferProps<typeof HeaderNav.propTypes>> {
	static propTypes = {
		lang: PropTypes.shape({
			lang: PropTypes.string.isRequired,
		}).isRequired,
		data: PropTypes.shape({
			prismic: PropTypes.shape({
				allLayouts: PropTypes.shape({
					edges: PropTypes.arrayOf(
						PropTypes.shape({
							node: PropTypes.shape({
								_meta: PropTypes.shape({
									lang: PropTypes.string.isRequired,
								}).isRequired,
								nav_links: PropTypes.arrayOf(
									PropTypes.shape({
										nav_link: PropTypes.shape({
											_meta: PropTypes.shape({
												uid: PropTypes.string.isRequired,
												lang: PropTypes.string.isRequired,
											}).isRequired,
											nav_title: PropTypes.string,
											type: PropTypes.string,
										}),
									})
								),
							}).isRequired,
						}).isRequired,
					).isRequired,
				}).isRequired,
			}).isRequired,
		}).isRequired,
	};

	render() {
		const layout = this.props.data.prismic.allLayouts.edges.filter(x => x.node._meta.lang === this.props.lang.lang)[0];

		return (
			<HeaderNavWrapper>
				{layout.node.nav_links?.map(page => {
					if (page?.nav_link) {
						const slug = getSlug(getLanguageCode(page?.nav_link?._meta.lang || undefined), getPageType(page?.nav_link?.type || undefined), page?.nav_link?._meta.uid || "");
						return (
							<HeaderNavLink key={slug} to={slug}>{page?.nav_link?.nav_title || "Untitled"}</HeaderNavLink>
						);
					}
				})}
			</HeaderNavWrapper>
		);
	}
}

export default () => {
	const query = graphql`
		query HeaderNavQuery {
			prismic {
				allLayouts {
					edges {
						node {
							_meta {
								lang
							}
							nav_links {
								nav_link {
									... on PRISMIC_Page {
										_meta {
											uid
											lang
										}
										nav_title
										type
									}
								}
							}
						}
					}
				}
			}
		}
	`;

	return (
		<StaticQuery
			query={`${query}`}
			render={data => (
				<LangContext.Consumer>
					{contextLang => <HeaderNav lang={contextLang} data={data} />}
				</LangContext.Consumer>
			)}
		/>
	);
};
