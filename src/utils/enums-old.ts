export const theme = {
	colors: {
		background: "#fff",
		copy: "#555",
		heading: "#333",
		headerLinkAccent: "rgba(85, 85, 85, 0.15)",
		subtitle: "#666",
		theme: "#1467ff",
		accent: "#fff8db",
		linkAccent: "rgba(20, 103, 255, 0.15)",
		langLinkBackground: "#fff",
		langLinkAccent: "rgba(255, 255, 255, 0.5)",
	},
	fonts: {
		copy: "'Work Sans', 'M PLUS 1p', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Arial, sans-serif",
		heading: "'Prompt', 'Work Sans', 'M PLUS 1p', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Arial, sans-serif",
	},
	gradients: {
		header: "linear-gradient(180deg, #fff, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0))",
	},
	shadows: {
		card: "0 1px 2px rgba(46, 41, 51, 0.08), 0 2px 4px rgba(71, 63, 79, 0.08)",
	},
	sizes: {
		sm: "544px",
		md: "768px",
		lg: "1012px",
		xl: "1280px",
	},
	timings: {
		default: "0.3s",
	}
};

interface Language {
	name: string;
	code: string;
	full: string;
}

export type LanguageCode = "en-us" | "ja-jp" | "de-ch" | string;

export const supportedLanguages: Language[] = [
	{
		name: "English",
		code: "EN",
		full: "en-us",
	},
	{
		name: "日本語",
		code: "JA",
		full: "ja-jp",
	},
	{
		name: "Deutsch",
		code: "DE",
		full: "de-ch",
	},
];

export const pageTypes = {
	home: "Home",
	privacy: "Privacy",
	page: "Page",
	project: "Project",
};

export const getPrefix = (lang: string): string => {
	switch (lang) {
		case "en-us":
			return "";
			break;

		case "ja-jp":
			return "/ja";
			break;

		case "de-ch":
			return "/de";
			break;

		default:
			return `/${lang.split("-")[0]}`;
	}
};

export const getSlug = (lang: string, type: string, uid?: string): string => {
	return type === pageTypes.home ? `${getPrefix(lang)}/` : `${getPrefix(lang)}/${uid || ""}`;
};

enum SupportedLanguages {
	EN = "en-us",
	JA = "ja-jp",
	DE = "de-ch",
}

type Translation = {
	[key in SupportedLanguages]: string;
}

interface Translations {
	[key: string]: Translation;
}

export const translations: Translations = {
	challenge: {
		"en-us": "Challenge",
		"ja-jp": "",
		"de-ch": "",
	},
	outcome: {
		"en-us": "Outcome",
		"ja-jp": "結果",
		"de-ch": "",
	},
};

export const getTranslation = (word: string, lang: LanguageCode): string => {
	word = word.toLocaleLowerCase();
	switch (lang) {
		case SupportedLanguages.EN:
			return translations[word][SupportedLanguages.EN] || "";
			break;

		case SupportedLanguages.JA:
			return translations[word][SupportedLanguages.JA] || "";
			break;

		case SupportedLanguages.DE:
			return translations[word][SupportedLanguages.DE] || "";
			break;

		default:
			return "";
	}
};
