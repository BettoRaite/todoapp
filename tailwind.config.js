/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			gridTemplateRows: {
				"max-1fr": "max-content 1fr",

				layout: "200px minmax(900px, 1fr) 100px",
			},
		},
		colors: {
			aero: "hsla(198, 78%, 64%, 1)",
			maize: "hsla(53, 98%, 65%, 1)",
			"yellow-green": "hsla(79, 54%, 51%, 1)",
			cinnabar: "hsla(13, 77%, 55%, 1)",
			pumpkin: "hsla(24, 96%, 55%, 1)",
			"light-gray": "#4A4A4A",
			"charcoal-gray": "hsla(0, 0%, 40%, 1)",
			"cool-gray": "hsla(210, 10%, 60%, 1)",
			"warm-gray": "hsla(30, 10%, 60%, 1)",
			silver: "hsla(0, 0%, 75%, 1)",
			cream: "hsla(60, 100%, 90%, 1)",
			white: "hsla(100, 100%, 100%, 1)",
			transparent: "transparent",
			current: "currentColor",
			black: "rgb(0,0,0)",
			coral: "hsla(16, 68%, 62%, 1)",
			"deep-sky-blue": "hsla(195, 100%, 50%, 1)",
			"forest-green": "hsla(120, 60%, 40%, 1)",
			"dark-red": "hsla(0, 80%, 45%, 1)",
			amber: "hsla(45, 100%, 50%, 1)",
			maroon: "hsla(340, 65%, 35%, 1)",
			"peach-puff": "hsla(28, 100%, 85%, 1)",
			"periwinkle-blue": "hsla(240, 50%, 75%, 1)",
			"powder-blue": "hsla(200, 50%, 80%, 1)",
			"moss-green": "hsla(85, 40%, 45%, 1)",
			"slate-gray": "hsla(210, 15%, 50%, 1)",
		},
	},
	plugins: [],
};
