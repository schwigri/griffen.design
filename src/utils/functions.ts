import {
	LanguageCodes,
	PageTypes,
	pathPrefixes,
} from "./enums";

export const getSlug = (lang: LanguageCodes, type: PageTypes, uid?: string): string => {
	return type === PageTypes.HOME ? `${pathPrefixes[lang]}/` : `${pathPrefixes[lang]}/${uid || ""}`;
};

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
