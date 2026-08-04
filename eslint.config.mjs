import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * ESLint owns linting; Biome owns formatting and import sorting. Nothing here
 * touches whitespace, quotes or semicolons — that is `biome check --write`'s
 * job, and a rule in this file that disagrees with the formatter would produce
 * a fight neither tool can win.
 *
 * `eslint-config-next` bundles and registers the react, react-hooks, jsx-a11y,
 * import and @typescript-eslint plugins, so the rules below are referenced by
 * name only. Don't add a `plugins` block for any of them — flat config rejects
 * a plugin key being defined twice.
 *
 * @type {import("eslint").Linter.Config[]}
 */
const config = [
	{
		// Mirrors the exclusions the Biome linter used to carry.
		ignores: [
			".next/**",
			".now/**",
			"build/**",
			"coverage/**",
			"dist/**",
			"esm/**",
			"public/**",
			"scripts/**",
			"tests/**",
			"next-env.d.ts",
			"**/*.config.js",
		],
	},

	// Next.js's own baseline: Core Web Vitals plus the react/hooks/a11y/import
	// rules Next considers table stakes.
	...nextCoreWebVitals,

	// typescript-eslint recommended, scoped to TS files by the config itself.
	...nextTypescript,

	{
		files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
		rules: {
			// ---------------------------------------------------------------
			// Accessibility. Ported 1:1 from the Biome `a11y` group, which was
			// deliberately broader than the subset next/core-web-vitals turns
			// on — WCAG 2.2 conformance is a tracked item in docs/STATUS.md, so
			// this coverage is not incidental.
			// ---------------------------------------------------------------
			"jsx-a11y/alt-text": "error",
			"jsx-a11y/anchor-has-content": "error",
			"jsx-a11y/anchor-is-valid": "error",
			"jsx-a11y/aria-activedescendant-has-tabindex": "error",
			"jsx-a11y/aria-props": "error",
			"jsx-a11y/aria-proptypes": "error",
			"jsx-a11y/aria-role": "error",
			"jsx-a11y/aria-unsupported-elements": "error",
			"jsx-a11y/autocomplete-valid": "error",
			"jsx-a11y/heading-has-content": "error",
			"jsx-a11y/html-has-lang": "error",
			"jsx-a11y/iframe-has-title": "error",
			"jsx-a11y/img-redundant-alt": "error",
			"jsx-a11y/label-has-associated-control": "error",
			"jsx-a11y/media-has-caption": "error",
			"jsx-a11y/mouse-events-have-key-events": "error",
			"jsx-a11y/no-access-key": "error",
			"jsx-a11y/no-autofocus": "error",
			"jsx-a11y/no-distracting-elements": "error",
			"jsx-a11y/no-interactive-element-to-noninteractive-role": "error",
			"jsx-a11y/no-noninteractive-element-to-interactive-role": "error",
			"jsx-a11y/no-noninteractive-tabindex": "error",
			"jsx-a11y/no-redundant-roles": "error",
			"jsx-a11y/role-has-required-aria-props": "error",
			"jsx-a11y/role-supports-aria-props": "error",
			"jsx-a11y/scope": "error",
			"jsx-a11y/tabindex-no-positive": "error",

			// Warnings rather than errors, matching the previous config: both
			// have real false positives on composed components.
			"jsx-a11y/interactive-supports-focus": "warn",
			"jsx-a11y/click-events-have-key-events": "warn",

			// Off previously, kept off. The site has decorative wrappers that
			// legitimately carry handlers with an accessible control inside.
			"jsx-a11y/no-noninteractive-element-interactions": "off",
			"jsx-a11y/no-static-element-interactions": "off",

			// ---------------------------------------------------------------
			// Correctness
			// ---------------------------------------------------------------
			"react/jsx-key": "error",
			"react/no-children-prop": "error",
			"react-hooks/rules-of-hooks": "error",

			// Was `useExhaustiveDependencies: "off"` under Biome. Left off so
			// this migration doesn't quietly change what the codebase enforces
			// — turn it on as its own piece of work, it will have findings.
			"react-hooks/exhaustive-deps": "off",

			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					args: "after-used",
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],

			// ---------------------------------------------------------------
			// Security
			// ---------------------------------------------------------------
			"react/no-danger-with-children": "error",

			// ---------------------------------------------------------------
			// Suspicious
			// ---------------------------------------------------------------
			"react/jsx-no-comment-textnodes": "error",
			"react/jsx-no-duplicate-props": "error",
			"no-console": "warn",
		},
	},
];

export default config;
