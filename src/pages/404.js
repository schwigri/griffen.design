import React from 'react';

import SEO from '../components/SEO';
import Page from '../components/Page';

function Error404Page() {
	return (
		<>
			<SEO
				title=">And I oop— 😬"
				titleSuffix=" — Griffen Schwiesow"
				description="Unfortunately, the page you’re looking for isn’t here."
			/>

			<Page>
				<h1 className="page-title">
					And I oop—{' '}
					<span className="emoji" role="img" aria-label="Grimacing emoji">
						😬
					</span>
				</h1>
				<p className="subtitle">
					I’m sorry, but the page you’re looking for isn’t here.
				</p>
				<p>
					If you think this is a mistake, please let me know by emailing me at{' '}
					<a href="mailto:schwigri@pm.me">schwigri@pm.me</a> or creating an
					issue on my GitHub repository. Sorry about that!
				</p>
			</Page>
		</>
	);
}

export default Error404Page;
