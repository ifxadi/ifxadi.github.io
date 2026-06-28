/* ============================================================
   SHARED APP LOGIC — renders portfolio grid + modal from
   portfolioData.js. Theme-agnostic; reads accent colors from
   CSS variables so canvas animations match the active theme.
   ============================================================ */
(function () {
  "use strict";

  function cssVar(name, fallback) {
    const v = getComputedStyle(document.body).getPropertyValue(name).trim();
    return v || fallback;
  }
  function escapeHtml(t) {
    const d = document.createElement("div");
    d.textContent = t == null ? "" : t;
    return d.innerHTML;
  }

  /* ── Inject modal markup once ──────────────────────────────── */
  function ensureModal() {
    if (document.getElementById("modal")) return;
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "modal";
    modal.innerHTML =
      '<div class="modal-wrapper"><div class="modal-content">' +
        '<div class="modal-topbar">' +
          '<span class="mt-label">Project / Detail</span>' +
          '<button class="modal-close" aria-label="Close">\u00d7</button>' +
        "</div>" +
        '<div class="modal-body">' +
          '<div class="modal-hero"><img id="modalImage" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt=""></div>' +
          '<div class="modal-inner">' +
            '<span class="modal-category" id="modalCategory"></span>' +
            '<h2 class="modal-title" id="modalTitle"></h2>' +
            '<p class="modal-description" id="modalDescription"></p>' +
            '<div id="modalDetails"></div>' +
          "</div>" +
        "</div>" +
      "</div></div>";
    document.body.appendChild(modal);
    modal.querySelector(".modal-close").addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.classList.contains("modal-wrapper")) closeModal();
    });
  }

  /* ── Canvas animation defs (theme-colored) ─────────────────── */
  function themeColors() {
    return {
      accent: cssVar("--accent", "#e0a23c"),
      accentRGB: cssVar("--accent-rgb", "224,162,60"),
      teal: cssVar("--accent-2", "#4ecdc4"),
      tealRGB: cssVar("--accent-2-rgb", "78,205,196"),
      ink: cssVar("--text", "#f5f1e8"),
      bg: cssVar("--bg-2", "#0d0d0d"),
    };
  }

  const canvasDefs = {
    toolpipeline: function (canvas, labels, config) {
      const ctx = canvas.getContext("2d");
      const C = themeColors();
      let t = 0, raf;
      canvas.width = canvas.offsetWidth || 400;
      canvas.height = 620;
      canvas.style.height = "620px";
      const W = canvas.width, H = canvas.height;
      const nodes = (config && config.nodes) || [];
      const edges = (config && config.edges) || nodes.map((_, i) => [i, (i + 1) % nodes.length]);
      const accent = C.accent, particle = C.accent, teal = C.teal;
      const N = nodes.length;
      const BOX_W = W * 0.5, BOX_H = 52, PAD_T = 28, PAD_B = 60;
      const TOTAL_H = H - PAD_T - PAD_B;
      const GAP = (TOTAL_H - N * BOX_H) / (N - 1);
      const LEFT = (W - BOX_W) / 2;
      const nodeY = (i) => PAD_T + i * (BOX_H + GAP);
      const nodeCX = () => W / 2;
      const glow = new Array(N).fill(0);

      function rgba(hexRGB, a) { return "rgba(" + hexRGB + "," + a + ")"; }
      function drawNode(i, g) {
        const x = LEFT, y = nodeY(i), lit = g > 0.05;
        ctx.fillStyle = lit ? rgba(C.accentRGB, 0.10) : "rgba(255,255,255,0.015)";
        ctx.fillRect(x, y, BOX_W, BOX_H);
        ctx.strokeStyle = lit ? rgba(C.accentRGB, 0.3 + g * 0.7) : "rgba(255,255,255,0.12)";
        ctx.lineWidth = lit ? 1.5 : 1;
        ctx.strokeRect(x, y, BOX_W, BOX_H);
        ctx.fillStyle = rgba(C.accentRGB, g * 0.9);
        ctx.fillRect(x, y, 2, BOX_H);
        const BADGE_W = 26, BADGE_H = 18;
        const bx = x + BOX_W - BADGE_W - 8, by = y + (BOX_H - BADGE_H) / 2;
        ctx.fillStyle = lit ? rgba(C.accentRGB, 0.15 + g * 0.7) : "rgba(255,255,255,0.05)";
        ctx.fillRect(bx, by, BADGE_W, BADGE_H);
        ctx.font = "bold 10px " + cssVar("--font-mono", "monospace");
        ctx.textAlign = "center";
        ctx.fillStyle = lit ? accent : "rgba(255,255,255,0.35)";
        ctx.fillText(String(i + 1).padStart(2, "0"), bx + BADGE_W / 2, by + BADGE_H * 0.72);
        const textLeft = x + 12, textRight = bx - 6, availW = textRight - textLeft, textCX = textLeft + availW / 2;
        ctx.textAlign = "center";
        ctx.font = "bold 13px " + cssVar("--font-mono", "monospace");
        ctx.fillStyle = lit ? accent : "rgba(255,255,255,0.85)";
        ctx.fillText(nodes[i].label, textCX, y + BOX_H * 0.4);
        ctx.font = "10.5px " + cssVar("--font-mono", "monospace");
        ctx.fillStyle = lit ? rgba(C.tealRGB, 0.55 + g * 0.45) : "rgba(255,255,255,0.35)";
        let sub = nodes[i].sub || "";
        while (ctx.measureText(sub).width > availW && sub.length > 4) sub = sub.slice(0, -1);
        if (sub !== (nodes[i].sub || "")) sub += "\u2026";
        ctx.fillText(sub, textCX, y + BOX_H * 0.72);
      }
      function drawConnector(fromI, toI, alpha) {
        const x = nodeCX(), y1 = nodeY(fromI) + BOX_H, y2 = nodeY(toI);
        ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2);
        ctx.strokeStyle = rgba(C.tealRGB, alpha); ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 5]); ctx.stroke(); ctx.setLineDash([]);
        const AH = 8;
        ctx.beginPath(); ctx.moveTo(x, y2); ctx.lineTo(x - AH, y2 - AH * 1.3); ctx.lineTo(x + AH, y2 - AH * 1.3); ctx.closePath();
        ctx.fillStyle = rgba(C.tealRGB, alpha); ctx.fill();
      }
      const STEP = 240;
      function draw() {
        ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
        const frame = t % (edges.length * STEP);
        const edgeIdx = Math.floor(frame / STEP);
        const progress = (frame % STEP) / STEP;
        const [fromI, toI] = edges[edgeIdx];
        for (let i = 0; i < N; i++) glow[i] = 0;
        glow[fromI] = 1;
        edges.forEach(([a, b], ei) => { if (b !== a + 1) return; drawConnector(a, b, ei === edgeIdx ? 0.55 + 0.3 * Math.sin(t * 0.08) : 0.1); });
        nodes.forEach((_, i) => drawNode(i, glow[i]));
        if (toI === fromI + 1) {
          const y1 = nodeY(fromI) + BOX_H, y2 = nodeY(toI), py = y1 + (y2 - y1) * progress, px = nodeCX();
          const grad = ctx.createRadialGradient(px, py, 0, px, py, 12);
          grad.addColorStop(0, rgba(C.accentRGB, 0.95));
          grad.addColorStop(1, rgba(C.accentRGB, 0));
          ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(px, py, 12, 0, Math.PI * 2); ctx.fill();
        }
        t++; raf = requestAnimationFrame(draw);
      }
      canvas._stopAnim = () => cancelAnimationFrame(raf);
      draw();
    },
  };

  function buildVideoBlock(block) {
    const caption = escapeHtml(block.caption || "Video");
    const hasEmbed = block.embedSrc && block.embedSrc.trim() !== "";
    const safeUrl = escapeHtml(block.url || "#");
    const label = '<span class="video-label">' + caption + "</span>";
    if (hasEmbed) {
      return '<div class="content-block-video">' + label +
        '<div class="video-embed-wrapper"><iframe src="' + block.embedSrc.trim() +
        '" title="' + caption + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div></div>';
    }
    return '<div class="content-block-video">' + label +
      '<a class="video-link-btn" href="' + safeUrl + '" target="_blank" rel="noopener noreferrer">\u25b6 &nbsp; Watch Video &nbsp;\u2014&nbsp; ' + safeUrl + "</a></div>";
  }
  function buildCanvasBlock(block) {
    const id = "cv_" + Math.random().toString(36).slice(2, 9);
    const variant = block.variant || "toolpipeline";
    return '<div class="content-block-canvas-wrap"><canvas id="' + id + '" class="content-block-canvas" data-variant="' + variant +
      '" data-config=\'' + JSON.stringify(block.config || null) + "'></canvas></div>";
  }

  /* ── Render cards ──────────────────────────────────────────── */
  function renderPortfolio(filter) {
    filter = filter || "all";
    const grid = document.getElementById("portfolioGrid");
    if (!grid) return;
    grid.innerHTML = "";
    const data = filter === "all"
      ? portfolioData
      : portfolioData.filter((i) => (Array.isArray(i.category) ? i.category.includes(filter) : i.category === filter));
    data.forEach((item, n) => {
      const cats = Array.isArray(item.category) ? item.category : [item.category];
      const card = document.createElement("div");
      card.className = "portfolio-item";
      card.dataset.category = cats[0];
      card.addEventListener("click", () => openModal(item));
      const tags = cats.map((c) => '<span class="category-tag">' + c + "</span>").join("");
      card.innerHTML =
        '<div class="thumb-wrap"><span class="card-index">' + String(n + 1).padStart(2, "0") +
        '</span><img class="thumbnail" loading="lazy" src="' + item.thumbnail + '" alt="' + escapeHtml(item.title) + '"></div>' +
        '<div class="card-content"><div class="card-tags">' + tags + "</div>" +
        '<h3 class="card-title">' + escapeHtml(item.title) + "</h3>" +
        '<p class="card-description">' + escapeHtml(item.shortDescription) + "</p>" +
        '<div class="card-tech">' + escapeHtml(item.technologies) + "</div></div>";
      grid.appendChild(card);
    });
  }

  /* ── Modal open/close ──────────────────────────────────────── */
  function openModal(item) {
    ensureModal();
    document.getElementById("modalImage").src = item.image;
    document.getElementById("modalCategory").textContent = (Array.isArray(item.category) ? item.category.join("  /  ") : item.category);
    document.getElementById("modalTitle").textContent = item.title;
    document.getElementById("modalDescription").textContent = item.fullDescription;

    let blocks = "";
    if (item.contentBlocks && item.contentBlocks.length) {
      blocks = '<div class="modal-content-blocks">';
      item.contentBlocks.forEach((b) => {
        switch (b.type) {
          case "heading": blocks += '<div class="content-block"><h3 class="content-block-heading">' + escapeHtml(b.content) + "</h3></div>"; break;
          case "paragraph": blocks += '<div class="content-block"><p class="content-block-paragraph">' + b.content + "</p></div>"; break;
          case "code": blocks += '<div class="content-block"><div class="content-block-code"><pre><code>' + escapeHtml(b.content) + "</code></pre></div></div>"; break;
          case "image": blocks += '<div class="content-block"><div class="content-block-image"><img loading="lazy" src="' + b.src + '" alt="' + escapeHtml(b.alt || "") + '"></div></div>'; break;
          case "video": blocks += '<div class="content-block">' + buildVideoBlock(b) + "</div>"; break;
          case "canvas": blocks += '<div class="content-block">' + buildCanvasBlock(b) + "</div>"; break;
        }
      });
      blocks += "</div>";
    }
    const linkRow = item.link && item.link !== "#"
      ? '<div class="detail-item"><span class="detail-label">Link</span><span class="detail-value"><a href="' + item.link + '" target="_blank" rel="noopener">View project \u2192</a></span></div>' : "";
    document.getElementById("modalDetails").innerHTML =
      blocks +
      '<div class="modal-details">' +
        '<div class="detail-item"><span class="detail-label">Stack</span><span class="detail-value">' + escapeHtml(item.technologies) + "</span></div>" +
        '<div class="detail-item"><span class="detail-label">Role</span><span class="detail-value">' + escapeHtml(item.role || "\u2014") + "</span></div>" +
        '<div class="detail-item"><span class="detail-label">Year</span><span class="detail-value">' + escapeHtml(item.year || "\u2014") + "</span></div>" +
        linkRow +
      "</div>";

    document.querySelectorAll(".content-block-canvas").forEach((c) => c._stopAnim && c._stopAnim());
    document.getElementById("modal").classList.add("active");
    document.body.style.overflow = "hidden";
    document.querySelector(".modal-body").scrollTop = 0;
    requestAnimationFrame(() => {
      document.querySelectorAll(".content-block-canvas").forEach((canvas) => {
        const v = canvas.dataset.variant;
        let cfg = null;
        try { cfg = JSON.parse(canvas.dataset.config); } catch (e) {}
        if (canvasDefs[v]) canvasDefs[v](canvas, null, cfg);
      });
    });
  }
  function closeModal() {
    document.querySelectorAll(".content-block-canvas").forEach((c) => c._stopAnim && c._stopAnim());
    const m = document.getElementById("modal");
    if (m) m.classList.remove("active");
    document.body.style.overflow = "";
  }
  window.closeModal = closeModal;
  window.openModalById = function (id) {
    const item = portfolioData.find((p) => p.id === id);
    if (item) openModal(item);
  };

  /* ── Filters ───────────────────────────────────────────────── */
  function wireFilters() {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        renderPortfolio(this.dataset.filter);
        if (window.__revealScan) window.__revealScan();
      });
    });
  }

  /* ── Reveal on scroll ──────────────────────────────────────── */
  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    window.__revealScan = function () {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    };
    window.__revealScan();
  }

  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  document.addEventListener("DOMContentLoaded", function () {
    ensureModal();
    renderPortfolio("all");
    wireFilters();
    initReveal();
  });
})();
