import { FluidObject } from "gatsby-image";

export enum LanguageCodes {
	EN = "en-us",
	JA = "ja-jp",
	DE = "de-ch",
}

export interface Language {
	name: string;
	abbreviation: string;
}

export type Languages = {
	[key in LanguageCodes]: Language;
};

export const languages: Languages = {
	"en-us": {
		name: "English",
		abbreviation: "EN",
	},
	"ja-jp": {
		name: "日本語",
		abbreviation: "JA",
	},
	"de-ch": {
		name: "Deutsch",
		abbreviation: "DE",
	},
};

export type Prefixes = {
	[key in LanguageCodes]: string;
}

export const pathPrefixes: Prefixes = {
	"en-us": "",
	"ja-jp": "/ja",
	"de-ch": "/de",
};

export interface AlternateLanguage {
	lang: LanguageCodes;
	uid?: string;
}

export interface LanguageContext {
	lang: LanguageCodes,
	alternateLanguages?: AlternateLanguage[]
	type: PageTypes,
	uid?: string;
}

export enum PageTypes {
	HOME = "Home",
	PRIVACY = "Privacy",
	PAGE = "Page",
	PROJECT = "project",
}

export interface ColoredThemeItem {
	light: string;
	dark: string;
}

export type ColoredThemeType = {
	[key: string]: ColoredThemeItem;
}

export type GenericThemeType = {
	[key: string]: string;
}

export interface Theme {
	colors: ColoredThemeType,
	fonts: GenericThemeType,
	gradients: ColoredThemeType,
	shadows: GenericThemeType,
	breakpoints: GenericThemeType,
	sizes: GenericThemeType,
	timings: GenericThemeType,
}

export enum PageBodyItemTypes {
	TEXT = "text",
	PROJECT_COLLECTION = "project_collection",
	PDF = "pdf",
	IMAGE = "image",
}

export type PageBodyTextItem = {
	type: string;
	fields?: { content?: [] }[];
}

export type PageBodyPDFItem = {
	type: string;
	primary?: {
		pdf_file?: { url?: string; };
		pdf_url?: { url?: string; };
		number_of_pages?: number;
	};
};

export type PageBodyImageItem = {
	type: string;
	fields?: {
		caption?: string;
		imageSharp?: {
			childImageSharp: {
				fluid: FluidObject;
			};
		};
	}[];
};

export type PageBodyProjectCollectionItem = {
	type: string;
	fields?: {
		project?: {
			title?: [];
			tile_subtitle?: string;
			tile_description?: [];
		};
	}[];
};

export type PageBodyItem = PageBodyTextItem | PageBodyPDFItem | PageBodyImageItem | PageBodyProjectCollectionItem;

export enum ProjectBodyItemTypes {
	TEXT = "text",
	PDF = "pdf",
	IMAGE = "image",
}

export type ProjectBodyTextItem = {
	type: string;
	fields?: { content?: [] }[];
}

export type ProjectBodyPDFItem = {
	type: string;
	primary?: {
		pdf_file?: { url?: string; };
		pdf_url?: { url?: string; };
		number_of_pages?: number;
	};
};

export type ProjectBodyImageItem = {
	type: string;
	fields?: {
		caption?: string;
		imageSharp?: {
			childImageSharp: {
				fluid: FluidObject;
			};
		};
	}[];
};

export type ProjectBodyItem = ProjectBodyTextItem | ProjectBodyPDFItem | ProjectBodyImageItem;
