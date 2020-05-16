import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
	colors: {
		background: "#fff",
		copy: "#555",
		heading: "#333",
		headerLinkAccent: "rgba(85, 85, 85, 0.15)",
		subtitle: "#666",
		theme: "#1467ff",
		accent: "#fff8db",
		linkAccent: "rgba(20, 103, 255, 0.15)",
		linkAccentOnDark: "rgba(255, 248, 219, 0.15)",
		langLinkAccent: "rgba(255, 255, 255, 0.5)",
		separator: "#ddd",
	},

	fonts: {
		copy: "'Work Sans', 'M PLUS 1p', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Arial, sans-serif",
		heading: `'Prompt', 'Work Sans', 'M PLUS 1p', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Arial, sans-serif`,
	},

	gradients: {
		header: "linear-gradient(180deg, #fff, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0))",
	},

	shadows: {
		card: "0 1px 2px rgba(46, 41, 51, 0.08), 0 2px 4px rgba(71, 63, 79, 0.08)",
	},

	breakpoints: {
		sm: "544px",
		md: "768px",
		lg: "1012px",
		xl: "1280px",
		v: "600px",
	},

	sizes: {
		copy: "65rem",
		content: "96rem",
	},

	timings: {
		default: "0.3s",
	},
};

const darkTheme: DefaultTheme = {
	...theme,

	colors: {
		...theme.colors,
		background: "#000",
		copy: "#ddd",
		heading: "#eee",
		headerLinkAccent: "rgba(221, 221, 221, 0.5)",
		subtitle: "#888",
		theme: "#fff8db",
		accent: "#1467ff",
		linkAccent: "rgba(255, 248, 219, 0.15)",
		langLinkAccent: "rgba(0, 0, 0, 0.5)",
		separator: "#ddd",
	},

	gradients: {
		...theme.gradients,
		header: "linear-gradient(180deg, #000, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0))",
	},

	shadows: {
		...theme.shadows,
		card: "0 4px 8px rgba(46, 41, 51, 0.08), 0 8px 16px rgba(71, 63, 79, 0.16)",
	},
};

export default theme;

export { darkTheme };

// import { Theme } from "./enums";

// export const theme: Theme = {
// 	// Color definitions
// 	colors: {
// 		background: {
// 			light: "#fff",
// 			dark: "#000",
// 		},
// 		copy: {
// 			light: "#555",
// 			dark: "#ddd",
// 		},
// 		heading: {
// 			light: "#333",
// 			dark: "#eee",
// 		},
// 		headerLinkAccent: {
// 			light: "rgba(85, 85, 85, 0.15)",
// 			dark: "rgba(221, 221, 221, 0.5)",
// 		},
// 		subtitle: {
// 			light: "#666",
// 			dark: "#888",
// 		},
// 		theme: {
// 			light: "#1467ff",
// 			dark: "#fff8db",
// 		},
// 		accent: {
// 			light: "#fff8db",
// 			dark: "#1467ff",
// 		},
// 		linkAccent: {
// 			light: "rgba(20, 103, 255, 0.15)",
// 			dark: "rgba(255, 248, 219, 0.15)",
// 		},
// 		langLinkAccent: {
// 			light: "rgba(255, 255, 255, 0.5)",
// 			dark: "rgba(0, 0, 0, 0.5)",
// 		},
// 		separator: {
// 			light: "#ddd",
// 			dark: "#ddd",
// 		},
// 	},

// 	// Font definitions
// 	fonts: {
// 		copy: "'Work Sans', 'M PLUS 1p', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Arial, sans-serif",
// 		heading: "'Prompt', 'Work Sans', 'M PLUS 1p', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Arial, sans-serif",
// 	},

// 	// Gradient definitions
// 	gradients: {
// 		header: {
// 			light: "linear-gradient(180deg, #fff, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0))",
// 			dark: "linear-gradient(180deg, #000, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0))",
// 		},
// 	},

// 	// Shadow definitions
// 	shadows: {
// 		card: "0 1px 2px rgba(46, 41, 51, 0.08), 0 2px 4px rgba(71, 63, 79, 0.08)",
// 	},

// 	// Breakpoint sizes
// 	breakpoints: {
// 		sm: "544px",
// 		md: "768px",
// 		lg: "1012px",
// 		xl: "1280px",
// 	},

// 	// Content sizes
// 	sizes: {
// 		copy: "65rem",
// 		content: "96rem",
// 	},

// 	// Timings definitions
// 	timings: {
// 		default: "0.3s",
// 	},
// };
