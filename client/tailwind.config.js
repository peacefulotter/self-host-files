const colors = require('tailwindcss/colors')
// blue-600 */
// --tw-2: #7dd3fc; /* sky-300 */
// --tw-3: #e0f2fe; /* sky-100 */
// --tw-4: #3F6212; /* lime-800 */
// --tw-5: #14532D; /* green-900 */


module.exports = {
    plugins: [
        require('flowbite/plugin')
    ],
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
	],
	theme: {
		colors: {
			'palette-a': colors.indigo,
			'palette-b': colors.purple,
			'palette-c': colors.lime,
			'palette-d': colors.green,
		},
	extend: {
		animation: {
			'fade-in': 'fadein 100ms ease-in forwards',
		},
		keyframes: {
			fadein: {
				'0%': { opacity: 0, transform: 'scale(50%)' }, 
				'100%': { opacity: 1, transform: 'scale(100%)' }
			}
		}
		},
    },
}
  