---
layout: page
title: Jekyll
permalink: /blog/tags/opinion
---
 
<h5> Posts by Tag : {{ page.title }} </h5>

<div class="card">
{% for post in site.tags.opinion %}
 <li class="category-posts"><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</div>