/* Renders window.RECORDINGS into #tracks. An empty manifest leaves a single
   placeholder card so the section still explains itself. */
(function () {
  "use strict";

  var host = document.getElementById("tracks");
  if (!host) return;

  var items = Array.isArray(window.RECORDINGS) ? window.RECORDINGS : [];

  if (!items.length) {
    var empty = document.createElement("div");
    empty.className = "track";
    empty.innerHTML =
      '<h3>Recordings coming soon</h3>' +
      '<p class="meta">Performances are being selected and edited.</p>' +
      '<div class="player-placeholder">Player will appear here</div>';
    host.appendChild(empty);
    return;
  }

  items.forEach(function (r) {
    var el = document.createElement("article");
    el.className = "track";

    var label = r.title || r.piece;
    if (label) {
      var h = document.createElement("h3");
      h.textContent = label;
      el.appendChild(h);
    }

    var meta = [r.composer, r.event, r.year].filter(Boolean).join(" · ");
    if (meta) {
      var m = document.createElement("p");
      m.className = "meta";
      m.textContent = meta;
      el.appendChild(m);
    }

    if (r.kind === "video" && r.src) {
      /* A local file, click-to-play: the poster frame stands in until someone
         asks for it, so nothing downloads a hundred megabytes uninvited. */
      var wrap = document.createElement("div");
      wrap.className = "video";

      var start = document.createElement("button");
      start.type = "button";
      start.className = "video-play";
      start.setAttribute("aria-label", "Play " + (r.title || "recording"));

      if (r.poster) {
        var still = document.createElement("img");
        still.className = "video-poster";
        still.alt = "";
        still.loading = "lazy";
        still.src = r.poster;
        start.appendChild(still);
      }

      var mark = document.createElement("span");
      mark.className = "video-play-glyph";
      mark.setAttribute("aria-hidden", "true");
      start.appendChild(mark);

      start.addEventListener("click", function () {
        var vid = document.createElement("video");
        vid.src = r.src;
        vid.controls = true;
        vid.autoplay = true;
        vid.playsInline = true;
        vid.preload = "auto";
        if (r.poster) vid.poster = r.poster;
        wrap.replaceChild(vid, start);
        vid.focus();

        /* One track is open at a time. Starting a recording widens it and
           returns every other one to the reading measure. Pausing leaves it
           open, so stepping away mid-piece does not collapse the frame. */
        var open = function () {
          // Two recordings playing at once is never wanted: stop the others.
          host.querySelectorAll("video").forEach(function (other) {
            if (other !== vid && !other.paused) other.pause();
          });
          host.querySelectorAll(".track.is-playing").forEach(function (other) {
            if (other !== el) other.classList.remove("is-playing");
          });
          el.classList.add("is-playing");
        };
        vid.addEventListener("play", open);
        vid.addEventListener("playing", open);
        open();
      });

      wrap.appendChild(start);
      el.appendChild(wrap);

    } else if (r.kind === "audio" && r.src) {
      var a = document.createElement("audio");
      a.controls = true;
      a.preload = "none";
      a.src = r.src;
      el.appendChild(a);

    } else if ((r.kind === "youtube" || r.kind === "vimeo") && r.id) {
      /* A click-to-play facade rather than a bare iframe. Until the viewer
         presses play there is no YouTube chrome on the page at all — no title
         bar, no channel avatar — just the poster frame. It also keeps the page
         light, since the player only loads when someone actually wants it. */
      var wrapper = document.createElement("div");
      wrapper.className = "video";

      var play = document.createElement("button");
      play.type = "button";
      play.className = "video-play";
      play.setAttribute("aria-label", "Play " + (r.title || "violin performance"));

      if (r.poster || r.kind === "youtube") {
        var poster = document.createElement("img");
        poster.className = "video-poster";
        poster.alt = "";
        poster.loading = "lazy";

        if (r.poster) {
          poster.src = r.poster;
        } else {
          poster.src = "https://i.ytimg.com/vi/" + encodeURIComponent(r.id) + "/maxresdefault.jpg";
          // maxres does not exist for every upload; fall back to the always-present size.
          poster.addEventListener("error", function () {
            if (poster.dataset.fellBack) return;
            poster.dataset.fellBack = "1";
            poster.src = "https://i.ytimg.com/vi/" + encodeURIComponent(r.id) + "/hqdefault.jpg";
          });
        }
        play.appendChild(poster);
      }

      var glyph = document.createElement("span");
      glyph.className = "video-play-glyph";
      glyph.setAttribute("aria-hidden", "true");
      play.appendChild(glyph);

      play.addEventListener("click", function () {
        var frame = document.createElement("iframe");
        var params = "?autoplay=1&rel=0&modestbranding=1&playsinline=1";

        /* A concert upload holds many performers. `start` and `end`, in whole
           seconds, cue the player to one of them. YouTube stops at `end` but
           leaves the viewer there, free to scrub — it is a cue, not a fence. */
        if (r.kind === "youtube") {
          if (r.start != null) params += "&start=" + Math.round(r.start);
          if (r.end != null) params += "&end=" + Math.round(r.end);
        }

        frame.src = r.kind === "youtube"
          ? "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(r.id) + params
          : "https://player.vimeo.com/video/" + encodeURIComponent(r.id) + "?autoplay=1"
            + (r.start != null ? "#t=" + Math.round(r.start) + "s" : "");
        frame.title = r.title || "Violin performance";
        frame.allow = "autoplay; accelerometer; clipboard-write; encrypted-media; picture-in-picture";
        frame.allowFullscreen = true;
        wrapper.replaceChild(frame, play);
        frame.focus();
      });

      wrapper.appendChild(play);
      el.appendChild(wrapper);

    } else {
      var ph = document.createElement("div");
      ph.className = "player-placeholder";
      ph.textContent = "Recording not yet linked";
      el.appendChild(ph);
    }

    host.appendChild(el);
  });
})();
