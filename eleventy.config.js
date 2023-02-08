
const { EleventyRenderPlugin }  = require('@11ty/eleventy')
const   markdownIt              = require('markdown-it')
const   excertptFn              = require('./js/excerpt.js')
const   imageShortcodeFn        = require('./js/image.js')
const   oembedShortcodeFn       = require('./js/oembed.js')

module.exports = function (eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    notify: true
  })

  eleventyConfig.addPlugin(EleventyRenderPlugin)

  eleventyConfig.addPassthroughCopy("src/assets")

  eleventyConfig.setFrontMatterParsingOptions({
      excerpt:  excertptFn,
      excerpt_separator: "<!-- excerpt -->",
      excerpt_alias: "excerpt"
  })

  // The ever-popular markdown filter.
  eleventyConfig.addFilter("markdown",  (content) => md.renderInline(content))
  eleventyConfig.addFilter("markdown2", (content) => md.render(content))
  eleventyConfig.addFilter("debugger", (...args) => {
    console.log('>>>>')
    console.log(...args)
    console.log('<<<<')
    debugger;
  })

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcodeFn);
  eleventyConfig.addNunjucksAsyncShortcode("oembed", oembedShortcodeFn);

  eleventyConfig.addCollection("byDraftDate", collectionAPI => {
    let list = collectionAPI.getFilteredByTag('tepiton')
                            .sort((a, b) => a.data.draftDate - b.data.draftDate)
    return list
  })

  const md =  markdownIt({  html: true,
                            breaks: false,
                            linkify: false,
                            typographer: true }).disable('code');


  eleventyConfig.setLibrary("md", md)

  return {
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: [
      "md",
      "njk",
      "html",
      "11ty.js"
    ],

    passthroughFileCopy: true,

    dir: {
      output:   "dist",
      input:    "src",
      includes: "includes", //  These are inside the `input` directory
      data:     "data"
    }
  }
}
