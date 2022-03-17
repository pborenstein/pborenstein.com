const { extract, findProvider }    = require('oembed-parser')
const imageShortcode = require('./image.js')
const Cache = require("@11ty/eleventy-cache-assets");



module.exports = async function oembed(url, params) {

  let provider = findProvider(url)
  if (! provider) {
    console.error(`no oembed handler for ${url}`)
    return microlink(url)
  }

  if (params?.native){
    let oembed_data = await extract(url, params)
    return oembed_data.html
  }

  switch ( provider.providerName ) {
        case 'The New York Times':
          return microlink(url)
          return nytHandler(url, params)
            break

        case 'Twitter':
          return twitterHandler(url, params)
            break

        case 'Flickr':
          return flickrHandler(url, params)
            break

        default:
          return defaultHandler(url, params)
            break
      }
}


async function flickrHandler (url, params) {
  let oembed_data = await extract(url, params)
  let txt = `<span>${oembed_data.title} &bull; ${oembed_data.author_name}</span>`
  let ret = imageShortcode(oembed_data.url, oembed_data.title, oembed_data.web_page, txt,  sizes = "100vw")

  return ret
}

async function twitterHandler (url, params) {
    params = {  theme: 'dark',
                maxwidth: 320,
                ...params
    }
    let oembed_data = await extract(url, params)
    return oembed_data.html
}

async function  nytHandler (url, params) {
    let oembed_data = await extract(url, params)
    let ret = `
      <blockquote>
        <h3>${oembed_data.title}</h3>
        <p>${oembed_data.summary}</p>
        <cite>
          <a href="${oembed_data.url}">
            ${oembed_data.provider_name}
          </a>
          <br>${oembed_data.publication_date}</cite>
        </blockquote>`
      return ret
}

async function defaultHandler (url, params) {
    let oembed_data = await extract(url, params)
    let embed_html = oembed_data.html
    // console.log('\n')
    // console.log(url, params)
    // console.log(JSON.stringify(oembed_data, null, 2))
    return embed_html
}

async function microlink(urlp) {
  const metadata = await Cache(`https://api.microlink.io/?url=${urlp}`, { duration: "1m",
    type: "json",
  })

  let { title, description,
    author, publisher,
    image, date,
    url, logo
  } = metadata.data

  if (!image) {
    image = { url: "https://picsum.photos/1024/1024?gravity=center&random" }
  }

  let ret = `
<div class="tepiton qembed rounded-border">
  <header><a href="${url}">${title}</a></header>
  <section class="with-sidebar" style="--space: 0">
    <div class="qimg"><img src="${image.url}"></div>
    <div style="display: flex; flex-direction: column; justify-content: space-between;">
      <p>${description}</p>
      <cite>${publisher} ${new Date(date).toDateString()}</cite>
    </div>
  </section>
</div>
`
  return ret
}