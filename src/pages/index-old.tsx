import React from "react";

import { motion } from "framer-motion";

import Page, { PageHeading } from "../components/Page";

class IndexPage extends React.Component {
	render() {
		return (
			<motion.div
				key="index-page"
				variants={{
					hidden: {
						opacity: 0,
					},
					visible: {
						opacity: 1,
					},
				}}
				initial="hidden"
				animate="visible"
				exit="hidden"
			>
				<Page>
					<PageHeading
						title="Hi, I’m Griffen Schwiesow!"
						subtitle={(
							<>
								UX&nbsp;designer. Full‑stack&nbsp;developer. Language&nbsp;enthusiast.
							</>
						)}
					/>
				</Page>
			</motion.div>
		);
	}
}

export default IndexPage;
