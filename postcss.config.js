// eslint-disable-next-line @typescript-eslint/no-var-requires
const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: [
    "./src/**/*.tsx",
    "./src/**/*.ts"
    // etc.
  ],
  whitelistPatterns: [/fa/, /fal/, /fas/],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || []
});

module.exports = {
  plugins: [
    require("tailwindcss"),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("postcss-preset-env")({
      stage: 1,
      features: {
        "focus-within-pseudo-class": false
      }
    }),
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
};
