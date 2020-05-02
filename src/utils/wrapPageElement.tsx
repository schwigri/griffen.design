import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Helmet } from "react-helmet";
import uniqid from "uniqid";

import LangContext from "../components/LangContext";
import Layout from "../components/Layout";

import { AlternateLanguage, PageTypes, LanguageContext } from "./enums";
import { getLanguageCode, getPageType } from "./functions";

function wrapPageElement({ element, props }: InferProps<typeof wrapPageElement.propTypes>): React.ReactNode {
	const id = props.pageContext?._meta?.id || uniqid();
	const lang = props.pageContext?._meta?.lang || "en-us";
	const langContext: LanguageContext = {
		lang: getLanguageCode(lang),
		type: getPageType(props.pageContext?.type || props.pageContext?._meta?.type || PageTypes.PAGE),
		uid: props.pageContext?._meta?.uid || "home",
		alternateLanguages: props.pageContext?._meta?.alternateLanguages as AlternateLanguage[] || undefined,
	};

	return (
		<LangContext.Provider value={langContext}>
			<Layout id={id}>
				<Helmet>
					<html lang={lang} />
				</Helmet>
				{element}
			</Layout>
		</LangContext.Provider>
	);
}

wrapPageElement.propTypes = {
	element: PropTypes.node.isRequired,
	props: PropTypes.shape({
		pageContext: PropTypes.shape({
			_meta: PropTypes.shape({
				id: PropTypes.string.isRequired,
				uid: PropTypes.string.isRequired,
				lang: PropTypes.string.isRequired,
				type: PropTypes.string.isRequired,
				alternateLanguages: PropTypes.arrayOf(
					PropTypes.shape({
						uid: PropTypes.string.isRequired,
						lang: PropTypes.string.isRequired,
					}).isRequired,
				),
			}),
			type: PropTypes.string,
		}),
	}).isRequired,
};

export default wrapPageElement;
