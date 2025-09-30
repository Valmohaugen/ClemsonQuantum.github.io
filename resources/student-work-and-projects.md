---
layout: default
title: Student Work & Projects
---

<main>
  <h1>Student Work & Projects</h1>
</main>

<!-- Auto-generated listing of student work -->
<section id="student-work-listing">
  <h2>All Student Work & Projects</h2>
  <p>Below is a list of submitted posters and papers. Click the title to view the poster/paper or the project page.</p>

  {% assign work_pages = site.pages | where_exp: 'p', "p.path contains 'resources/student-work-and-projects/'" | sort: 'date' | reverse %}
  {% for p in work_pages %}
    <section class="student-work-item">
      <h3>
        <a href="{{ p.url | relative_url }}">{{ p.title }}</a>
        <small class="type-label">&nbsp;•&nbsp;{{ p.type | default: 'project' | capitalize }}</small>
      </h3>
      <p class="meta">
        {% if p.date %}{{ p.date | date: "%B %-d, %Y" }}{% endif %}
        {% if p.authors %}
          &nbsp;•&nbsp;{% for a in p.authors %}{{ a.name }}{% if forloop.last == false %}, {% endif %}{% endfor %}
        {% endif %}
      </p>
      {% if p.summary %}
        <p class="summary">{{ p.summary }}</p>
      {% else %}
        <p class="summary">{{ p.excerpt | strip_html | truncate: 200 }}</p>
      {% endif %}
      {% if p.link %}
        <p><a href="{{ p.link }}"{% if p.link contains '://' %} target="_blank" rel="noopener"{% endif %}>View poster / paper</a></p>
      {% endif %}
      <hr />
    </section>
  {% endfor %}
</section>

<!-- Submission template for contributors (kept below listing) -->
<section id="submission-template">
  <h2>Submission template (poster / paper)</h2>
  <p>Copy the snippet below into a new file under <code>resources/student-work-and-projects/</code> (or into a new post) and update the fields. Use the same filename convention as other pages (e.g., <code>2025-My-Poster.md</code>).</p>

  <h3>Template (copy/paste)</h3>
  <pre><code>---
layout: default
title: "Your Project Title"
date: 2025-09-29
type: poster # or paper
authors:
  - name: "Jane Doe"
    affiliation: "Clemson University"
  - name: "John Smith"
    affiliation: "Partner Institution"
summary: "A one-paragraph summary of the poster/paper highlighting the problem, approach, and main result."
image: "/images/your-poster-thumbnail.png" # optional: thumbnail used on listing pages
link: "/resources/student-work-and-projects/2025-My-Poster.pdf" # or external URL
---

## Abstract

A short abstract or description (2-4 paragraphs).

## Authors & affiliations

- Jane Doe — Clemson University
- John Smith — Partner Institution

## Files

- [PDF poster](/resources/student-work-and-projects/2025-My-Poster.pdf)
- [Code / repo](https://github.com/your/repo)
</code></pre>

  <h3>Example (poster)</h3>
  <pre><code>---
layout: default
title: "Quantum Circuit Optimization Poster"
date: 2025-03-01
type: poster
authors:
  - name: "Alice Researcher"
    affiliation: "Clemson Quantum"
summary: "Poster describing methods for optimizing parameterized quantum circuits for NISQ devices."
image: "/images/example-poster-thumb.png"
link: "/resources/student-work-and-projects/2025-Quantum-Poster.pdf"
---

## Abstract

This poster describes ...
</code></pre>

  <h3>Example (paper)</h3>
  <pre><code>---
layout: default
title: "A Study of Topological Wires"
date: 2024-10-15
type: paper
authors:
  - name: "Sam Student"
    affiliation: "Clemson University"
summary: "Short description of the paper and its contributions."
image: "/images/example-paper-thumb.png"
link: "https://arxiv.org/abs/xxxx.xxxxx"
---

## Abstract

Paper abstract goes here...
</code></pre>

  <p>After adding a new page, the site will pick it up automatically. If you want, I can also add a small generator/listing page to show student work in card format similar to News.</p>
</section>
