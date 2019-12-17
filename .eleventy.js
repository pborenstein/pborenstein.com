
module.exports = function (eleventyConfig) {
  
  eleventyConfig.addPassthroughCopy("src/css")

  // Filters
  eleventyConfig.addFilter("pdump", require("./js/pdump.js"))
  eleventyConfig.addFilter("prettyDate", require("./js/pretty-date.js"))

  // shortcodes
  eleventyConfig.addShortcode('hasMermaid', require("./js/has-mermaid.js"))

  //  collections
  eleventyConfig.addCollection("tagList", require("./js/get-tag-list.js"))
  eleventyConfig.addCollection('posts', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
  });


  //  Set our markdown processor just how we like it.
  //  note that we're not using the official 11ty syntax highlighter
  //  we're using markdown-it's plugin instead

  const mddiv = require("markdown-it-div")
  const mdcont = require("markdown-it-container")
  const mdtoc  = require('markdown-it-toc-done-right')

  
  const md = require("markdown-it")({
    html: true,
    breaks: false,
    linkify: false,
    typographer: true
  })

    md
    .use(mddiv)
    .use(require("markdown-it-multimd-table"))
    .use(require('markdown-it-footnote'))
    .use(require("markdown-it-prism"))
    .use(require("markdown-it-anchor"), {
      permalink: true,
      permalinkClass: "direct-link",
      permalinkSymbol: "•"
    })
    .use(mdtoc, {
      listType: "ul",
      level: [1,2]
    })
    .use(mdcont, 'container',  {
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
  
    md.renderer.rules.footnote_caption = (tokens, idx/*, options, env, slf*/) => {
      let n = Number(tokens[idx].meta.id + 1).toString();
    
      if (tokens[idx].meta.subId > 0) {
        n += ':' + tokens[idx].meta.subId;
      }
    
      return n;
    }

  md.renderer.rules.footnote_block_open = (tokens, idx) => (
     `<div class="footnotes-sep"></div>
      <section class="footnotes">
      <ol class="footnotes-list">`
  )
    
  
  eleventyConfig.setLibrary("md", md)


  // and a little help to render mermaid diagrams
  // http://cornishweb.com/index.php/2019/05/25/using-mermaid-js-with-eleventy-io/

  //  If we use the official syntax highlighting plugin,
  //  `@11ty/eleventy-plugin-syntaxhighlight`
  //  it calls `addMarkdownHighlighter()` to set the
  //  `eleventyConfig.markdownHighlighter` property.

  //  If we use the standard `markdown-it-prism` highlighter
  //  then `eleventyConfig.markdownHighlighter` doesn't get set
  //  because prism stashes its highlighting function
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
