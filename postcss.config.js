// eslint-disable-next-line @typescript-eslint/no-var-requires
const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
    "./styles/**/*.css"
    // etc.
  ],
  whitelistPatterns: [/fa/, /fal/, /fas/],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("postcss-preset-env"),
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
};
