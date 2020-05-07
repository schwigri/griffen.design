import React from "react";
import PropTypes, { InferProps } from "prop-types";
import styled from "styled-components";

const FigureWrapper = styled("figure")`
	margin: 4em auto;
`;

class Figure extends React.Component<InferProps<typeof Figure.propTypes>> {
	static propTypes = {
		figure: PropTypes.node.isRequired,
		caption: PropTypes.string,
	};

	render() {
		const { figure, caption } = this.props;

		return (
			<FigureWrapper>
				{figure}
				{caption && (
					<figcaption>{caption}</figcaption>
				)}
			</FigureWrapper>
		);
	}
}

export default Figure;
