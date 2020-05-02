import React from "react";

import Page, { PageHeading } from "../components/Page";

class Error404Page extends React.Component {
	render() {
		return (
			<Page>
				<PageHeading
					title="And I oop— 😬"
					subtitle="This is not the page you're looking for."
				/>

				<p>
					If you think this is a mistake, please let me know by emailing me at <a href="mailto:schwigri@pm.me">schwigri@pm.me</a> or <a href="https://github.com/griffen.design/issues" target="_blank" rel="noopener noreferrer">creating an issue on GitHub</a>. Sorry about that!
				</p>
			</Page>
		);
	}
}

export default Error404Page;
