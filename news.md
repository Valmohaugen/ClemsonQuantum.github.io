---
layout: default
title: News
---

# News

This page is for news articles that the Club or it's members are in. Add a brief description about this here. 

<div class="news-cards">
  {% assign news_pages = site.pages | where_exp: 'item', "item.path contains 'news/'" | sort: 'date' | reverse %}
  {% for item in news_pages %}
    {% if item.url != page.url %}
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
          <h2 class="news-card__title">{{ item.title }}</h2>
          {% if item.summary %}
            <p class="news-card__summary">{{ item.summary }}</p>
          {% else %}
            <p class="news-card__summary">{{ item.excerpt | strip_html | truncate: 160 }}</p>
          {% endif %}
          <a class="news-card__link" href="{{ href }}"{% if opens_in_new_tab %} target="_blank" rel="noopener"{% endif %}>{{ item.cta_label | default: "Read the story" }}</a>
          </div>
          {% if item.image %}
          <div class="news-card__image" aria-hidden="true">
            <img src="{{ item.image }}" alt="{{ item.title | escape }}" loading="lazy" />
          </div>
          {% endif %}
        </div>
      </article>
    {% endif %}
  {% endfor %}
</div>
