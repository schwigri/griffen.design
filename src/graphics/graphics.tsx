import React from "react";

interface StarsProps {
	className?: string
}

export const Stars = ({ className = "stars" }: StarsProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 600 600"
		className={className}
	>
		<title>Griffen Schwiesow stars logo</title>
		<g fill="#1467ff" fillRule="evenodd" stroke="#000" strokeWidth="12">
			<path d="M569.533 253.827L503.945 175l65.588-78.827-101.06 17.387L433 17.345l-35.472 96.215-101.061-17.387L362.055 175l-65.588 78.827 101.06-17.387L433 332.655l35.472-96.215 101.061 17.387z" />
			<path d="M303.533 317.827L237.945 239l65.588-78.827-101.06 17.387L167 81.345l-35.472 96.215-101.061-17.387L96.055 239l-65.588 78.827 101.06-17.387L167 396.655l35.472-96.215 101.061 17.387z" />
			<path d="M485.533 503.827L419.945 425l65.588-78.827-101.06 17.387L349 267.345l-35.472 96.215-101.061-17.387L278.055 425l-65.588 78.827 101.06-17.387L349 582.655l35.472-96.215 101.061 17.387z" />
		</g>
	</svg>
);
