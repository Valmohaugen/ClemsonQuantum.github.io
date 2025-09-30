---
layout: default
title: Events
---

<main>
  <h1>All Events</h1>
</main>

<section>
  <p>Browse upcoming and past events by category. Click "Show more" to expand the full list in each section.</p>
</section>

<!-- Hackathons section -->
<section class="events-section">
  <h2>Hackathons</h2>
  {% assign hack_pages = site.pages | where_exp: 'p', "p.path contains 'events/hackathons/'" | where_exp: 'p', 'p.date' | sort: 'date' | reverse %}
  {% assign hack_undated = site.pages | where_exp: 'p', "p.path contains 'events/hackathons/'" | where_exp: 'p', 'p.date == nil' | sort: 'title' %}
  {% assign hack_all = hack_pages | concat: hack_undated %}

  <div class="news-cards">
    {% for item in hack_all limit:3 %}
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

  {% if hack_all.size > 3 %}
  <div class="more-container">
    <button class="show-more" data-target="hackathons-more">Show more</button>
    <div id="hackathons-more" class="more-list" style="display: none;">
      <div class="news-cards">
        {% for item in hack_all offset:3 %}
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
    </div>
  </div>
  {% endif %}
</section>

<!-- Workshops section -->
<section class="events-section">
  <h2>Workshops & Seminars</h2>
  {% assign ws_pages = site.pages | where_exp: 'p', "p.path contains 'events/workshops-and-seminars/'" | where_exp: 'p', 'p.date' | sort: 'date' | reverse %}
  {% assign ws_undated = site.pages | where_exp: 'p', "p.path contains 'events/workshops-and-seminars/'" | where_exp: 'p', 'p.date == nil' | sort: 'title' %}
  {% assign ws_all = ws_pages | concat: ws_undated %}

  <div class="news-cards">
    {% for item in ws_all limit:3 %}
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

  {% if ws_all.size > 3 %}
  <div class="more-container">
    <button class="show-more" data-target="workshops-more">Show more</button>
    <div id="workshops-more" class="more-list" style="display: none;">
      <div class="news-cards">
        {% for item in ws_all offset:3 %}
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
    </div>
  </div>
  {% endif %}
</section>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.show-more').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var target = this.dataset.target;
        var el = document.getElementById(target);
        if (!el) return;
        if (el.style.display === 'none') {
          el.style.display = 'block';
          this.textContent = 'Show less';
        } else {
          el.style.display = 'none';
          this.textContent = 'Show more';
        }
      });
    });
  });
</script>
