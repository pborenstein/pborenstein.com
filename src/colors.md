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
code {
  color: #111 !important;
}
</style>

## GRAYS  
<p style="color: var(--color-gray-07)">aptent conubia enim eleifend  habitasse id montes <code>color-gray-07: #111111</code>  /* 07%  body text                             --color-black              */</p>
<p style="color: var(--color-gray-20)">aptent conubia enim eleifend  habitasse id montes <code>color-gray-20: #333333</code>  /* 20%  headings, nav text                    --color-darkgray           */</p>
<p style="color: var(--color-gray-30)">aptent conubia enim eleifend  habitasse id montes <code>color-gray-30: #4d4d4d</code>  /* 30%  prism background                      --base05                   */</p>
<p style="color: var(--color-gray-75)">aptent conubia enim eleifend  habitasse id montes <code>color-gray-75: #c0c0c0</code>  /* 75%  footer                                --color-gray               */</p>
<p style="color: var(--color-gray-88)">aptent conubia enim eleifend  habitasse id montes <code>color-gray-88: #e0e0e0</code>  /* 88%  table head/body sep, border of fold   --base01                   */</p>
<p style="color: var(--color-gray-95)">aptent conubia enim eleifend  habitasse id montes <code>color-gray-95: #f2f2f2</code>  /* 95%  even row, bg of fold exp fold         --base0x --color-lightgray */</p>


## REDS   
<p style="color: var(--color-red)">aptent conubia enim eleifend  habitasse id montes <code>color-red: #c22323</code></p>
<p style="color: var(--color-red-faded)">aptent conubia enim eleifend  habitasse id montes <code>color-red-faded: #fde2e2</code>      /* folded text bg, table-caption highlight */</p>
<p style="color: var(--color-darkred)">aptent conubia enim eleifend  habitasse id montes <code>color-darkred: #7F0036</code></p>
<p style="color: var(--color-darkred-faded)">aptent conubia enim eleifend  habitasse id montes <code>color-darkred-faded: #7f00364d</code></p>

## FOREGROUND/BACKGROUND 
<p style="color: var(--color-white)">aptent conubia enim eleifend  habitasse id montes <code>color-white: #fff</code></p>
<p style="color: var(--color-foreground)">aptent conubia enim eleifend  habitasse id montes <code>color-foreground: var(--color-gray-07)</code></p>
<p style="color: var(--color-background)">aptent conubia enim eleifend  habitasse id montes <code>color-background: var(--color-white)</code></p>
<p style="color: var(--color-bg-contrast)">aptent conubia enim eleifend  habitasse id montes <code>color-bg-contrast: var(--color-gray-95)</code>     /* table even row */</p>

## SEMANTIC

<p style="color: var(--color-body)">aptent conubia enim eleifend  habitasse id montes <code>color-body: var(--color-foreground)</code></p>
<p style="color: var(--color-nav-text)">aptent conubia enim eleifend  habitasse id montes <code>color-nav-text: var(--color-gray-20)</code></p>
<p style="color: var(--color-nav-hover)">aptent conubia enim eleifend  habitasse id montes <code>color-nav-hover: var(--color-darkred)</code></p>
<p style="color: var(--color-heading)">aptent conubia enim eleifend  habitasse id montes <code>color-heading: var(--color-gray-20)</code></p>
<p style="color: var(--color-link)">aptent conubia enim eleifend  habitasse id montes <code>color-link: var(--color-darkred)</code></p>
<p style="color: var(--color-footer)">aptent conubia enim eleifend  habitasse id montes <code>color-footer: var(--color-gray-75)</code></p>
<p style="color: var(--color-code)">aptent conubia enim eleifend  habitasse id montes <code>color-code: var(--color-darkred)</code>   /* naked code */</p>
<p style="color: var(--color-code-bg)">aptent conubia enim eleifend  habitasse id montes <code>color-code-bg: var(--color-gray-88)</code></p>
<p style="color: var(--color-fold-marker)">aptent conubia enim eleifend  habitasse id montes <code>color-fold-marker: var(--color-darkred)</code></p>
<p style="color: var(--color-fold-expanded)">aptent conubia enim eleifend  habitasse id montes <code>color-fold-expanded: var(--color-gray-95)</code></p>
<p style="color: var(--color-fold-head)">aptent conubia enim eleifend  habitasse id montes <code>color-fold-head: var(--color-red-faded)</code></p>
<p style="color: var(--color-fold-border)">aptent conubia enim eleifend  habitasse id montes <code>color-fold-border: var(--color-gray-88)</code></p>

