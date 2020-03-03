import './src/styles/design.scss';
import 'typeface-prompt';
import 'typeface-work-sans';
import 'focus-within-polyfill';

import CustomLayout from './wrapPageElement';

export const wrapPageElement = CustomLayout;

const transitionDelay = 500;

export const shouldUpdateScroll = ({
	routerProps: { location },
	getSavedScrollPosition,
}) => {
	if (location.action === 'PUSH') {
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
