import React from "react";

import {
	LanguageCodes,
	PageTypes,
	pathPrefixes,
} from "./enums";

export const getLanguageCode = (lang?: string): LanguageCodes => {
	switch (lang) {
		case LanguageCodes.JA:
			return LanguageCodes.JA;

		case LanguageCodes.DE:
			return LanguageCodes.DE;

		default:
			return LanguageCodes.EN;
	}
};

export const getPageType = (type?: string): PageTypes => {
	switch (type) {
		case PageTypes.HOME:
			return PageTypes.HOME;

		case PageTypes.PRIVACY:
			return PageTypes.PRIVACY;

		case PageTypes.PROJECT:
			return PageTypes.PROJECT;

		default:
			return PageTypes.PAGE;
	}
};

export const getSlug = (lang?: string, type?: string, uid?: string): string => {
	const langCode = getLanguageCode(lang);
	const typeCode = getPageType(type);
	return typeCode === PageTypes.HOME ? `${pathPrefixes[langCode]}/` : `${pathPrefixes[langCode]}/${uid || ""}`;
};

export const getReadMoreText = (title: string, lang?: string) => {
	const langCode = getLanguageCode(lang);

	switch (langCode) {
		case LanguageCodes.JA:
			return <><span className="sr-only">{title} について</span>もっと読む</>;

		case LanguageCodes.DE:
			return <>Lesen Sie mehr <span className="sr-only">über {title}</span></>;

		default:
			return <>Read more <span className="sr-only">about {title}</span></>;
	}
};

export const getChallengeText = (lang?: string): string => {
	const langCode = getLanguageCode(lang);

	switch (langCode) {
		case LanguageCodes.JA:
			return "目的";

		case LanguageCodes.DE:
			return "Zweck";

		default:
			return "Challenge";
	}
};

export const getOutcomeText = (lang?: string): string => {
	const langCode = getLanguageCode(lang);

	switch (langCode) {
		case LanguageCodes.JA:
			return "結果";

		case LanguageCodes.DE:
			return "Leistung";

		default:
			return "Outcome";
	}
};

export const getPreviousText = (lang?: string): string => {
	const langCode = getLanguageCode(lang);

	switch (langCode) {
		case LanguageCodes.JA:
			return "前";

		case LanguageCodes.DE:
			return "Zurück";

		default:
			return "Previous";
	}
};

export const getNextText = (lang?: string): string => {
	const langCode = getLanguageCode(lang);

	switch (langCode) {
		case LanguageCodes.JA:
			return "次";

		case LanguageCodes.DE:
			return "Weiter";

		default:
			return "Next";
	}
};
