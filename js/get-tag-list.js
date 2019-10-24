module.exports = function(collection) {
  let uniqueTags = new Set()

  collection.getAllSorted().forEach(function(item) {
    if (! ('tags' in item.data)) return 

    let tags = (typeof item.data.tags === 'string')
           ? [item.data.tags]
           : item.data.tags

      for (const tag of tags)
        tag.startsWith('_') ||  uniqueTags.add(tag)
  });
  
  return [...uniqueTags];
};
