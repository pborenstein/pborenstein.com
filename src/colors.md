---
title: Colors
layout: layouts/page.njk
tags:
  _nav
---
<!-- markdownlint-disable  -->
{% include "partials/post-dateline.njk" %}
{% include "partials/common-title.njk" %}




Semantic colors have semantic names. Semantic names use
color mnemonics, not raw color values.

The idea is that `var(--color-red)` can change to different
shades of red without having to go through all the red styles.



## Named Colors

<p style="color: var(--color-black)"><code>color-black: #111</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="color: var(--color-darkgray)"><code>color-darkgray: #333</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="color: var(--color-gray)"><code>color-gray: #c0c0c0</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="color: var(--color-lightgray)"><code>color-lightgray: #f2f2f2</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="color: var(--color-red)"><code>color-red: #c22323</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="color: var(--color-red-faded)"><code>color-red-faded: #fde2e2</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="color: var(--color-darkred)"><code>color-darkred: #7F0036</code> aptent conubia enim eleifend  habitasse id montes</p> /* 127, 0, 54 */
<p style="color: var(--color-darkred-faded)"><code>color-darkred-faded: #7f00364d</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="color: var(--color-white)"><code>color-white: #fff</code> aptent conubia enim eleifend  habitasse id montes</p>


## Style Colors

<p style="color: var(--color-foreground)"><code>color-foreground: var(--color-black)</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="background: var(--color-background)"><code>color-background: var(--color-white)</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="background: var(--color-bg-contrast)"><code>color-bg-contrast: var(--color-lightgray)</code> aptent conubia enim eleifend  habitasse id montes</p>

<p style="color: var(--color-body)"><code>color-body: var(--color-foreground)</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="color: var(--color-body-highlight)"><code>color-body-highlight: var(--color-darkred)</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="color: var(--color-nav-text)"><code>color-nav-text: var(--color-darkgray)</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="color: var(--color-heading)"><code>color-heading: var(--color-darkgray)</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="color: var(--color-link)"><code>color-link: var(--color-darkred)</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="color: var(--color-footer)"><code>color-footer: var(--color-gray)</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="color: var(--color-code)"><code>color-code: var(--color-darkred)</code> aptent conubia enim eleifend  habitasse id montes</p>



## Table Colors

<p style="background: var(--color-table-odd)"><code>color-table-odd: var(--color-background)</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="background: var(--color-table-even)"><code>color-table-even: var(--color-bg-contrast)</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="color: var(--color-table-body)"><code>color-table-body: var(--color-body)</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="color: var(--color-table-heading)"><code>color-table-heading: var(--color-heading)</code> aptent conubia enim eleifend  habitasse id montes</p>
<p style="color: var(--color-table-caption)"><code>color-table-caption: var(--color-heading)</code> aptent conubia enim eleifend  habitasse id montes</p>
