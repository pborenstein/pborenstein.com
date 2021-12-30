/****
 * darkmode.js
 *
 *  dark mode handler from:
 *    https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/
 *    https://codepen.io/adhuham/pen/BaNroxd
 *    https://codepen.io/pborenstein/details/WNraaGx
 *    https://andy-bell.design/wrote/create-a-user-controlled-dark-or-light-mode/
 ****/

const STORAGE_KEY = 'user-color-scheme-pref'
const DARK        = '  '
const LIGHT       = 'initial'

const light   = document.querySelector('.btn-light')
const dark    = document.querySelector('.btn-dark')
const system  = document.querySelector('.btn-system')


function applySetting (passedSetting) {
  let setting = passedSetting
             || localStorage.getItem(STORAGE_KEY)

  if (setting) {
    localStorage.setItem(STORAGE_KEY, setting)
    document.documentElement /* root */
            .style
            .setProperty('--is-dark', setting == 'dark' ? DARK
                                                        : LIGHT)
  }
}

if (light && dark && system) {
   light.addEventListener('click', () => applySetting('light'))
    dark.addEventListener('click', () => applySetting('dark'))
  system.addEventListener('click', () => {
                                           localStorage.removeItem(STORAGE_KEY)
                                           window.location.reload()
                                         })
}

applySetting(null)
