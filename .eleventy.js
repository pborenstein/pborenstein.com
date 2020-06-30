
module.exports = function (eleventyConfig) {



  const syntaxHighlight = require("@pborenstein/eleventy-md-syntax-highlight")


  eleventyConfig.addPlugin(syntaxHighlight,
    {showLineNumbers: true})



  // eleventyConfig.addPlugin(
  //   typesetPlugin({ only: 'p',
  //                   disable: []
  //                 }))


  eleventyConfig.addPassthroughCopy("src/assets")

  // Filters
  eleventyConfig.addFilter("pdump", require("./js/pdump.js"))
  eleventyConfig.addFilter("prettyDate", require("./js/pretty-date.js"))

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) =>
        n < 0 ? array.slice(n) : array.slice(0,n))

  // The ever-popular markdown filter.
  eleventyConfig.addFilter("markdown", (content) => md.renderInline(content))



        // shortcodes
  eleventyConfig.addShortcode('hasMermaid', require("./js/has-mermaid.js"))

  //  collections
  eleventyConfig.addCollection("tagList", require("./js/get-tag-list.js"))


  eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob('./src/posts/*.md')
                     .reverse();
  });


  //  Set our markdown processor just how we like it.

  const md = require("markdown-it")({
                      html: true,
                      breaks: false,
                      linkify: false,
                      typographer: true
                    })

  eleventyConfig.setLibrary("md", md)

  md.use(require("markdown-it-div"))
    .use(require("markdown-it-multimd-table"))
    .use(require('markdown-it-deflist'))
    .use(require('markdown-it-footnote'))
    .use(require("markdown-it-anchor"), {
          permalink: true,
          permalinkClass: "direct-link",
          permalinkSymbol: "•"
        })
    .use(require('markdown-it-toc-done-right'), {
          listType: "ul",
          level: [1,2]
        })
    .use(require("markdown-it-container"), 'container',  {
          marker: '!',
          validate: function (params) {
            return true
          },
          render: function (tokens, idx) {
            var m = tokens[idx].info.trim() // .match(/^well\s+(.*)$/);
            if (tokens[idx].nesting === 1) {
              // opening tag
              let summary =  m === ''
                             ? ''
                             : '<summary>' + md.renderInline(m) + '</summary>\n'

              return '<details>' + summary + '<aside>';
            } else {
              // closing tag
              return '</aside>\n</details>\n';
            }
          }
        })


  //  Footnote customizations

    //  Replace the footnote caption from
    //  [n] to just n
    //  https://github.com/markdown-it/markdown-it-footnote/blob/cab6665ba39c6eb517cbbae3baeb549004bf740c/index.js#L19-L27

  md.renderer.rules.footnote_caption = (tokens, idx/*, options, env, slf*/) => {
    let n = Number(tokens[idx].meta.id + 1).toString();

    if (tokens[idx].meta.subId > 0) {
      n += ':' + tokens[idx].meta.subId;
    }

    return n;
  }

    //  Replace the block-open because we really
    //  don't like <hr>s
    //  https://github.com/markdown-it/markdown-it-footnote/blob/cab6665ba39c6eb517cbbae3baeb549004bf740c/index.js#L41-L45

  md.renderer.rules.footnote_block_open = (tokens, idx) => (
     `<div class="footnotes-sep"></div>
      <section class="footnotes">
      <ol class="footnotes-list">`
  )


  // and a little help to render mermaid diagrams
  // http://cornishweb.com/index.php/2019/05/25/using-mermaid-js-with-eleventy-io/

  //  If we use the official syntax highlighting plugin,
  //  `@11ty/eleventy-plugin-syntaxhighlight`
  //  it calls `addMarkdownHighlighter()` to set the
  //  `eleventyConfig.markdownHighlighter` property.

  //  If we use the standard `markdown-it-prism` highlighter
  //  then `eleventyConfig.markdownHighlighter` doesn't get set
  //  because `markdown-it-prism` stashes its highlighting function
  //  in `md.options.highlight`

  //  In order to patch in mermaid highlighting
  //  we call `addMarkdownHighlighter()` here, but
  //  we want to _add_ the mermaid function to whatever
  //  was handling the highlighting before,
  //  so we stash whatever highlighter we have.

  //  If we want to add yet another highlighter,
  //  we'll have to rethink this into a stack

  const mdHilighter = eleventyConfig.markdownHighlighter
                   || md.options.highlight

  eleventyConfig.addMarkdownHighlighter((str, language) => {
    if (language === "mermaid") { // are we a mermaid?
      return `<pre class="mermaid">${str}</pre>`;
    }
    // no? use the original function, if there was one
    return mdHilighter && mdHilighter(str, language)
  });

  return {
    dir: {
      output: "dist",
      input:  "src",
        includes: "_includes", //  These are inside the `input` directory
        data:     "_data"
    },
    templateFormats: [
      "md",
      "njk",
      "html"
    ],
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true
  }
}
