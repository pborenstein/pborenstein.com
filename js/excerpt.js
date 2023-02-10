//  if the excerpt property is a function, it
//  runs that instead of the default excerpt
//  mechanism: https://github.com/jonschlinkert/gray-matter/blob/master/lib/excerpt.js
//
//  however, eleventy _still_ handles the excerpt
//  https://github.com/11ty/eleventy/blob/7b568830320efafee03613c886e38c52da6b414d/src/TemplateContent.js#L106
//
//  so the important thing to avoid eleventy's processing
//  is to make sure that file.excerpt is not truthy
//  (eleventy removes the excerpt marker)
//  on the positive it means that we can use the
//  excerpt_alias mechanisms

module.exports = function examine(file, options) {
  const excerptLength = 256
  const separator = file.data.excerpt_separator || options.excerpt_separator

  if (separator == null && (options.excerpt === false ||  options.excerpt ==  null))
    return file

  const delimiter = typeof options.excerpt === 'string'
                  ? options.excerpt
                  : separator

      //  default excerpt is the first `excerptLength` chars
  file.excerpt = file.data.excerpt || file.content.substring(0, excerptLength)

  if (file.excerpt.length == excerptLength)
    file.excerpt += '...'

  let first = file.content.indexOf(delimiter)
  let last  = file.content.lastIndexOf(delimiter)

        //  no excerpt marker
  if (first == -1 && last == -1)
    return file

  if (first == last) {    // only one marker
    file.excerpt = file.content.substring(0, last).trim()
  } else {                // two markers
    first += delimiter.length
    file.excerpt = file.content.substring(first, last).trim()
  }

      //  remove the delimiter wherever it exists
      //  ... even if there are more than 2 :)
  let re = new RegExp(delimiter, 'g')
  file.content = file.content.replace(re, '')

  return file
}
