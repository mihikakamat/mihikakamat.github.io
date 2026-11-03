/* Upgrades any <div class="video" data-youtube="ID"> into a click-to-play
   player: poster frame first, iframe only once the viewer presses play. No
   YouTube chrome on the page until then, and nothing loads that is not wanted.

   Optional attributes:
     data-poster="assets/img/..."   custom still (otherwise YouTube's own)
     data-label="..."               accessible name for the play button
*/
(function () {
  "use strict";

  document.querySelectorAll(".video[data-youtube]").forEach(function (wrapper) {
    var id = wrapper.dataset.youtube;
    if (!id) return;

    var play = document.createElement("button");
    play.type = "button";
    play.className = "video-play";
    play.setAttribute("aria-label", "Play " + (wrapper.dataset.label || "video"));

    var poster = document.createElement("img");
    poster.className = "video-poster";
    poster.alt = "";
    poster.loading = "lazy";
    if (wrapper.dataset.poster) {
      poster.src = wrapper.dataset.poster;
    } else {
      poster.src = "https://i.ytimg.com/vi/" + encodeURIComponent(id) + "/maxresdefault.jpg";
      poster.addEventListener("error", function () {
        if (poster.dataset.fellBack) return;
        poster.dataset.fellBack = "1";
        poster.src = "https://i.ytimg.com/vi/" + encodeURIComponent(id) + "/hqdefault.jpg";
      });
    }
    play.appendChild(poster);

    var glyph = document.createElement("span");
    glyph.className = "video-play-glyph";
    glyph.setAttribute("aria-hidden", "true");
    play.appendChild(glyph);

    play.addEventListener("click", function () {
      var frame = document.createElement("iframe");
      frame.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) +
                  "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
      frame.title = wrapper.dataset.label || "Video";
      frame.allow = "autoplay; accelerometer; clipboard-write; encrypted-media; picture-in-picture";
      frame.allowFullscreen = true;
      wrapper.replaceChild(frame, play);
      frame.focus();
    });

    wrapper.appendChild(play);
  });
})();
