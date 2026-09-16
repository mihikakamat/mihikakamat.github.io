/* ---------------------------------------------------------------------------
   Artwork manifest.

   To add a piece:
     1. Drop the image into  site/assets/img/art/
     2. Add an entry below.

   Only `src` is required. `title`, `medium`, and `year` render in the caption
   and may be omitted. Order here is the order in the carousel and the
   thumbnail strip.

   Long edge of ~2000px is plenty; anything larger just makes the page slow.

   Names and media come from the blurbs document. Years are deliberately not
   shown.

   Order groups pieces of similar proportion into the same row of three:
     row 1  portraits at ~0.75
     row 2  portraits at 0.68-0.79
     row 3  landscapes at 1.25-1.35
   Adding or removing a piece shifts the rows, so re-check the grouping.
   --------------------------------------------------------------------------- */

window.ARTWORK = [

  // --- row 1 ---

  { src: "assets/img/art/stepping-out.jpg",
    title: "Stepping Out",
    medium: "Oil pastel" },

  { src: "assets/img/art/torn-paper-flowers.jpg",
    title: "Burning Away",
    medium: "Soft pastel on cardboard and burnt paper" },

  { src: "assets/img/art/hibiscus-dreams.jpg",
    title: "Hibiscus Dreams",
    medium: "Color pencil, ink pen" },

  // --- row 2 ---

  { src: "assets/img/art/figure-with-hands.jpg",
    title: "Puppet",
    medium: "Color pencils" },

  { src: "assets/img/art/kitchen-dragon.jpg",
    title: "Fuel to the Fire",
    medium: "Oil pastel" },

  { src: "assets/img/art/tree-orange-sky.jpg",
    title: "Shapes of Nature",
    medium: "Oil pastel" },


  // --- row 3 ---

  { src: "assets/img/art/still-life-beads.jpg",
    title: "The Sea\u2019s Greatest Treasure",
    medium: "Color pencil" },

  { src: "assets/img/art/still-life-cards.jpg",
    title: "First On Deck",
    medium: "Color pencil" },

  { src: "assets/img/art/ship-at-sea.jpg",
    title: "At Sea",
    medium: "Oil pastel" },

];
