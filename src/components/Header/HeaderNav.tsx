import React from "react";
import PropTypes, { InferProps } from "prop-types";
import styled from "@emotion/styled";
import { Link, graphql, StaticQuery } from "gatsby";

import LangContext from "../LangContext";

import { PageTypes } from "../../utils/enums";
import { theme } from "../../utils/theme";
import { getSlug, getLanguageCode, getPageType } from "../../utils/functions";

const HeaderNavLink = styled(Link)`
	border-bottom: 2px solid ${theme.colors.headerLinkAccent.light};
	color: ${theme.colors.copy.light};
	display: block;
	font-weight: 500;
	margin-left: 1em;
	text-decoration: none;

	@media only screen and (prefers-color-scheme: dark) {
		border-bottom-color: ${theme.colors.headerLinkAccent.dark};
		color: ${theme.colors.copy.dark};
	}

	&:focus,
	&:hover {
		background-color: ${theme.colors.headerLinkAccent.light};
		border-bottom-color: ${theme.colors.copy.light};

		@media only screen and (prefers-color-scheme: dark) {
			background-color: ${theme.colors.headerLinkAccent.dark};
			border-bottom-color: ${theme.colors.copy.dark};
		}
	}

	&:focus {
		box-shadow:
			0 0 0 0.25em ${theme.colors.background.light},
			0 0 0 0.5em ${theme.colors.copy.light};

		@media only screen and (prefers-color-scheme: dark) {
			box-shadow:
				0 0 0 0.25em ${theme.colors.background.dark},
				0 0 0 0.5em ${theme.colors.copy.dark};
		}
	}

	&[aria-current="page"] {
		border-bottom-color: ${theme.colors.linkAccent.light};
		color: ${theme.colors.theme.light};

		@media only screen and (prefers-color-scheme: dark) {
			border-bottom-color: ${theme.colors.linkAccent.dark};
			color: ${theme.colors.theme.dark};
		}

		&:hover {
			background-color: ${theme.colors.linkAccent.light};
			border-bottom-color: ${theme.colors.theme.light};

			@media only screen and (prefers-color-scheme: dark) {
				background-color: ${theme.colors.linkAccent.dark};
				border-bottom-color: ${theme.colors.theme.dark};
			}
		}
	}

	@media (min-width: ${theme.breakpoints.md}) {
		border-bottom: 0;
		margin-bottom: 1em;
		margin-left: 0;
		transform: scale(-1);
		border-left: 2px solid ${theme.colors.headerLinkAccent.light};

		@media only screen and (prefers-color-scheme: dark) {
			border-left: 2px solid ${theme.colors.headerLinkAccent.dark};
		}

		&:lang(ja) {
			transform: none;
		}
	}
`;

const HeaderNavWrapper = styled("nav")`
	display: flex;

	@media (min-width: ${theme.breakpoints.md}) {
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
		console.log("header nav lang", this.props.lang);
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
