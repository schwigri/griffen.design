import React from "react";
import { motion } from "framer-motion";

import Page, { PageHeading } from "../components/Page";

class IndexPage extends React.Component {
	render() {
		return (
			<motion.div
				key="about-page"
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
					<PageHeading title="Nice to meet you! 👋" subtitle="He/him 👱🏻‍♂️🏳️‍🌈" />

					<p>
						Hi! I’m Griffen Schwiesow, a UX designer and front-end engineer studying Human-Centered Design & Engineering (HCDE) at the University of Washington, where I’m the president of the HCDE Student Association.
					</p>
				</Page>
			</motion.div>
		);
	}
}

export default IndexPage;
