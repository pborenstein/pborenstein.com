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


<style>
td {
  hyphens: manual !important;
  font-family: var(--font-code);
  font-size: var(--font-code-size);
  word-break: keep-all;
}
</style>



##   Grays

<table>
<tr><td style="color: #111; white-space: nowrap">color-gray-07</td><td>#111111<br>   07%  body text                             --color-black              </td><td style="color: var(--color-gray-07)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-gray-20</td><td>#333333<br>   20%  headings, nav text                    --color-darkgray           </td><td style="color: var(--color-gray-20)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-gray-30</td><td>#4d4d4d<br>   30%  prism background                      --base05                   </td><td style="color: var(--color-gray-30)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-gray-75</td><td>#c0c0c0<br>   75%  footer                                --color-gray               </td><td style="color: var(--color-gray-75)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-gray-88</td><td>#e0e0e0<br>   88%  table head/body sep, border of fold   --base01                   </td><td style="color: var(--color-gray-88)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-gray-95</td><td>#f2f2f2<br>   95%  even row, bg of fold exp fold         --base0x --color-lightgray </td><td style="color: var(--color-gray-95)">aptent conubia enim eleifend  habitasse id montes</td></tr>
</table>

##   Reds

<table>
<tr><td style="color: #111; white-space: nowrap">color-red</td><td>#c22323<br></td><td style="color: var(--color-red)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-red-faded</td><td>#fde2e2<br>       folded text bg, table-caption highlight </td><td style="color: var(--color-red-faded)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-darkred</td><td>#7F0036<br></td><td style="color: var(--color-darkred)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-darkred-faded</td><td>#7f00364d<br></td><td style="color: var(--color-darkred-faded)">aptent conubia enim eleifend  habitasse id montes</td></tr>
</table>

##    Foreground/Background   

<table>
<tr><td style="color: #111; white-space: nowrap">color-white</td><td>#fff<br></td><td style="color: var(--color-white)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-foreground</td><td>--color-gray-07<br></td><td style="color: var(--color-foreground)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-background</td><td>--color-white<br></td><td style="color: var(--color-background)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-bg-contrast</td><td>--color-gray-95<br>      table even row </td><td style="color: --color-bg-contrast)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-body</td><td>--color-foreground<br></td><td style="color: var(--color-body)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-nav-text</td><td>--color-gray-20<br></td><td style="color: var(--color-nav-text)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-nav-hover</td><td>--color-darkred<br></td><td style="color: var(--color-nav-hover)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-heading</td><td>--color-gray-20<br></td><td style="color: var(--color-heading)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-link</td><td>--color-darkred<br></td><td style="color: var(--color-link)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-footer</td><td>--color-gray-75<br></td><td style="color: var(--color-footer)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-code</td><td>--color-darkred<br>    naked code </td><td style="color: var(--color-code)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-code-bg</td><td>--color-gray-88<br></td><td style="color: var(--color-code-bg)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-fold-marker</td><td>--color-darkred<br></td><td style="color: var(--color-fold-marker)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-fold-expanded</td><td>--color-gray-95<br></td><td style="color: var(--color-fold-expanded)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-fold-head</td><td>--color-red-faded<br></td><td style="color: var(--color-fold-head)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-fold-border</td><td>--color-gray-88<br></td><td style="color: var(--color-fold-border)">aptent conubia enim eleifend  habitasse id montes</td></tr>
</table>

## Table colors
<table>
<tr><td style="color: #111; white-space: nowrap">color-table-odd</td><td>--color-background<br></td><td style="color: var(--color-table-odd)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-table-even</td><td>--color-bg-contrast<br></td><td style="color: var(--color-table-even)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-table-body</td><td>--color-body<br></td><td style="color: var(--color-table-body)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-table-heading</td><td>--color-heading<br></td><td style="color: var(--color-table-heading)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-table-caption</td><td>--color-darkred<br></td><td style="color: var(--color-table-caption)">aptent conubia enim eleifend  habitasse id montes</td></tr>
<tr><td style="color: #111; white-space: nowrap">color-table-sep</td><td>--color-gray-88<br></td><td style="color: var(--color-table-sep)">aptent conubia enim eleifend  habitasse id montes</td></tr>
</table>
