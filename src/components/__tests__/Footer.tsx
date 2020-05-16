import React from "react";
import { ThemeProvider } from "styled-components";
import { render } from "@testing-library/react";

import { PureFooter as Footer } from "../Footer";

import { LanguageCodes, PageTypes } from "../../utils/enums";
import theme from "../../utils/theme";

const testContext = {
	type: PageTypes.PAGE,
	lang: LanguageCodes.EN,
};

const testQueryData = {
	prismic: {
		allLayouts: {
			edges: [
				{
					node: {
						_meta: {
							lang: "en-us",
						},
						copyright_notice: "© 2020",
						github_link_text: "Made with love, peace, and React",
						github_link_emojis: "💖✌️",
					},
				},
			],
		},
	},
};

describe("<Footer />", () => {
	it("should render", () => {
		const { container } = render(
			<ThemeProvider theme={theme}>
				<Footer lang={testContext} data={testQueryData} />
			</ThemeProvider>
		);

		expect(container.children.length).toBeGreaterThanOrEqual(1);
	});
});
