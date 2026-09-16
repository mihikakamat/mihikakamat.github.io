/* ---------------------------------------------------------------------------
   Violin recordings manifest.

   Three kinds of entry, so you can mix local files and streaming links:

     { kind: "audio",   src: "assets/audio/bach-partita.mp3", ... }
     { kind: "youtube", id: "dQw4w9WgXcQ", ... }
     { kind: "vimeo",   id: "76979871", ... }

   For YouTube the id is the part after `v=` in the watch URL; unlisted videos
   embed exactly like public ones. Every entry also takes `title`, `piece`,
   `composer`, `event`, and `year`, all optional. `composer` joins `event` and
   `year` on the line under the heading.

   A YouTube entry also takes `start` and `end`, in whole seconds, to cue one
   performance inside a long concert upload. Read the timestamp off the YouTube
   player and convert: 12:04 is 12*60 + 4 = 724. Both are optional and
   independent. YouTube stops at `end` but leaves the viewer parked there with
   the scrub bar live, so treat it as where the piece ends, not a hard stop.

   An entry with no `title` renders just its player, with no heading — which is
   how the untitled performances below are set up. Add a `title` (and `event` /
   `year`) to any of them to label it.

   `poster` sets the still shown before playback. For a local file it is what
   stands in until someone presses play, so nothing large downloads uninvited.

   The five below are from the Notes By the Bay 2024 concert, transcoded to 720p
   from the 4K masters in src/video/. All five are named from the printed
   programme for that concert.
   --------------------------------------------------------------------------- */

window.RECORDINGS = [

  /* Notes By the Bay summer concert, 30 June 2024. Titles come from the printed
     programme (photographed in backup/); each is confirmed by the poem the
     programme prints beside it, which is audible at the matching timestamp in
     the uncut Part One recording. The programme reads: Fire and Ice, then the
     Prelude; Who Has Seen the Wind?, then the Dvorak; Mihika's own note on
     Bach, then the Concerto. */

  { kind: "video", src: "assets/video/violin/nbtb-2024-15-59.mp4",
    poster: "assets/img/violin-15-59.jpg",
    title: "Spinning Wheel",
    composer: "N. Rubenstein",
    event: "Notes By the Bay, summer concert",
    year: 2024 },

  { kind: "video", src: "assets/video/violin/nbtb-2024-35-44.mp4",
    poster: "assets/img/violin-35-44.jpg",
    title: "Prelude for Two Violins",
    composer: "Dmitri Shostakovich",
    event: "Notes By the Bay, summer concert",
    year: 2024 },

  { kind: "video", src: "assets/video/violin/nbtb-2024-39-19.mp4",
    poster: "assets/img/violin-39-19.jpg",
    title: "Sicilienne and Rigaudon",
    composer: "Fritz Kreisler",
    event: "Notes By the Bay, summer concert",
    year: 2024 },

  { kind: "video", src: "assets/video/violin/nbtb-2024-44-11.mp4",
    poster: "assets/img/violin-44-11.jpg",
    title: "Songs My Mother Taught Me",
    composer: "Anton\u00edn Dvo\u0159\u00e1k",
    event: "Notes By the Bay, summer concert",
    year: 2024 },

  /* Mihika wrote the note the programme prints before this one, and it is read
     aloud on the recording: "Bach reminds me of waking up to rain..." */
  { kind: "video", src: "assets/video/violin/nbtb-2024-47-25.mp4",
    poster: "assets/img/violin-47-25.jpg",
    title: "Concerto for Two Violins, 1st movement",
    composer: "Johann Sebastian Bach",
    event: "Notes By the Bay, summer concert",
    year: 2024 },

  /* Three pieces from one CYS holiday concert upload (17 Dec 2021), each cued
     to its own segment. The titles for the second and third are read off the
     caption the broadcast puts on screen a few seconds in. The first piece is
     never captioned; its name comes from the printed programme for the 6:00 pm
     concert on 5 Dec 2021, which lists three Junior Strings pieces \u2014 Bach,
     Mozart and Smetana. The other two are identified from their captions, so
     the Bach is what is left:
     https://www.cys.org/events_tickets/detailed_event_pages/season70/21-22-dec-concert---allgroups.html

     Each poster is a frame lifted from its own segment rather than the one
     thumbnail YouTube serves for the whole upload, which would have made all
     three look identical. Two are the captioned frame; the first piece has no
     caption, so it gets a clear shot of the section instead. */

  { kind: "youtube", id: "ZcSBhGDM1jM", start: 134, end: 408,
    poster: "assets/img/video/cys/cys-2021-1.jpg",
    title: "Bach \u2014 Brandenburg Concerto No. 1, 1st movement",
    composer: "Johann Sebastian Bach",
    event: "California Youth Symphony \u2014 Junior Strings",
    year: 2021 },

  { kind: "youtube", id: "ZcSBhGDM1jM", start: 433, end: 757,
    poster: "assets/img/video/cys/cys-2021-2.jpg",
    title: "Themes from the Moldau",
    composer: "Bed\u0159ich Smetana, arr. Robert S. Frost",
    event: "California Youth Symphony \u2014 Junior Strings",
    year: 2021 },

  { kind: "youtube", id: "ZcSBhGDM1jM", start: 788, end: 1175,
    poster: "assets/img/video/cys/cys-2021-3.jpg",
    title: "Mozart \u2014 String Quartet K. 157, I. Allegro",
    composer: "Wolfgang Amadeus Mozart",
    event: "California Youth Symphony \u2014 Junior Strings",
    year: 2021 },

  // The two YouTube uploads previously shown here. Uncomment to restore.
  // { kind: "youtube", id: "3tVJi3btWMg", title: "Notes By the Bay Summer Concert",
  //   year: 2024, poster: "assets/img/video/notes-by-the-bay-2024.jpg" },
  // { kind: "youtube", id: "NPmJ12FU-SY", title: "Violin performance" },

];
