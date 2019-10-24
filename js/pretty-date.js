const { DateTime } = require("luxon")

module.exports = function prettyDate(date, fmt) {
  const dateObject = (typeof date === 'string')
    ? DateTime.fromISO(date)
    : DateTime.fromJSDate(date)

  switch (fmt) {
    case 'ISO':
    case 'iso':
    case 'html':
      return dateObject.toISO()
      //  2017-12-31T19:00:00.000-05:00
      // for use in <time datime="..."> elements

    case 'isoDate':
      return dateObject.toISODate()
      // 2018-01-02

    case 'isoTime':
      return dateObject.toISOTime()
      // 12:34:56.123-05:00

    case 'http':
      let str = ''
      str = dateObject.toHTTP()
      // Tue, 02 Jan 2018 17:34:56 GMT
      return str

    case 'rfc2822':
      return dateObject.toRFC2822()
      // Tue, 02 Jan 2018 12:34:56 -0500

    case 'relative':
      return dateObject.toRelative()
      // 1 year ago

    case 'relativeCalendar':
      return dateObject.toRelativeCalendar()
      // last year

    case 'DmY':
      return dateObject.toFormat('d LLL yyyy')
      //  2 Jan 2018

    case 'DMY':
      return dateObject.toFormat('d LLLL yyyy')
      //  2 January 2018

    case 'DmYt':
      return dateObject.toFormat('d LLL yyyy')
        + (dateObject.toFormat(' t').toLowerCase())
    // 2 Jan 2018 12:34 pm

    case 'DMYt':
      return dateObject.toFormat('d LLLL yyyy')
        + (dateObject.toFormat(' t').toLowerCase())
      //  2 January 2018 12:34 pm

    case 'slug':
      let str2 = ""
      str2 = dateObject.toFormat('ccc d LLL yyyy')
      return str2
      // Tue 2 Jan 2018

    case 'locale':
      let str3 = ""
      str3 = dateObject.toLocaleString(DateTime.DATE_HUGE)
      return str3
      // Tuesday, January 2, 2018

    default:
      return dateObject.toFormat(fmt)
  }
}
