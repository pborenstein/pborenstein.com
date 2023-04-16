---
pagination:
  data: "collections.posts"
  size: 1
  alias: "post"
layout: screenshot.njk
permalink: "/og{{ post.url }}"
---

{% if post.data.title != '. . .' -%}
    # {{ post.data.title }}
{% else %}
    {{ post.data.excerpt | safe }}
{%- endif %}

{% if post.data.image %}
    <img src="{{post.data.image}}" alt="{{post.data.title}}" />
{%- endif %}


<style>

.flex {
    margin: 20px 60px 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    font-size: var(--s-2);
    font-family: var(--font-heading);
    border-top: 1px solid var(--color-heading);}

.flex > div {
    margin-block-start: 0;
}

</style>


<div class="flex">
    <div>{{ pkg.siteData.title }}</div>
    <div>{{ page.date.toDateString().replace(' 0', ' ')}}</div>
</div>
