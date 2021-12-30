# tepiton

[tepiton](https://nahuatl.uoregon.edu/content/tepiton):
a small thing

A template for a
Drafts-based
micro-blog
kind of thing --
that doesn't require so much input.

## the thing we want

We want to push a button
and have a Draft go to a
website with

- no interaction
- in the appropriate format
  for the kind of thing it is


## the kinds of things

- small pieces of text that
  require no heading
- a picture with maybe text
- a long piece

## the two views

- card view
- post view

## the question

where do we turn the Draft
into an eleventy post ?

we can do it in the Drafts action.
it spits out a markdown file
with the appropriate front matter
and checks it into github

BUT it looks like I found
a way to process the
prerendered text so
I can process special
characters there

## what special characters ?

the problem I was trying to address
was to find a way to mark excerpts
in the text. eleventy uses gray-matter
to parse the front matter. gray-matter
also has an excerpt mechanism. unfortunately
it takes all the text from the beginning
of the content to the marker as the excerpt.
also, it _leaves the marker in place!_
such that eleventy has special code
to remove the marker.

I wanted a way to mark the text
to use as an excerpt with a
beginning marker and an end marker.

so something like this:

    Curabitur pretium ligula fames sollicitudin
    class ante interdum ullamcorper finibus,
    dignissim malesuada cursus curae turpis
    ---
    this is the excerpt text
    mi inceptos vehicula aenean per sociosqu nibh
    ---
    et, nunc etiam viverra hendrerit molestie
    nostra ornare potenti.

but markdown interprets a line with `---`
as a Setext header. which is kind of a bummer.
but does that matter if we do the excerpt
handling in gray-matter.

## what it looks like

in eleventy we can pass options
to gray-matter through eleventy's
`setFrontMatterParsingOptions`.

    eleventyConfig.setFrontMatterParsingOptions({
        excerpt:  examine,
        excerpt_separator: "<!-- excerpt -->",
        excerpt_alias: "popcorn"
    })

turns out that we can provide a function
for the `excerpt` property. this function
takes over the finding of the excerpt
and for setting the data properties. so let's
use this function to figure out what's
going on.

    function examine(file, options) {
      file.excerpt = "persephone"
      console.log('** file:', file)
      console.log('** options', options)
      return file
    }

something interesting: this function gets
called for _every_ file including the page
templates. we get something like this

    ** file: {
      content: '\nI have not yet become what I am to be!\n',
      data: {
        title: '✼ ✼ ✼',
        date: 2021-10-12T02:12:13.201Z,
        draftDate: 2021-10-11T01:20:00.141Z,
        draft: 'drafts://open?uuid=586511D4-3BDB-439B-B664-01BCA57D8D9C',
        github: 'https://github.com/tepiton/tepiton/blob/main/src/posts/586511d4-3bdb-439b-b664-01bca57d8d9c.md',
        trim: true,
        newlines: false,
        summary: 'I have not yet become what I am to be!'
      },
      isEmpty: false,
      excerpt: 'persephone'
    }
    ** options {
      excerpt: [Function: examine],
      excerpt_separator: '<!-- excerpt -->',
      delimiters: [ '---', '---' ],
      language: 'yaml',
      engines: {
        yaml: {
          parse: [Function: bound safeLoad],
          stringify: [Function: bound safeDump]
        },
        json: {
          parse: [Function: bound parse],
          stringify: [Function: stringify]
        },
        javascript: { parse: [Function: parse], stringify: [Function: stringify] }
      }
    }

the entire prerendered content is available
in the `content` property, and the front matter
is available in the `data` property. any changes
to the `content` property propagate. we can
pretty much ignore the `options`, except to honor
the `excerpt_separator`.

## how it is done

- everything between the two excerpt markers
  should go into `file.excerpt`
- the excerpt markers should be removed from
  `file.content`.

eleventy doesn't use regular expressions
to find and remove the excerpt string.

## our story so far

We have a custom except function, `examine` in
`.eleventy.js`. If the `excerpt` option is `false`,
no excerpt. Otherwise the excerpt consists of:

- the text between `<!-- excerpt -->` markers if
  there are two markers
- the text between the start of text to the marker
- Up to 256 characters

The `<!-- excerpt -->` marker is removed.

Over in `src/index.11ty.js` we do
the rendering of each 'card'.
