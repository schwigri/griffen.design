import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Helmet } from "react-helmet";
import { graphql, StaticQuery } from "gatsby";

import { getSlug, getLanguageCode, getPageType } from "../utils/functions";
import LangContext from "./LangContext";

class SEO extends React.Component<InferProps<typeof SEO.propTypes>> {
	static propTypes = {
		title: PropTypes.string.isRequired,
		titleSuffix: PropTypes.string,
		description: PropTypes.string.isRequired,
	};

	render() {
		const { title, titleSuffix, description } = this.props;

		return (
			<LangContext.Consumer>
				{langContext => (
					<Helmet>
						<html lang={langContext.lang} />}
						<title>{`${title}${titleSuffix ? ` ${titleSuffix}` : ""}`}</title>
						<meta name="description" content={description} />

						{/* {lang && type && uid && siteUrl && [
							<link key="alternate" rel="alternate" hrefLang={lang} href={`${siteUrl}${getSlug(lang, type, uid)}`} />,
							<link key="canonical" rel="canonical" href={`${siteUrl}${getSlug(lang, type, uid)}`} />,
						]}
						{type && siteUrl && alternateLanguages && alternateLanguages.map(altLang => (
							<link key={altLang.lang} rel="alternate" hrefLang={altLang.lang} href={`${siteUrl}${getSlug(getLanguageCode(altLang.lang), type, altLang.uid)}`} />
						))} */}
					</Helmet>
				)}
			</LangContext.Consumer>
		);
	}
}

export default SEO;
