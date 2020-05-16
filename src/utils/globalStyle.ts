import { createGlobalStyle } from "styled-components";

const globalStyle = createGlobalStyle`
	html {
		font-size: 62.5%;
	}

	body {
		background-color: ${props => props.theme.colors.accent};
		color: ${props => props.theme.colors.copy};
		font-family: ${props => props.theme.fonts.copy};
		font-size: 1.6rem;
		margin: 0;
	}

	p {
		line-height: 1.666;
		margin: 0 auto 1em;
		max-width: 65rem;
		width: calc(100% - 3.2rem);
	}

	img {
		max-width: 100%;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: ${props => props.theme.colors.heading};
		font-family: ${props => props.theme.fonts.heading};
		font-weight: 600;
		line-height: 1;
		margin: 1em auto 0.5em;
		max-width: 65rem;
		width: calc(100% - 3.2rem);
	}

	ol,
	ul {
		box-sizing: border-box;
		line-height: 1.666;
		margin: 0 auto 1em;
		max-width: 65rem;
		width: calc(100% - 3.2rem);
	}

	a {
		border-bottom: 2px solid ${props => props.theme.colors.linkAccent};
		border-radius: 0;
		color: ${props => props.theme.colors.theme};
		font-weight: 500;
		text-decoration: none;
		transition:
			background-color ${props => props.theme.timings.default},
			border-bottom-color ${props => props.theme.timings.default},
			border-radius ${props => props.theme.timings.default},
			box-shadow ${props => props.theme.timings.default};

		&:active {
			border-bottom-style: dashed;
		}

		&:focus,
		&:hover {
			background-color: ${props => props.theme.colors.linkAccent};
			border-bottom-color: ${props => props.theme.colors.theme};
		}

		&:focus {
			border-radius: 2px;
			box-shadow:
				0 0 0 0.25em ${props => props.theme.colors.background},
				0 0 0 0.5em ${props => props.theme.colors.theme};
			outline: none;
			}
		}
	}

	.sr-only {
		border: 0;
		clip-path: inset(50%);
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		width: 1px;
		word-wrap: normal;
	}
`;

export default globalStyle;
