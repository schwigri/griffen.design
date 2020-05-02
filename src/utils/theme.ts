import { Theme } from "./enums";

export const theme: Theme = {
	// Color definitions
	colors: {
		background: {
			light: "#fff",
			dark: "#000",
		},
		copy: {
			light: "#555",
			dark: "#ddd",
		},
		heading: {
			light: "#333",
			dark: "#eee",
		},
		headerLinkAccent: {
			light: "rgba(85, 85, 85, 0.15)",
			dark: "rgba(221, 221, 221, 0.5)",
		},
		subtitle: {
			light: "#666",
			dark: "#888",
		},
		theme: {
			light: "#1467ff",
			dark: "#fff8db",
		},
		accent: {
			light: "#fff8db",
			dark: "#1467ff",
		},
		linkAccent: {
			light: "rgba(20, 103, 255, 0.15)",
			dark: "rgba(255, 248, 219, 0.15)",
		},
		langLinkAccent: {
			light: "rgba(255, 255, 255, 0.5)",
			dark: "rgba(0, 0, 0, 0.5)",
		},
		separator: {
			light: "#ddd",
			dark: "#ddd",
		},
	},

	// Font definitions
	fonts: {
		copy: "'Work Sans', 'M PLUS 1p', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Arial, sans-serif",
		heading: "'Prompt', 'Work Sans', 'M PLUS 1p', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Arial, sans-serif",
	},

	// Gradient definitions
	gradients: {
		header: {
			light: "linear-gradient(180deg, #fff, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0))",
			dark: "linear-gradient(180deg, #000, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0))",
		},
	},

	// Shadow definitions
	shadows: {
		card: "0 1px 2px rgba(46, 41, 51, 0.08), 0 2px 4px rgba(71, 63, 79, 0.08)",
	},

	// Breakpoint sizes
	breakpoints: {
		sm: "544px",
		md: "768px",
		lg: "1012px",
		xl: "1280px",
	},

	// Content sizes
	sizes: {
		copy: "65rem",
		content: "96rem",
	},

	// Timings definitions
	timings: {
		default: "0.3s",
	},
};
