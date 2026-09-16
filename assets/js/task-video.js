/* Looping demo clips that hold on the last frame before starting over.

   The `loop` attribute restarts instantly, which makes the four clips read as
   one continuous churn. Removing it and restarting on a timer gives each run a
   visible beginning and end.

   Someone who has asked their system for reduced motion gets a still first
   frame and the play button instead. */
(function () {
  "use strict";

  var HOLD_MS = 2000;

  var still = window.matchMedia &&
              window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("video.task-video").forEach(function (v) {
    if (still) {
      v.autoplay = false;
      v.removeAttribute("autoplay");
      v.removeAttribute("loop");
      v.controls = true;   // no autoplay means they need a way to start it
      v.pause();
      return;
    }

    // The timer does the looping, so the attribute has to go.
    v.loop = false;
    v.removeAttribute("loop");

    var timer = null;

    function cancel() {
      if (timer) { clearTimeout(timer); timer = null; }
    }

    v.addEventListener("ended", function () {
      cancel();
      timer = setTimeout(function () {
        timer = null;
        v.currentTime = 0;
        var p = v.play();
        if (p && p.catch) p.catch(function () { /* autoplay refused; leave it */ });
      }, HOLD_MS);
    });

    // If someone takes control mid-hold, drop the pending restart.
    v.addEventListener("play", cancel);
    v.addEventListener("seeking", cancel);

    // Nothing should be waiting on a hidden tab.
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) cancel();
    });
  });
})();
