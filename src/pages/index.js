import React from 'react';
import Helmet from 'react-helmet';

import Portal from '../graphics/portal.png';
import Wave from '../graphics/wave.png';
import Kidney from '../graphics/kidney.png';

function EnglishHome() {
	return (
		<div
			style={{
				height: '100%',
				overflow: 'hidden',
				position: 'relative',
				width: '100%',
			}}
		>
			<Helmet>
				<html lang="en" />
				<title>griffen.design</title>
				<meta name="description" content="" />
				<meta name="robots" content="noindex nofollow" />
			</Helmet>
			<p
				style={{
					position: 'absolute',
					left: '50%',
					textAlign: 'center',
					top: '50%',
					transform: 'translate3d(-50%, -50%, 0)',
					fontSize: '2em',
					zIndex: 2,
				}}
			>
				Design&nbsp;is inherently&nbsp;
				<strong style={{ fontWeight: 500 }}>human</strong>.
				<br />
				<small style={{ fontSize: '.6em', opacity: 0.6, whiteSpace: 'nowrap' }}>
					Something exciting is coming soon!
				</small>
			</p>
			<div aria-hidden="true">
				<img
					src={Portal}
					alt=""
					style={{
						left: '0',
						position: 'absolute',
						top: '0',
						transform: 'translate3d(-15%, -15%, 0)',
						width: '244px',
						zIndex: 1,
					}}
				/>
				<img
					src={Wave}
					alt=""
					style={{
						bottom: '0',
						left: '0',
						position: 'absolute',
						transform: 'translate3d(-20%, 10%, 0) rotate(182deg)',
						width: '644px',
						zIndex: 1,
					}}
				/>

				<img
					src={Kidney}
					alt=""
					style={{
						bottom: '35%',
						right: '0',
						position: 'absolute',
						transform: 'translate3d(25%, 0, 0)',
						width: '190px',
						zIndex: 1,
					}}
				/>
			</div>
		</div>
	);
}

export default EnglishHome;
