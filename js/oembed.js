const { extract, findProvider }    = require('oembed-parser')
const imageShortcode = require('./image.js')

module.exports = async function oembed(url, params) {

  provider = findProvider(url)
  if (!provider) {
    console.error(`no handler for ${url}`)
    return url
  }

  if (params?.native){
    let oembed_data = await extract(url, params)
    return oembed_data.html
  }

  switch ( provider.providerName ) {
        case 'The New York Times':
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
