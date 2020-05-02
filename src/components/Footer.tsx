import React from "react";
import PropTypes, { InferProps, string } from "prop-types";
import styled from "@emotion/styled";
import { graphql, Link, StaticQuery } from "gatsby";

import LangContext from "./LangContext";

import { AlternateLanguage, PageTypes, languages } from "../utils/enums";
import { theme } from "../utils/theme";
import { getSlug, getLanguageCode, getPageType } from "../utils/functions";

interface FooterLocaleProps {
	current?: any;
}

const FooterLocale = styled(Link)<FooterLocaleProps>`
	align-items: center;
	background-color: ${props => !!props.current ? theme.colors.background.light : "transparent"};
	border: 0;
	box-sizing: border-box;
	color: ${theme.colors.copy.light};
	display: inline-flex;
	font-size: 0.9em;
	font-weight: 400;
	height: 3.6rem;
	justify-content: center;
	position: relative;
	width: 3.6rem;
	z-index: 1;

	@media only screen and (prefers-color-scheme: dark) {
		background-color: ${props => !!props.current ? theme.colors.background.dark : "transparent"};
		color: ${theme.colors.copy.dark};
	}

	&:focus,
	&:hover {
		background-color: ${props => !!props.current ? theme.colors.background.light : theme.colors.langLinkAccent.light};
		z-index: 2;

		@media only screen and (prefers-color-scheme: dark) {
			background-color: ${props => !!props.current ? theme.colors.background.dark : theme.colors.langLinkAccent.dark};
		}
	}

	&:focus {
		z-index: 3;
	}
`;

const FooterSection = styled("div")`
	align-items: center;
	display: flex;
	flex-direction: column;

	& > a,
	& > span {
		margin-bottom: 1em;
	}

	@media (min-width: ${theme.breakpoints.md}) {
		display: block;

		& > a,
		& > span {
			margin-bottom: 0;
		}
	}
`;

const FooterDivider = styled("span")`
	display: none;

	@media (min-width: ${theme.breakpoints.md}) {
		display: inline;
	}
`;

const FooterWrapper = styled("footer")`
	align-items: center;
	background-color: ${theme.colors.accent.light};
	bottom: 0;
	display: flex;
	flex-direction: column;
	padding: 2em;
	position: sticky;
	z-index: 1;

	@media only screen and (prefers-color-scheme: dark) {
		background-color: ${theme.colors.accent.dark};
	}

	@media (min-width: ${theme.breakpoints.md}) {
		flex-direction: row;
		justify-content: space-between;
		padding-left: 8em;
	}

	@media (min-width: ${theme.breakpoints.lg}) {
		padding: 4em 4em 4em 10em;
	}
`;

class Footer extends React.Component<InferProps<typeof Footer.propTypes>> {
	static propTypes = {
		lang: PropTypes.shape({
			lang: PropTypes.string.isRequired,
			alternateLanguages: PropTypes.array,
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
								copyright_notice: PropTypes.string,
								github_link_text: PropTypes.string,
								github_link_emojis: PropTypes.string,
								links: PropTypes.arrayOf(
									PropTypes.shape({
										page: PropTypes.shape({
											_meta: PropTypes.shape({
												lang: PropTypes.string.isRequired,
												uid: PropTypes.string.isRequired,
											}).isRequired,
											type: PropTypes.string.isRequired,
											nav_title: PropTypes.string,
										}),
									}),
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

		const {
			copyright_notice,
			github_link_text,
			github_link_emojis,
		} = layout.node;

		const links = layout.node.links || [];

		return (
			<FooterWrapper>
				<FooterSection>
					<span>{copyright_notice || "© 2020"}</span>
					<FooterDivider> / </FooterDivider>

					{links.map(link => {
						if (link && link.page) {
							const { _meta, type, nav_title } = link.page;
							const slug = getSlug(getLanguageCode(_meta.lang || ""), getPageType(type), _meta.uid);
							console.log('footer link slug:', slug);

							return (
								<span key={slug}>
									<Link to={slug}>{nav_title}</Link>
									<FooterDivider> / </FooterDivider>
								</span>
							);
						}
					})}

					<a
						href="https://github.com/schwigri/griffen.design"
						target="_blank"
						rel="noopener noreferrer"
					>
						<abbr title={github_link_text || ""}>
							{github_link_emojis || "💖✌️⚛️🐛"}
						</abbr>
					</a>
				</FooterSection>

				<div>
					<LangContext.Consumer>
						{alternates => Object.keys(languages).map(langCode => {
							let alternate: AlternateLanguage = {
								lang: getLanguageCode(langCode),
								uid: alternates.uid,
							};
							let type = alternates.type;

							if (langCode !== this.props.lang.lang) {
								const altLang = alternates.alternateLanguages?.filter(x => x.lang === langCode)[0] || null;
								alternate = altLang || { lang: langCode, uid: "home" } as AlternateLanguage;
								if (!altLang) type = PageTypes.HOME;
							}
							const slug = getSlug(alternate.lang, type, alternate.uid);
							const isCurrentLang = langCode === this.props.lang.lang ? 1 : undefined;

							return (
								<FooterLocale current={isCurrentLang} key={langCode} to={slug}>
									<span className="sr-only">{languages[alternate.lang].name}</span>
									<span aria-hidden="true">{languages[alternate.lang].abbreviation}</span>
								</FooterLocale>
							);
						})}
					</LangContext.Consumer>
				</div>
			</FooterWrapper>
		);
	}
}

export default () => {
	const query = graphql`
		query FooterQuery {
			prismic {
				allLayouts {
					edges {
						node {
							_meta {
								lang
							}
							copyright_notice
							github_link_text
							github_link_emojis
							links {
								page {
									... on PRISMIC_Page {
										_meta {
											lang
											uid
										}
										type
										nav_title
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
		<LangContext.Consumer>
		{lang => (
			<StaticQuery
				query={`${query}`}
				render={data => {console.log(data); return <Footer lang={lang} data={data} />;}}
			/>
		)}
		</LangContext.Consumer>
	);
};