---
title: xocoyotl notes
date: 2021-12-19T06:50:58.002Z
draftDate: 2021-12-14T02:12:11.497Z
draft: drafts://open?uuid=43CD24FF-FAC8-4A04-ABAA-F1A0EEF92D7C
github: https://github.com/tepiton/xocoyotl/blob/main/src/posts/43cd24ff-fac8-4a04-abaa-f1a0eef92d7c.md
newlines: false
summary: "fake summary"
---
## principles

  - don't operate on URLs without consent
  - make it as simple as just typing the URL
  -  😆

## oembed
  - good for tweets, anything quotable
  - use the html they give you
  - we assume good intentions from trusted providers
  - they don't always give you html (photo type, eg)
  - flickr oembed is 🤮

## image
  - cacheable
  - flexible / complicated
  - better for flickr

12/16/2021, 11:27:17 PM

## info for captions

- license
- title
- attribution (who)
- link to flickr page

current params:
- src,
- alt, 
- orig_text = "",
- orig_url = "",
- sizes = "100vw"

what we want instead:
- src
- title
- attribution
- license
- backlink

## resourcesr

**twitter example**
:   `src/posts/25ea1989-3c3b-48c8-a110-1e1c78b70e32.md`
25

**bagel**
:  `src/posts/2fe1ebf5-6438-487b-80af-3f30e53ebb76.md`
:  `https://flic.kr/p/2mKTj48`

**dandelion junk queens**
:  `src/posts/52615206-f117-49e4-a6c0-2fd7f186ab34.md`
:  `https://flic.kr/p/8uhwza`
:  `{% image "https://live.staticflickr.com/4082/4914583899_2392ff6707_k.jpg", "Dandelion Junk Queens", "flickr", "https://www.flickr.com/photos/twohorses/4914583899/" %}`


**caged dress**
:	`src/posts/a2ee0099-db83-42b8-8db1-fd0d68646ab8.md`
:	`{% image "https://live.staticflickr.com/5215/5393430759_f067415a9e_o.jpg", "Caged Dress", "flickr", "https://www.flickr.com/photos/twohorses/5393430759/" %}`

**random**
:	`src/posts/7e94e995-ffd3-426a-841c-168ba4b6227c.md`
:	`{% image "https://picsum.photos/600/600?gravity=center&random", 'picture' %}`
