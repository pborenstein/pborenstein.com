module.exports = class Jog {

  data() {
    const theData = {
      layout: "screenshot.njk",
      pagination: {
        data: "collections.posts",
        size: 1,
        alias: "post",
      },
      permalink: function (data) {
        const url = data.post.url
        console.log(data.post.url);
        return `/og${url}`
      }
    }

    return theData
  }

  async render(data) {
    const { post } = data;
    const { title, excerpt, image } = post.data;
    let x

    x = await this.renderTemplate(excerpt, 'md,njk')

    let heading = ''
    if (title !== '. . .') {
      heading = `<h1>${title}</h1>`       
    }

    return `${heading} ${x}`;
  }
}



