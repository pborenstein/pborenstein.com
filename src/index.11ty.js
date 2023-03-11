const stars = ". . ."

module.exports = class Home {

  data() {
    return {
      layout: "base.njk",
      home: true,
      excerpt: "all the little things",
      eleventyNavigation: {
        key: "home",
        order: 1
      }
    }
  }

  async renderPost(post) {
    let excerpt = post.data.excerpt || 'oops'
    let noTitle = false
    let header

    excerpt = await this.renderTemplate(excerpt, 'md,njk')

    if (post.data.newlines) {
      excerpt = excerpt.trim().replace(/\n/g, '<br>\n')
    }

    if (!post.data.title || post.data.title === stars) {
      header = ''
      noTitle = true
    } else {
      header = `
      <header>
        <a href="${post.url}">${this.markdown(post.data.title)}</a>
      </header>`
    }

    let section = `
    <section>
      ${excerpt}
    </section>`
    let footer  = `
    <footer>
    <span>&nbsp;</span>
    <a href="${post.url}">${post.date.toDateString().replace(' 0', ' ')}</a>
    </footer>`

    let body = `<article class="rounded-border ${noTitle ? ' noTitle' : ''}">`

    if (noTitle)
      body += `<a href="${post.url}">`
    else
      body += header

    body += section
    body += footer

    if (noTitle)
      body += '</a>'
    body += '\n</article>\n'

    return body
  }

  async render(data) {
        //  array.reverse() is destructive
        //  array.slice() is a javascript idiom
        //                     to copy an array
    let posts = data.collections.tepiton.slice().reverse()

    let head = ``
    let notice = '<div id="notice">Technical content is now at <a href="https://pborenstein.dev">pborenstein.dev</a></div>'
    let prolog = `<div class="tepiton stack">\n`
    let epilog = '</div>'
    let body = ''
    for (const post of posts) {
        body += await this.renderPost(post)
    }

    return head + notice + prolog + body + epilog
  }
}

