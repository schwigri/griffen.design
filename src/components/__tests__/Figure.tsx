import React from "react";
import { render } from "@testing-library/react";

import Figure from "../Figure";

const testImage = <img src="" alt="" />;
const testCaption = "test";

describe("<Figure />", () => {
	it("should render when passed a figure", () => {
		const { container } = render(<Figure figure={testImage} />);

		expect(container.firstChild).toBeTruthy();
	});

	it("should render withou a caption", () => {
		const { queryByTestId } = render(<Figure figure={testImage} />);

		expect(queryByTestId("caption")).toBeFalsy();
	});

	it("should render with a caption", () => {
		const { queryByTestId } = render(
			<Figure figure={testImage} caption={testCaption} />
		);

		expect(queryByTestId("caption")).toBeTruthy();
	});
});
