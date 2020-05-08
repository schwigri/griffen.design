import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { graphql, Link, StaticQuery } from "gatsby";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";

import LangContext from "./LangContext";

import { PageTypes } from "../utils/enums";
import { getSlug, getPreviousText, getNextText } from "../utils/functions";

interface ProjectFooterEntryProps {
	direction?: string;
}

const ProjectFooterEntry = styled("div")<ProjectFooterEntryProps>`
	align-items: ${props => props.direction === "next" ? "flex-end" : "flex-start"};
	display: flex;
	flex-direction: column;
	float: ${props => props.direction === "next" ? "right" : "left"};
	justify-content: center;
	text-align: ${props => props.direction === "next" ? "right" : "left"};
	width: 100%;

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		width: 45%;
	}

	span {
		font-size: 0.9em;
	}

	a {
		font-size: 1.2em;
		margin-top: 0.5em;
	}
`;

const ProjectFooterWrapper = styled("div")`
	margin: 4em auto 0;
	max-width: ${props => props.theme.sizes.copy};
	width: calc(100% - 2em);

	&::after {
		clear: both;
		content: "";
		display: block;
	}
`;

class ProjectFooter extends React.Component<InferProps<typeof ProjectFooter.propTypes>> {
	static propTypes = {
		uid: PropTypes.string.isRequired,
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
								}),
								projects: PropTypes.arrayOf(
									PropTypes.shape({
										project: PropTypes.shape({
											_meta: PropTypes.shape({
												uid: PropTypes.string.isRequired,
											}),
											title: PropTypes.array,
										}),
									})
								)
							}),
						})
					).isRequired,
				}).isRequired,
			}).isRequired,
		})
	};

	render() {
		console.log("FOOTER:", typeof RichText);
		const { uid } = this.props;
		const { lang } = this.props.lang || "en-us";
		const layout = this.props.data?.prismic.allLayouts.edges
			.filter(x => x?.node?._meta?.lang === lang)[0];

		const currentProject = layout?.node?.projects?.findIndex(x => x?.project?._meta?.uid === uid) || 0;

		let previousProject;
		let nextProject;

		if (currentProject > 0) {
			previousProject = layout?.node?.projects ? layout?.node?.projects[currentProject - 1] : undefined;
		}

		if (currentProject < ((layout?.node?.projects?.length || 0) - 1)) {
			nextProject = layout?.node?.projects ? layout?.node?.projects[currentProject + 1] : undefined;
		}

		return (
			<ProjectFooterWrapper>
				{previousProject && (
					<ProjectFooterEntry>
						<span>{getPreviousText(lang)}</span>
						<Link to={getSlug(lang, PageTypes.PROJECT, previousProject.project?._meta?.uid)}>
							{RichText.asText(previousProject.project?.title)}
						</Link>
					</ProjectFooterEntry>
				)}
				{nextProject && (
					<ProjectFooterEntry direction="next">
						<span>{getNextText(lang)}</span>
						<Link to={getSlug(lang, PageTypes.PROJECT, nextProject.project?._meta?.uid)}>
							<RichText renderAsText={nextProject.project?.title} />
						</Link>
					</ProjectFooterEntry>
				)}
			</ProjectFooterWrapper>
		);
	}
}

function getProjectFooter({ uid }: InferProps<typeof getProjectFooter.propTypes>) {
	const query = graphql`
		query ProjectFooterQuery {
			prismic {
				allLayouts {
					edges {
						node {
							_meta {
								lang
							}
							projects {
								project {
									... on PRISMIC_Project {
										_meta {
											uid
										}
										title
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
			{langContext => (
				<StaticQuery
					query={`${query}`}
					render={data => (
						<ProjectFooter lang={langContext} uid={uid} data={data} />
					)}
				/>
			)}
		</LangContext.Consumer>
	);
}

getProjectFooter.propTypes = {
	uid: PropTypes.string.isRequired,
};

export default getProjectFooter;
