import React from 'react';
import Helmet from 'react-helmet';

import * as Graphics from '../graphics/graphics';
import { Link } from 'gatsby';
import { AnimatePresence, motion } from 'framer-motion';

function IndexPage() {

	return (
		<>
			<section className="section intro">
						<h1>Hi, I&rsquo;m Griffen Schwiesow!</h1>
						<p className="subtitle">UX Designer. Full-stack developer. Language enthusiast.</p>
					</section>

					<section className="section projects">

						<div className="left">
							<article className="project large">
								<div className="project-background">
									<img src="https://www.griffen.me/static/7ca289b274a6b9dafcf88d791e85a3ec/11760/seattle-teas-tile.png" alt="" />
								</div>
								<div className="project-foreground">
									<h1 className="project-title">Seattle Teas</h1>
									<p className="subtitle">Bringing a business to life.</p>
									<p>From branding to e‐commerce, I’ve helped Seattle Teas from the ground up. Their site is scheduled to go live soon!</p>
									<p><Link to="/">Read more</Link></p>
								</div>
							</article>

							<article className="project medium">
								<div className="project-background">
									<img src="https://www.griffen.me/static/525b00390cf11a5f61a4a3de405db2a0/11760/seattle-traffic-tile.png" alt="" />
								</div>
								<div className="project-foreground">
									<h1 className="project-title">Seattle Traffic</h1>
									<p className="subtitle">Launched early November 2019.</p>
									<p>Redesigned and developed, from conception to production, SeattleTraffic.org.</p>
									<p><Link to="/">Read more</Link></p>
								</div>
							</article>
						</div>

						<div className="right">
							<article className="project medium">
								<div className="project-background">
									<img src="https://www.griffen.me/static/aa8421140476476c5e2c73b6090c7c26/11760/enrich-tile.png" alt="" />
								</div>
								<div className="project-foreground">
									<h1 className="project-title">Enrich</h1>
									<p className="subtitle">A 10-week HCD sprint.</p>
									<p>From initial ideation to final hi‐fi mockups, in 10 weeks we designed an app to help therapists using an HCD process.</p>
									<p><Link to="/">Read more</Link></p>
								</div>
							</article>

							<article className="project">
								<div className="project-background">
									<img src="https://www.griffen.me/static/e0721d5c5d219b2ce3324b7bd8466db7/db6e7/velocity-tile.png" alt="" />
								</div>
								<div className="project-foreground">
									<h1 className="project-title">Velocity Dance Center</h1>
									<p className="subtitle">A three‐week branding design sprint.</p>
									<p>I spent three weeks rebranding Velocity Dance Studio, a local business, and also created some interaction design mockups.</p>
									<p><Link to="/">Read more</Link></p>
								</div>
							</article>
						</div>

					</section>
					<section className="section projects-container">
						<header className="section-header">
							<h2 className="section-title">Other projects</h2>
							<p className="subtitle">Some other things I&rsquo;ve been involved in <span className="emoji" role="img" aria-label="Nervous emoji">😅</span></p>
						</header>

						<div className="projects opposite">
							<div className="left">
								<article className="project medium">
									<div className="project-background">
										<img src="https://www.griffen.me/static/05b11779fa8a43eb9380de4846e2b471/89b76/sdot-tile.png" alt="" />
									</div>
									<div className="project-foreground">
										<h1 className="project-title"><abbr title="Seattle Department of Transportation">SDOT</abbr></h1>
										<p className="subtitle">June 2017–January 2020</p>
										<p>I’ve been interning at SDOT since June 2017! My role has expanded from web development to creative design.</p>
										<p><Link to="/">Read more</Link></p>
									</div>
								</article>

								<article className="project small">
									<div className="project-background">
										<img src="https://www.griffen.me/static/d01365db9623d00595d635933b176262/11760/hcdesa-tile.png" alt="" />
									</div>
									<div className="project-foreground">
										<h2 className="project-title">HCDEsa</h2>
										<p className="subtitle">I’m the 2019–2020 president <span className="emoji" role="img" aria-label="Sunglasses-wearing emoji">😎</span></p>
										<p>Elected president in Spring 2019, my goals are to empower HCDE undergraduates both socially and professionally.</p>
										<p><Link to="/">Read more</Link></p>
									</div>
								</article>
							</div>

							<div className="right">
								<article className="project large">
									<div className="project-background">
										<img src="https://www.griffen.me/static/0cf16748bc48e1bfb50900209b637a1c/11760/garden-room-tile.png" alt="" />
									</div>
									<div className="project-foreground">
										<h2 className="project-title">The Garden Room</h2>
										<p className="subtitle">February 2015–December 2017</p>
										<p>Local luxury needed an online presence, and I helped out with their website redesign and all things technical.</p>
										<p><Link to="/">Read more <span className="sr-only">about the Garden Room</span></Link></p>
									</div>
								</article>

								<article className="project medium">
									<div className="project-background">
										<img src="https://www.griffen.me/static/6cb50e9ab924c4d33cc3df023d63acb6/89b76/incite-water-tile.png" alt="" />
									</div>
									<div className="project-foreground">
										<h2 className="project-title">Incite Water</h2>
										<p className="subtitle">October 2017–March 2018</p>
										<p>I was the Technical Director for a small startup out of the Foster School of Business and I presented at the AAEIC.</p>
										<p><Link to="/">Read more</Link></p>
									</div>
								</article>
							</div>
						</div>
					</section>
				</>
	);
}

export default IndexPage;
