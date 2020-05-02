import React from "react";
import PropTypes, { InferProps } from "prop-types";
import styled from "@emotion/styled";
import { Document, Page } from "react-pdf/dist/entry.webpack";

const PDFDocument = styled(Document)`
	margin: 0 auto;
	max-width: 96rem;
	width: 100%;

	& .react-pdf__Page {
		position: relative;
		z-index: 1;
	}

	& .react-pdf__Page__textContent {
		top: 0 !important;
		left: 0 !important;
		transform: none !important;
	}
`;

interface PDFState {
	width: number;
	initial: boolean;
}

class PDF extends React.Component<InferProps<typeof PDF.propTypes>, PDFState> {
	static propTypes = {
		pages: PropTypes.number,
		url: PropTypes.string.isRequired,
	};

	constructor(props: InferProps<typeof PDF.propTypes>) {
		super(props);

		this.state = {
			width: 320,
			initial: false,
		};

		this.handleResize = this.handleResize.bind(this);
	}

	componentDidMount() {
		if (window && !this.state.initial) {
			const firstWindowWidth = Math.max(
				document.documentElement.clientWidth,
				window.innerWidth || 0
			);

			let initialWidth = 320;
			if (firstWindowWidth > 768) {
				initialWidth = Math.min(960, firstWindowWidth - 96);
			} else if (firstWindowWidth > 320) {
				initialWidth = Math.min(960, firstWindowWidth);
			}

			this.setState({
				width: initialWidth,
				initial: true,
			});
		}
	}

	handleResize() {
		const windowWidth = Math.max(
			document.documentElement.clientWidth,
			window.innerWidth || 0
		);

		const newPdfWidth =
			windowWidth > 768
				? Math.max(320, Math.min(960, windowWidth - 96))
				: Math.max(320, Math.min(960, windowWidth));

		if (newPdfWidth !== this.state.width) {
			this.setState({ width: newPdfWidth });
		}
	}

	componentDidUpdate() {
		if (window) {
			window.addEventListener("resize", this.handleResize);
		}
	}

	componentWillUnmount() {
		if (window) {
			window.removeEventListener("resize", this.handleResize);
		}
	}

	render() {
		const { url } = this.props;
		const numPages = this.props.pages || 1;
		const pages = [];

		for (let i = 0; i < numPages; i++) {
			pages.push(
				<Page key={`${url} page ${i+1}`} pageNumber={i+1} width={this.state.width} />
			);
		}

		return <PDFDocument file={url}>{pages}</PDFDocument>;
	}
}

export default PDF;
