module.exports = {
	siteMetadata: {
		title: 'griffen.design',
		description: 'Fine, fresh, fierce. A modern portfolio.',
		siteUrl: 'https://www.griffen.design',
	},
	plugins: [
		'gatsby-plugin-sass',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sitemap',
		{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				host: 'https://www.griffen.design',
				sitemap: 'https://www.griffen.design/sitemap.xml',
				policy: [{ userAgent: '*', disallow: ['/'] }],
			},
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'griffen.design',
				short_name: 'griffen',
				description: 'Fine, fresh, fiernce. A modern portfolio.',
				start_url: '/',
				background_color: '',
				theme_color: '',
				display: 'standalone',
				icon: 'src/graphics/icon.png',
				localize: [
					{
						start_url: '/de/',
						lang: 'de',
						name: 'griffen.design',
						short_name: 'griffen',
						description:
							'Hübsch, frech, leidenschaftlich. Ein modernes Portfolio.',
					},
					{
						start_url: '/ja/',
						lang: 'ja',
						name: 'griffen.design',
						short_name: 'griffen',
						description: '見た目も良くて激しくてモダーンのポートフォリオ',
					},
				],
			},
		},
		'gatsby-plugin-offline',
	],
};
