---
layout: default
title: Hackathons
---

<main>
  <h1>Hackathons</h1>
</main>

<section>
  <p>
    Text about hackathons.
  </p>
  <p>
    List of hackathons with a picture, title, and description by semester and year.
  </p>
  <div class="news-cards">
    {% assign hack_pages = site.pages | where_exp: 'p', "p.path contains 'events/hackathons/'" | where_exp: 'p', 'p.date' | sort: 'date' | reverse %}
    {% assign hack_undated = site.pages | where_exp: 'p', "p.path contains 'events/hackathons/'" | where_exp: 'p', 'p.date == nil' | sort: 'title' %}
    {% assign hack_all = hack_pages | concat: hack_undated %}

    {% for item in hack_all %}
      {% assign destination = item.link | default: item.external_url | default: item.permalink | default: item.url %}
      {% if destination contains '://' %}
        {% assign href = destination %}
        {% assign opens_in_new_tab = true %}
      {% else %}
        {% assign href = destination | relative_url %}
        {% assign opens_in_new_tab = false %}
      {% endif %}

      <article class="news-card">
        <div class="news-card__layout">
          <div class="news-card__content">
            {% if item.date %}
              <p class="news-card__meta">{{ item.date | date: "%B %-d, %Y" }}</p>
            {% endif %}
            <h2 class="news-card__title"><a href="{{ href }}"{% if opens_in_new_tab %} target="_blank" rel="noopener"{% endif %}>{{ item.title }}</a></h2>
            {% if item.summary %}
              <p class="news-card__summary">{{ item.summary }}</p>
            {% else %}
              <p class="news-card__summary">{{ item.excerpt | strip_html | truncate: 160 }}</p>
            {% endif %}
          </div>
          {% if item.image %}
          <div class="news-card__image" aria-hidden="true">
            <img src="{{ item.image }}" alt="{{ item.title | escape }}" loading="lazy" />
          </div>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>
