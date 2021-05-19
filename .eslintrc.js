module.exports = {
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	extends: "eslint:recommended",
	parserOptions: {
		ecmaVersion: 11,
		sourceType: "module",
	},
	rules: {
		"array-bracket-spacing": [2, "never"],
		"no-console": 2,
		"no-debugger": 2,
		"no-dupe-keys": 2,
		"no-duplicate-case": 2,
		quotes: [1, "single"],
		"semi-spacing": [2, { before: false, after: true }],
		"keyword-spacing": 2,
	},
};
