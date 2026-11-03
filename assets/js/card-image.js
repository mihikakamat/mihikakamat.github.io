/* Picks a random image for any element carrying data-random-src, a
   comma-separated list of candidates.

   Opt out without disturbing the list by setting data-random="disable" on the
   element; removing that attribute (or giving it any other value) turns the
   draw back on. The markup ships with one of the candidates already in src, so
   a viewer without JavaScript — or with the draw disabled — still sees a
   picture. Any ?v= stamp on the original src is carried across so cache-busting
   keeps working. */
(function () {
  "use strict";

  document.querySelectorAll("img[data-random-src]").forEach(function (img) {
    if (img.dataset.random === "disable") return;

    var list = img.dataset.randomSrc
                  .split(",")
                  .map(function (s) { return s.trim(); })
                  .filter(Boolean);
    if (list.length < 2) return;

    var stamp = (img.getAttribute("src") || "").split("?")[1];
    var pick  = list[Math.floor(Math.random() * list.length)];

    if (stamp) pick += "?" + stamp;
    img.src = pick;
  });
})();
