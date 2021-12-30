// image shortcode

const Image   = require("@11ty/eleventy-img")
const slugify = require("slugify")
const path    = require("path")

function getFileName(id, src, width, format, options) {
  let extension = path.extname(src)
  let name = options.title
  return `${name}-${width}w.${format}`;
}

async function imageShortcode(src,
                              title, 
                              orig_url = "",
                              orig_text = "",
                              sizes = "100vw") {
  let metadata

  title = title || 'fake'
  try {
    metadata = await Image(src, {
                        widths: [640, null],
                        formats: ["jpg"],
                        outputDir: "./dist/assets/img/",
                        urlPath: "/assets/img/",
                        filenameFormat: getFileName,
                        title: slugify(title, {lower: true, strict: true})
                    })
  } catch (e) {
    console.log('bad src:', e)
    return '<img class="tepiton" src="/assets/img/404.png">'
  }

  let lowsrc  = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  return `
<figure>
 <picture>
${Object.values(metadata).map(imageFormat => { return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
    }).join("\n")}
    <img class="tepiton" src="${lowsrc.url}" width="${highsrc.width}"
      height="${highsrc.height}" alt="${title}" loading="lazy" decoding="async">
  </picture>
  <figcaption><a href="${orig_url}">${orig_text}</a></figcaption>
</figure>
    `;
}

module.exports = imageShortcode