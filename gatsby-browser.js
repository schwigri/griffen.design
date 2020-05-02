// Require fonts
require("typeface-prompt");
require("typeface-work-sans");

// Set wrapPageElement
export const wrapPageElement = require("./src/utils/wrapPageElement").default;

const transitionDelay = 500;

export const shouldUpdateScroll = ({
	routerProps: { location },
	getSavedScrollPosition
}) => {
	if (location.action === "PUSH") {
		window.setTimeout(() => window.scrollTo(0, 0), transitionDelay);
	} else {
		const savedPosition = getSavedScrollPosition(location);
		window.setTimeout(
			() => window.scrollTo(...(savedPosition || [0, 0])),
			transitionDelay
		);
	}
	return false;
};


// Regsiter Prismic link resolver
const { registerLinkResolver } = require("gatsby-source-prismic-graphql");
const linkResolver = require("./src/utils/linkResolver").default;
registerLinkResolver(linkResolver);
