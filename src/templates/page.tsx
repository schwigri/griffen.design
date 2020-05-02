import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { RichText } from "prismic-reactjs";
import uniqid from "uniqid";

import Page, { PageHeading } from "../components/Page";
import PDF from "../components/PDF";
import SEO from "../components/SEO";
import Figure from "../components/Figure";

import {
	AlternateLanguage,
	PageBodyItemTypes,
	PageBodyItem,
	PageBodyTextItem,
	PageBodyPDFItem,
	PageBodyImageItem,
} from "../utils/enums";

class PageTemplate extends React.Component<InferProps<typeof PageTemplate.propTypes>> {
	static propTypes = {
		pageContext: PropTypes.shape({
			uid: PropTypes.string.isRequired,
			lang: PropTypes.string.isRequired,
			titleSuffix: PropTypes.string,
			siteMetadata: PropTypes.shape({
				description: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
		data: PropTypes.shape({
			prismic: PropTypes.shape({
				page: PropTypes.shape({
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
					type: PropTypes.string.isRequired,
					meta_title: PropTypes.string,
					meta_description: PropTypes.string,
					nav_title: PropTypes.string,
					title: PropTypes.array,
					subtitle: PropTypes.array,
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
			body,
		} = this.props.data.prismic.page;

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
				/>

				{body && body.length > 0 && body.map(section => {
					if (section) {
						switch (section.type) {
							case PageBodyItemTypes.TEXT:
								const textBodyItem = section as PageBodyTextItem;
								return textBodyItem.fields?.map(field => field ? <RichText key={uniqid()} render={field.content || null} /> : null);

							case PageBodyItemTypes.PDF:
								const pdfBodyItem = section as PageBodyPDFItem;
								const url = pdfBodyItem.primary?.pdf_file?.url || pdfBodyItem.primary?.pdf_url?.url || null;
								const numPages = pdfBodyItem.primary?.number_of_pages || 1;
								if (url) return <PDF key={uniqid()} url={url} pages={numPages} />;

							case PageBodyItemTypes.IMAGE:
								const imageBodyItem = section as PageBodyImageItem;
								return imageBodyItem.fields?.map(field => {
									if (field) {
										const image = <Img fluid={field.imageSharp?.childImageSharp.fluid} />;
										return <Figure figure={image} caption={field.caption} />;
									}
								});

							default:
								return null;
						}
					}
				})}
			</Page>
		);
	}
}

export default PageTemplate;

export const query = graphql`
	query PageTemplateQuery($uid: String!, $lang: String!) {
		prismic {
			page(uid: $uid, lang: $lang) {
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
				nav_title
				type
				title
				subtitle
				body {
					... on PRISMIC_PageBodyText {
						type
						fields {
							content
						}
					}
					... on PRISMIC_PageBodyImage {
						type
					}
					... on PRISMIC_PageBodyPdf {
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
				}
			}
		}
	}
`;
