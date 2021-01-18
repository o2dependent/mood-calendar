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
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
