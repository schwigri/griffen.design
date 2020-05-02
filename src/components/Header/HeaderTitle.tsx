import React from "react";
import PropTypes, { InferProps } from "prop-types";
import styled from "@emotion/styled";
import { graphql, Link, StaticQuery } from "gatsby";

import LangContext from "../LangContext";

import { PageTypes } from "../../utils/enums";
import { theme } from "../../utils/theme";
import { getSlug, getLanguageCode } from "../../utils/functions";

const HeaderTitleLink = styled(Link)`
	background-color: transparent;
	border-bottom: 0;
	color: ${theme.colors.copy.light};
	display: none;
	font-family: ${theme.fonts.heading};
	text-decoration: none;

	@media only screen and (prefers-color-scheme: dark) {
		color: ${theme.colors.copy.dark};
	}

	&:focus,
	&:hover {
		background-color: transparent;
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

	@media (min-width: ${theme.breakpoints.md}) {
		display: block;
		transform: scale(-1);

		&:lang(ja) {
			transform: none;
		}
	}
`;

class HeaderTitle extends React.Component<InferProps<typeof HeaderTitle.propTypes>> {
	static propTypes = {
		langContext: PropTypes.shape({
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
								title: PropTypes.string.isRequired,
							}).isRequired,
						}).isRequired,
					).isRequired,
				}).isRequired,
			}).isRequired,
		}).isRequired,
	};

	render() {
		const { langContext } = this.props;
		const title = this.props.data.prismic.allLayouts.edges.filter(x => x.node._meta.lang === langContext.lang)[0].node.title;

		return (
			<HeaderTitleLink to={getSlug(getLanguageCode(langContext.lang), PageTypes.HOME)}>
				{title}
			</HeaderTitleLink>
		);
	}
}

export default () => {
	const query = graphql`
		query HeaderTitleQuery {
			prismic {
				allLayouts {
					edges {
						node {
							_meta {
								lang
							}
							title
						}
					}
				}
			}
		}
	`;

	return (
		<LangContext.Consumer>
		{langContext => (
			<StaticQuery
				query={`${query}`}
				render={data => <HeaderTitle langContext={langContext} data={data} />}
			/>
		)}
		</LangContext.Consumer>
	);
};
