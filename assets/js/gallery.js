/* Artwork display.

   Two layouts are available. Set the flag below:

     "carousel"  two large pieces on rotation, thumbnail strip beneath
     "grid"      the earlier static grid

   Both open the lightbox on click and share the same manifest. */

window.ART_LAYOUT = "grid";          // <- "grid" (full gallery) or "carousel"

(function () {
  "use strict";

  var host = document.getElementById("gallery");
  if (!host) return;

  var pieces = Array.isArray(window.ARTWORK) ? window.ARTWORK : [];

  if (!pieces.length) {
    for (var i = 0; i < 6; i++) {
      var slot = document.createElement("div");
      slot.className = "tile is-placeholder";
      slot.textContent = "Artwork\ncoming soon";
      host.appendChild(slot);
    }
    return;
  }

  function caption(p) {
    return [p.medium, p.year].filter(Boolean).join(", ");
  }

  function fillCaption(cap, p) {
    cap.textContent = "";
    if (p.title) {
      var t = document.createElement("span");
      t.className = "art-title";
      t.textContent = p.title;
      cap.appendChild(t);
    }
    var detail = caption(p);
    if (detail) {
      var d = document.createElement("span");
      d.className = "art-medium";
      d.textContent = detail;
      cap.appendChild(d);
    }
    return cap;
  }

  function captionNode(p) {
    var cap = fillCaption(document.createElement("figcaption"), p);
    return cap.childNodes.length ? cap : null;
  }

  /* ------------------------------------------------------------------ */
  /* Lightbox — shared by both layouts                                   */
  /* ------------------------------------------------------------------ */

  var box     = document.getElementById("lightbox");
  var boxImg  = document.getElementById("lbImg");
  var boxCap  = document.getElementById("lbCaption");
  var current = 0;
  var lastFocus = null;

  function show(i) {
    current = (i + pieces.length) % pieces.length;
    var p = pieces[current];
    boxImg.src = p.src;
    boxImg.alt = p.title || "Artwork by Mihika Kamat";
    boxCap.textContent = [p.title, caption(p)].filter(Boolean).join(" — ");
  }

  function openBox(i) {
    if (!box) return;
    lastFocus = document.activeElement;
    show(i);
    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
    document.getElementById("lbClose").focus();
  }

  function closeBox() {
    box.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  if (box) {
    document.getElementById("lbClose").addEventListener("click", closeBox);
    document.getElementById("lbPrev").addEventListener("click", function () { show(current - 1); });
    document.getElementById("lbNext").addEventListener("click", function () { show(current + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) closeBox(); });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape")     closeBox();
      if (e.key === "ArrowLeft")  show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Grid                                                                */
  /* ------------------------------------------------------------------ */

  function buildGrid() {
    host.classList.add("gallery-grid");
    pieces.forEach(function (p, i) {
      var fig = document.createElement("figure");
      var btn = document.createElement("button");
      btn.className = "tile";
      btn.type = "button";
      btn.setAttribute("aria-label", "View " + (p.title || "artwork") + " full size");
      btn.addEventListener("click", function () { openBox(i); });

      var img = document.createElement("img");
      img.src = p.src;
      img.alt = p.title || "Artwork by Mihika Kamat";
      img.loading = "lazy";
      btn.appendChild(img);

      fig.appendChild(btn);
      var cap = captionNode(p);
      if (cap) fig.appendChild(cap);
      host.appendChild(fig);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Carousel: two on show, the whole collection as thumbnails beneath    */
  /* ------------------------------------------------------------------ */

  function buildCarousel() {
    host.classList.add("carousel");

    var STEP = 3;                       // pieces shown, and pieces advanced

    var viewport = document.createElement("div");
    viewport.className = "carousel-viewport";

    var stage = document.createElement("div");
    stage.className = "carousel-stage";

    var slots = [0, 1, 2].map(function (n) {
      var fig = document.createElement("figure");
      fig.className = "carousel-slot";

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "carousel-frame";

      var img = document.createElement("img");
      btn.appendChild(img);
      fig.appendChild(btn);

      var cap = document.createElement("figcaption");
      fig.appendChild(cap);

      stage.appendChild(fig);
      return { fig: fig, btn: btn, img: img, cap: cap, index: n };
    });

    var strip = document.createElement("div");
    strip.className = "carousel-thumbs";
    strip.setAttribute("role", "list");

    var thumbs = pieces.map(function (p, i) {
      var t = document.createElement("button");
      t.type = "button";
      t.className = "carousel-thumb";
      t.setAttribute("role", "listitem");
      t.setAttribute("aria-label", "Show " + (p.title || "artwork " + (i + 1)));

      var ti = document.createElement("img");
      ti.src = p.src;
      ti.alt = "";
      ti.loading = "lazy";
      t.appendChild(ti);

      t.addEventListener("click", function () {
        cursor = i;
        render();
        restart();
      });
      strip.appendChild(t);
      return t;
    });

    function arrow(dir, label, glyph) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "carousel-arrow carousel-" + dir;
      b.setAttribute("aria-label", label);
      b.innerHTML = glyph;
      b.addEventListener("click", function () {
        cursor = (cursor + (dir === "next" ? STEP : -STEP) + pieces.length) % pieces.length;
        render();
        restart();
      });
      return b;
    }

    viewport.appendChild(arrow("prev", "Previous artworks", "&#8249;"));
    viewport.appendChild(stage);
    viewport.appendChild(arrow("next", "Next artworks", "&#8250;"));

    host.appendChild(viewport);
    host.appendChild(strip);

    var cursor = 0;

    function render() {
      slots.forEach(function (s, n) {
        var i = (cursor + n) % pieces.length;
        var p = pieces[i];
        s.index = i;

        s.fig.classList.remove("is-fresh");
        // Force a reflow so the fade restarts on every change.
        void s.fig.offsetWidth;
        s.fig.classList.add("is-fresh");

        s.img.src = p.src;
        s.img.alt = p.title || "Artwork by Mihika Kamat";
        s.btn.setAttribute("aria-label", "View " + (p.title || "artwork") + " full size");
        fillCaption(s.cap, p);
      });

      thumbs.forEach(function (t, i) {
        var live = slots.some(function (s) { return s.index === i; });
        t.classList.toggle("is-current", live);
        t.setAttribute("aria-current", live ? "true" : "false");
      });
    }

    slots.forEach(function (s) {
      s.btn.addEventListener("click", function () { openBox(s.index); });
    });

    var timer = null;
    var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function tick() {
      cursor = (cursor + STEP) % pieces.length;
      render();
    }
    function restart() {
      if (still) return;
      clearInterval(timer);
      timer = setInterval(tick, 6000);
    }
    function pause() { clearInterval(timer); }

    // Do not rotate under someone's cursor or keyboard focus.
    host.addEventListener("mouseenter", pause);
    host.addEventListener("mouseleave", restart);
    host.addEventListener("focusin", pause);
    host.addEventListener("focusout", restart);
    document.addEventListener("visibilitychange", function () {
      document.hidden ? pause() : restart();
    });

    render();
    restart();
  }

  (window.ART_LAYOUT === "grid" ? buildGrid : buildCarousel)();
})();
