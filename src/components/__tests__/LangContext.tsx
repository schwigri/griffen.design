import React from "react";
import { render } from "@testing-library/react";

import LangContext from "../LangContext";

import { LanguageCodes, PageTypes } from "../../utils/enums";

const testContext = {
	type: PageTypes.PAGE,
	lang: LanguageCodes.EN,
};

describe("<LangContext />", () => {
	it("should provide and consume a language context", () => {
		const { getByTestId } = render(
			<LangContext.Provider value={testContext}>
				<LangContext.Consumer>
					{value => (
						<>
							<span data-testid="context-type">{value.type}</span>
							<span data-testid="context-lang">{value.lang}</span>
						</>
					)}
				</LangContext.Consumer>
			</LangContext.Provider>
		);

		expect(getByTestId("context-type")).toHaveTextContent(testContext.type);
		expect(getByTestId("context-lang")).toHaveTextContent(testContext.lang);
	});
});
