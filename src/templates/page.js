import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown/with-html";
import { Document, Page } from "react-pdf/dist/entry.webpack";

import SEO from "../components/SEO";
import MyPage from "../components/Page";

function PageTemplate({ data }) {
	const { titleSuffix } = data.site.globalSeo;
	const { metaTags, meta, content } = data.page;

	const [pdfWidth, setPdfWidth] = useState(320);
	const [setInitial, setSetInitial] = useState(false);

	useEffect(() => {
		if (window && !setInitial) {
			const firstWindowWidth = Math.max(
				document.documentElement.clientWidth,
				window.innerWidth || 0
			);

			let initialWidth = 320;
			if (firstWindowWidth > 768) {
				initialWidth = Math.min(960, firstWindowWidth - 96);
			} else if (firstWindowWidth > 320) {
				initialWidth = Math.min(960, firstWindowWidth);
			}
			setPdfWidth(initialWidth);
			setSetInitial(true);
		}
	}, [setInitial, pdfWidth]);

	useEffect(() => {
		const handleResize = () => {
			const windowWidth = Math.max(
				document.documentElement.clientWidth,
				window.innerWidth || 0
			);

			const newPdfWidth =
				windowWidth > 768
					? Math.max(320, Math.min(960, windowWidth - 96))
					: Math.max(320, Math.min(960, windowWidth));

			if (newPdfWidth !== pdfWidth) setPdfWidth(newPdfWidth);
		};

		if (window) {
			window.addEventListener("resize", handleResize);
		}

		return () => {
			if (window) window.removeEventListener("resize", handleResize);
		};
	}, [pdfWidth]);

	const pageContent = content.map(item => {
		let sectionContent = null;
		if ("DatoCmsSection" === item.__typename) {
			sectionContent = (
				<ReactMarkdown
					source={item.content ? item.content : ""}
					escapeHtml={false}
				/>
			);
		} else if ("DatoCmsPdf" === item.__typename) {
			sectionContent = (
				<div lang="en">
					<Document file={item.url} className="pdf">
						<Page pageNumber={1} width={pdfWidth} />
						<Page pageNumber={2} width={pdfWidth} />
					</Document>
				</div>
			);
		}

		return (
			<section
				key={Buffer.from(item.id).toString("base64")}
				className="section"
			>
				{sectionContent}
			</section>
		);
	});

	return (
		<>
			<SEO
				title={metaTags.title}
				titleSuffix={titleSuffix}
				description={metaTags.description}
				updated={meta.updatedAt}
			/>

			<MyPage>{pageContent}</MyPage>
		</>
	);
}

PageTemplate.propTypes = {
	data: PropTypes.shape({
		site: PropTypes.shape({
			globalSeo: PropTypes.shape({
				titleSuffix: PropTypes.string.isRequired
			}).isRequired
		}).isRequired,
		page: PropTypes.shape({
			metaTags: PropTypes.shape({
				title: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired
			}).isRequired,
			meta: PropTypes.shape({
				updatedAt: PropTypes.string.isRequired
			}).isRequired,
			title: PropTypes.string.isRequired,
			content: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string.isRequired,
					classes: PropTypes.string,
					content: PropTypes.string
				}).isRequired
			).isRequired
		}).isRequired
	}).isRequired
};

export default PageTemplate;

export const query = graphql`
	query PageTemplateQuery($id: String!, $locale: String!) {
		site: datoCmsSite(locale: { eq: $locale }) {
			globalSeo {
				titleSuffix
			}
		}
		page: datoCmsPage(id: { eq: $id }) {
			metaTags {
				title
				description
			}
			meta {
				updatedAt
			}
			title
			content {
				... on DatoCmsSection {
					id
					classes
					content
				}
				... on DatoCmsCollection {
					id
				}
				... on DatoCmsPdf {
					id
					url
				}
			}
		}
	}
`;
