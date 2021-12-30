const stars = "✼ ✼ ✼"

module.exports = class Home {

  data() {
    return {
      layout: "base.njk",
      home: true
    }
  }

  async renderPost(post) {
    let excerpt = post.data.excerpt || 'oops'

    excerpt = await this.renderTemplate(excerpt, 'md,njk')

    if (post.data.newlines) {
      excerpt = excerpt.trim().replace(/\n/g, '<br>\n')
    }

    let noTitle = false
    let header  = post.data.title && `<header><a href="${post.url}">${this.markdown(post.data.title)}</a></header>`
    let section = `<section>${excerpt}</section>`
    let footer  = `<footer><a href="${post.data.draft}"># ${post.date.toDateString()}</a></footer>`

    if (post.data.title === stars) {
      header = `<a href="${post.url}"><div class="ex"></div></a>`
      footer = ``
      noTitle = true
    }

    let body = `
<article ${noTitle ? 'class="noTitle"' : ''}>
  ${header}
  ${section}
</article>
`
    return body
  }

  async render(data) {
        //  array.reverse() is destructive
        //  array.slice() is a javascript idiom
        //                     to copy an array
    let posts = data.collections.tepiton.slice().reverse()

    let head = `<h1 class="logo">${ data.pkg.name }</h1>`
    let prolog = `<div class="tepiton">`
    let epilog = '</div>'
    let body = ''
    for (const post of posts) {
        body += await this.renderPost(post)
    }

    return head + prolog + body + epilog
  }
}

