import React from "react";
import PropTypes, { InferProps } from "prop-types";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import uniqid from "uniqid";

import PageHeading, { PageHeadingWrapper } from "./PageHeading";

import needsReducedMotion from "../../utils/needsReducedMotion";

const PageWrapper = styled("div")`

`;

class Page extends React.Component<InferProps<typeof Page.propTypes>> {
	static propTypes = {
		id: PropTypes.string,
		shouldReduceMotion: PropTypes.bool.isRequired,
	};

	render() {
		const { id, shouldReduceMotion } = this.props;

		return (
			<PageWrapper>
				{this.props.children}
			</PageWrapper>
		);
	}
}

export default needsReducedMotion(Page);

export { PageHeading, PageHeadingWrapper };
