---
layout: page
title: Guides
permalink: /blog/categories/ML_and_AI
---
 
<h5> Posts by Category : {{ page.title }} </h5>

<div class="card">
{% for post in site.categories.ML_and_AI %}
 <li class="category-posts"><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</div>