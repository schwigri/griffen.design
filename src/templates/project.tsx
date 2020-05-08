import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import { RichText } from "prismic-reactjs";
import uniqid from "uniqid";

import Page, { PageHeading } from "../components/Page";
import SEO from "../components/SEO";
import PDF from "../components/PDF";
import Figure from "../components/Figure";
import ProjectFooter from "../components/ProjectFooter";

import {
	AlternateLanguage,
	ProjectBodyItemTypes,
	ProjectBodyItem,
	ProjectBodyTextItem,
	ProjectBodyPDFItem,
	ProjectBodyImageItem,
} from "../utils/enums";

class ProjecTemplate extends React.Component<InferProps<typeof ProjecTemplate.propTypes>> {
	static propTypes = {
		pageContext: PropTypes.shape({
			uid: PropTypes.string.isRequired,
			lang: PropTypes.string.isRequired,
			siteMetadata: PropTypes.shape({
				title: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired,
			}).isRequired,
			titleSuffix: PropTypes.string,
		}).isRequired,
		data: PropTypes.shape({
			prismic: PropTypes.shape({
				project: PropTypes.shape({
					_meta: PropTypes.shape({
						id: PropTypes.string.isRequired,
						uid: PropTypes.string.isRequired,
						lang: PropTypes.string.isRequired,
						alternateLanguages: PropTypes.arrayOf(
							PropTypes.shape({
								uid: PropTypes.string.isRequired,
								lang: PropTypes.string.isRequired,
							}).isRequired,
						),
					}).isRequired,
					meta_title: PropTypes.string,
					meta_description: PropTypes.string,
					title: PropTypes.array,
					subtitle: PropTypes.array,
					challenge: PropTypes.array,
					outcome: PropTypes.array,
					body: PropTypes.arrayOf(
						PropTypes.oneOfType([
							// Shape for text
							PropTypes.shape({
								type: PropTypes.string.isRequired,
								fields: PropTypes.arrayOf(
									PropTypes.shape({
										content: PropTypes.array,
									}),
								),
							}),

							// Shape for PDF
							PropTypes.shape({
								type: PropTypes.string.isRequired,
								primary: PropTypes.shape({
									number_of_pages: PropTypes.number,
									pdf_file: PropTypes.shape({
										url: PropTypes.string,
									}),
									pdf_url: PropTypes.shape({
										url: PropTypes.string,
									}),
								}).isRequired,
							}),

							// Shape for image
							PropTypes.shape({
								type: PropTypes.string.isRequired,
								fields: PropTypes.arrayOf(
									PropTypes.shape({
										caption: PropTypes.string,
										imageSharp: PropTypes.shape({
											childImageSharp: PropTypes.shape({
												fluid: PropTypes.object.isRequired,
											}).isRequired,
										}),
									})
								),
							})
						]),
					),
				}).isRequired,
			}).isRequired,
		}).isRequired,
	};

	render() {
		const { siteMetadata, titleSuffix } = this.props.pageContext;
		const {
			_meta,
			meta_title,
			meta_description,
			title,
			subtitle,
			challenge,
			outcome,
			body,
		} = this.props.data.prismic.project;

		return (
			<Page>
				<SEO
					title={meta_title || "Untitled"}
					titleSuffix={titleSuffix || undefined}
					description={meta_description || siteMetadata.description}
				/>
				<PageHeading
					title={title}
					subtitle={subtitle}
					challenge={challenge}
					outcome={outcome}
				/>

				{body && body.length > 0 && body.map(section => {
					if (section) {
						switch (section.type) {
							case ProjectBodyItemTypes.TEXT:
								const textBodyItem = section as ProjectBodyTextItem;
								return textBodyItem.fields?.map(field => field ? <RichText key={uniqid()} render={field.content || null} /> : null);

							case ProjectBodyItemTypes.PDF:
								const pdfBodyItem = section as ProjectBodyPDFItem;
								const url = pdfBodyItem.primary?.pdf_file?.url || pdfBodyItem.primary?.pdf_url?.url || null;
								const numPages = pdfBodyItem.primary?.number_of_pages || 1;
								if (url) return <PDF key={uniqid()} url={url} pages={numPages} />;

							case ProjectBodyItemTypes.IMAGE:
								const imageBodyItem = section as ProjectBodyImageItem;
								return imageBodyItem.fields?.map(field => {
									if (field) {
										const image = <Img fluid={field.imageSharp?.childImageSharp.fluid} />;
										return <Figure key={uniqid()} figure={image} caption={field.caption} />;
									}
								});

							default:
								return null;
						}
					}
				})}

				<ProjectFooter uid={_meta.uid} />
			</Page>
		);
	}
}

export default ProjecTemplate;

export const query = graphql`
	query ProjectTemplateQuery($uid: String!, $lang: String!) {
		prismic {
			project(uid: $uid, lang: $lang) {
				_meta {
					id
					uid
					lang
					alternateLanguages {
						uid
						lang
					}
				}
				meta_title
				meta_description
				title
				subtitle
				challenge
				outcome
				body {
					... on PRISMIC_ProjectBodyText {
						type
						fields {
							content
						}
					}
					... on PRISMIC_ProjectBodyPdf {
						type
						primary {
							number_of_pages
							pdf_url {
								... on PRISMIC__ExternalLink {
									url
								}
							}
							pdf_file {
								... on PRISMIC__FileLink {
									url
								}
							}
						}
					}
					... on PRISMIC_ProjectBodyImage {
						type
						fields {
							caption
							image
							imageSharp {
								childImageSharp {
									fluid(maxWidth: 1200) {
										...GatsbyImageSharpFluid
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;
