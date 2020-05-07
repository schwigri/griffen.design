import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		colors: {
			background: string;
			copy: string;
			heading: string;
			headerLinkAccent: string;
			subtitle: string;
			theme: string;
			accent: string;
			linkAccent: string;
			langLinkAccent: string;
			separator: string;
		};

		fonts: {
			copy: string;
			heading: string;
		};

		gradients: {
			header: string;
		};

		shadows: {
			card: string;
		};

		breakpoints: {
			sm: string;
			md: string;
			lg: string;
			xl: string;
			v: string;
		};

		sizes: {
			copy: string;
			content: string;
		};

		timings: {
			default: string;
		}
	}
}
