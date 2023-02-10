const git = require('async-git');

module.exports = async function() {

 let ret =  {
   commitsha:   await git.short,
   curbranch:   await git.branch,
   commitdate:  await git.date,
   origin :     await git.origin,
   repo:       (await git.origin).replace(/.git$/, '').split('/').at(-1)
 }

  return ret
}
