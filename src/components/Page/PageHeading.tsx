import React from "react";
import PropTypes, { InferProps } from "prop-types";
import styled from "@emotion/styled";
import { Elements, RichText } from "prismic-reactjs";

import LangContext from "../LangContext";

import { theme } from "../../utils/theme";

const ChallengeOutcome = styled("div")`
	font-size: 0.9em;

	& h2,
	& p {
		width: 100%;
	}

	& p {
		margin-bottom: 0;
	}
`;

const ChallengeOutcomeWrapper = styled("div")`
	display: grid;
	gap: 1.6rem;
	grid-template-columns: 1fr;
	margin: 0 auto 3.2rem;
	max-width: 65rem;
	padding: 0 0 3.2rem;
	position: relative;
	width: calc(100% - 3.2rem);

	&::after {
		background-color: ${theme.colors.separator.light};
		bottom: 0;
		content: "";
		height: 1px;
		left: 10%;
		position: absolute;
		width: 80%;

		@media only screen and (prefers-color-scheme: dark) {
			background-color: ${theme.colors.separator.dark};
		}
	}

	@media (min-width: ${theme.breakpoints.md}) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

const PageHeadingWrapper = styled("header")`
	padding: 4em 0 0;

	& h1 {
		max-width: 100%;
		text-align: center;
	}

	// Subtitle
	& h1 + p {
		color: ${theme.colors.subtitle.light};
		font-family: ${theme.fonts.heading};
		font-size: 1.2em;
		text-align: center;

		@media only screen and (prefers-color-scheme: dark) {
			color: ${theme.colors.subtitle.dark};
		}
	}
`;

class PageHeading extends React.Component<InferProps<typeof PageHeading.propTypes>> {
	static propTypes = {
		title: PropTypes.array,
		subtitle: PropTypes.array,
		challenge: PropTypes.array,
		outcome: PropTypes.array,
	};

	render() {
		const { title, subtitle, challenge, outcome } = this.props;

		return (
			<LangContext.Consumer>
				{langContext => (
					<>
						<PageHeadingWrapper>
							{title ? <RichText render={title} /> : <h1>Untitled</h1>}
							{subtitle && <RichText render={subtitle} />}
						</PageHeadingWrapper>
						{challenge && outcome && (
							<ChallengeOutcomeWrapper>
								<ChallengeOutcome>
									{/* <h2>{getTranslation("Challenge", langContext.lang)}</h2> */}
									<RichText render={challenge} />
								</ChallengeOutcome>


								<ChallengeOutcome>
									{/* <h2>{getTranslation("Outcome", langContext.lang)}</h2> */}
									<RichText render={outcome} />
								</ChallengeOutcome>
							</ChallengeOutcomeWrapper>
						)}
					</>
				)}
			</LangContext.Consumer>
		);
	}
}

export default PageHeading;