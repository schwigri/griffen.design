import React from "react";
import { useReducedMotion } from "framer-motion";

function needsReducedMotion(Component: any) {
	return (props: any) => {
		const shouldReduceMotion = useReducedMotion();
		return <Component shouldReduceMotion={shouldReduceMotion} {...props} />
	}
}

export default needsReducedMotion;
