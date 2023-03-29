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
{%- endif %}

<span class="date">{{ page.date.toDateString().replace(' 0', ' ')}}</span>

{% if post.data.image %}
    <img src="{{post.data.image}}" alt="{{post.data.title}}" />
{%- endif %}


{% renderTemplate "njk,md", post %}
    {{ data.excerpt | safe }}
{% endrenderTemplate %}

