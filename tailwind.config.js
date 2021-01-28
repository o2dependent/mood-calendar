module.exports = {
	purge: [
		'./pages/**/*.js',
		'./components/**/*.js',
		'./pages/**/*.tsx',
		'./components/**/*.tsx',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				red: {
					500: '#FD3A69',
					600: '#FC0843',
				},
				blue: {
					900: '#0B0047',
				},
			},
		},
		minWidth: {
			'3/4': '75%',
			'9/10': '90%',
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
