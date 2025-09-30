(function() {
	// Site-wide search: tries to fetch /search.json (if generated) and falls back to DOM scanning
	document.addEventListener('DOMContentLoaded', function() {
		const searchInput = document.querySelector('.search-input');
		const searchContainer = document.querySelector('.search');
		if (!searchInput || !searchContainer) return;

		const resultsDropdown = document.createElement('div');
		resultsDropdown.className = 'search-results';
		resultsDropdown.style.cssText = `
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background: white;
			border-radius: 8px;
			box-shadow: 0 4px 16px rgba(0,0,0,0.1);
			max-height: 300px;
			overflow-y: auto;
			z-index: 1000;
			display: none;
		`;
		searchContainer.appendChild(resultsDropdown);

		let indexData = null;
		// Try to fetch /search.json (if you generate one with Jekyll plugin)
		fetch('/search.json').then(r => {
			if (!r.ok) throw new Error('no index');
			return r.json();
		}).then(json => {
			indexData = json;
		}).catch(() => {
			indexData = null; // will fallback to DOM
		});

		function domIndex() {
			const content = [];
			document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
				const t = h.textContent.trim();
				if (t) content.push({title: t, url: null, context: getContextText(h)});
			});
			document.querySelectorAll('.organizer-row, .people-card').forEach(el => {
				const name = el.querySelector('h2');
				if (name) content.push({ title: name.textContent.trim(), url: null, context: (el.querySelector('p')||{}).textContent || '' });
			});
			document.querySelectorAll('.nav a, .dropdown-content a').forEach(a => {
				const txt = a.textContent.trim();
				if (txt) content.push({ title: txt, url: a.getAttribute('href'), context: 'Navigation link' });
			});
			document.querySelectorAll('section p, main p').forEach(p => {
				const t = p.textContent.trim();
				if (t && t.length > 20) content.push({ title: t.split(' ').slice(0,10).join(' ') + (t.split(' ').length>10? '...':'') , url: null, context: t.substring(0,120) });
			});
			return content;
		}

		function getContextText(el) {
			const n = el.nextElementSibling;
			if (n && n.tagName === 'P') return n.textContent.trim().substring(0,120);
			return '';
		}

		function highlightQuery(text, q) {
			const regex = new RegExp(`(${escapeRegex(q)})`, 'gi');
			return text.replace(regex, '<mark style="background: yellow; padding: 0;">$1</mark>');
		}
		function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }

			function displayResults(results, q) {
				if (!results || results.length === 0) {
					resultsDropdown.innerHTML = '<div class="search-empty">No results found</div>';
					resultsDropdown.style.display = 'block';
					return;
				}
				// Render a compact list: title (single line) + small secondary line beneath (no highlights)
				resultsDropdown.innerHTML = results.slice(0,8).map(r => {
					const href = r.url ? `href="${r.url}"` : `href="#" onclick="scrollToElement(event,this)" data-element-text="${encodeURIComponent(r.title)}"`;
					const secondary = r.url ? (new URL(r.url, window.location.href).pathname.replace(/\/$/, '')) : (r.context ? r.context.replace(/\s+/g, ' ').slice(0, 80) : '');
					return `
						<a ${href} class="search-item">
							<div class="search-item-title">${r.title}</div>
							${secondary ? `<div class="search-item-sub">${secondary}</div>` : ''}
						</a>`;
				}).join('');
				resultsDropdown.style.display = 'block';
			}

		window.scrollToElement = function(evt, link) {
			evt.preventDefault();
			const t = decodeURIComponent(link.getAttribute('data-element-text'));
			const elms = document.querySelectorAll('h1,h2,h3,h4,h5,h6,.organizer-row');
			for (let el of elms) {
				if (el.textContent && el.textContent.includes(t.split('...')[0])) {
					el.scrollIntoView({behavior:'smooth',block:'center'});
					resultsDropdown.style.display = 'none';
					searchInput.value = '';
					break;
				}
			}
		};

		searchInput.addEventListener('input', function() {
			const q = this.value.trim().toLowerCase();
			if (q.length < 2) { resultsDropdown.style.display = 'none'; return; }

			if (indexData) {
				const results = indexData.filter(i => (i.title && i.title.toLowerCase().includes(q)) || (i.content && i.content.toLowerCase().includes(q)) || (i.excerpt && i.excerpt.toLowerCase().includes(q)) );
				displayResults(results.map(r=>({title:r.title,url:r.url,context:r.excerpt||r.content||''})), q);
			} else {
				const dom = domIndex();
				const results = dom.filter(d => (d.title && d.title.toLowerCase().includes(q)) || (d.context && d.context.toLowerCase().includes(q)));
				displayResults(results, q);
			}
		});

		document.addEventListener('click', function(e) {
			if (!searchContainer.contains(e.target)) resultsDropdown.style.display = 'none';
		});
	});
})();

	// Floating nested submenus: clone submenu content and append to body on hover to avoid clipping/overlap
	document.addEventListener('DOMContentLoaded', function() {
		const submenuParents = document.querySelectorAll('.dropdown-submenu');
		submenuParents.forEach(parent => {
			const original = parent.querySelector('.dropdown-content');
			if (!original) return;

			let floating = null;
			let removeTimer = null;

			function createFloating() {
				if (floating) return floating;
				floating = original.cloneNode(true);
				floating.classList.add('floating-submenu');
				// ensure visible
				floating.style.opacity = '1';
				floating.style.pointerEvents = 'auto';
				floating.style.position = 'fixed';
				floating.style.zIndex = '3000';
				document.body.appendChild(floating);

				floating.addEventListener('mouseenter', () => {
					if (removeTimer) { clearTimeout(removeTimer); removeTimer = null; }
				});

				floating.addEventListener('mouseleave', () => {
					scheduleRemove();
				});

				return floating;
			}

			function positionFloating() {
				if (!floating) return;
				const triggerRect = parent.getBoundingClientRect();
				// place to the right of parent
				const left = Math.min(window.innerWidth - floating.offsetWidth - 8, Math.round(triggerRect.right + 8));
				const top = Math.max(8, Math.round(triggerRect.top));
				floating.style.left = left + 'px';
				floating.style.top = top + 'px';
			}

			function scheduleRemove() {
				if (removeTimer) clearTimeout(removeTimer);
				removeTimer = setTimeout(() => {
					if (floating && floating.parentElement) floating.parentElement.removeChild(floating);
					floating = null;
				}, 180);
			}

			parent.addEventListener('mouseenter', () => {
				if (removeTimer) { clearTimeout(removeTimer); removeTimer = null; }
				createFloating();
				positionFloating();
			});

			parent.addEventListener('mousemove', () => {
				// reposition if necessary while moving
				if (floating) positionFloating();
			});

			parent.addEventListener('mouseleave', () => {
				scheduleRemove();
			});
		});
	});

