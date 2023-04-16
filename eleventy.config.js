
const { EleventyRenderPlugin }  = require('@11ty/eleventy')
const   markdownIt              = require('markdown-it')
const   mdContainer             = require('markdown-it-container')
const   excertptFn              = require('./js/excerpt.js')
const   imageShortcodeFn        = require('./js/image.js')
const   oembedShortcodeFn       = require('./js/oembed.js')
const   pdumpFilterFn           = require('./js/pdump.js')
const   syntaxHighlight         = require('@pborenstein/eleventy-md-syntax-highlight')
const   eleventyNavPlugin       = require("@11ty/eleventy-navigation")

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(EleventyRenderPlugin)
    eleventyConfig.addPlugin(syntaxHighlight, { showLineNumbers: false })
    eleventyConfig.addPlugin(eleventyNavPlugin);

    eleventyConfig.addPassthroughCopy("src/assets")

    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: excertptFn,
        excerpt_separator: "<!-- excerpt -->",
        excerpt_alias: "excerpt"
    })

    // The ever-popular markdown filter.
    eleventyConfig.addFilter("markdown",  (content) => md.renderInline(content))
    eleventyConfig.addFilter("markdown2", (content) => md.render(content))
    eleventyConfig.addFilter("pdump",     pdumpFilterFn)
    eleventyConfig.addFilter("debugger",  (...args) => {
        console.log('>>>>')
        console.log(...args)
        console.log('<<<<')
        debugger;
    })

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcodeFn)
    eleventyConfig.addNunjucksAsyncShortcode("oembed", oembedShortcodeFn)


    eleventyConfig.addCollection("posts", (collection) => {
        return collection.getFilteredByGlob("src/posts/*.md")
    })

    const md = markdownIt({
        html:           true,
        breaks:         false,
        linkify:        true,
        typographer:    true
    }).disable('code')

    md.use(require('markdown-it-footnote'))
    md.use(mdContainer, 'note', {
        marker: '!',
        validate: function (params) {
            return true
        },
        render: function (tokens, idx) {
            var m = tokens[idx].info.trim()
            if (tokens[idx].nesting === 1) {
                // opening tag
                let summary = m === ''
                    ? ''
                    : '<summary>' + md.renderInline(m) + '</summary>\n'
                return '<details>' + summary + '<aside>';
            } else {
                // closing tag
                return '</aside>\n</details>\n';
            }
        }
    })


    md.renderer.rules.footnote_caption = (tokens, idx) => {
        let n = Number(tokens[idx].meta.id + 1).toString()

        if (tokens[idx].meta.subId > 0) {
            n += ':' + tokens[idx].meta.subId
        }
        return n;
    }

    md.renderer.rules.footnote_block_open = (tokens, idx) => (
        `<div class="footnotes-sep"></div>
      <section class="footnotes">
      <ol class="footnotes-list">`
    )


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
            output: "dist",
            input: "src",
            includes: "includes", //  These are inside the `input` directory
            data: "data"
        }
    }
}
