(() => {
"use strict";

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const palette = [
  ["#4c2db5", "#9c82ff"],
  ["#176c69", "#6dc2b2"],
  ["#98513f", "#e3a778"],
  ["#5143a9", "#b6a5ff"],
  ["#17607a", "#7bc9dd"],
  ["#8b3e72", "#dc8dbd"],
  ["#397452", "#a3d19a"]
];

const artists = [
  {id:"fried",name:"Avraham Fried",initials:"AF"},
  {id:"benny",name:"Benny Friedman",initials:"BF"},
  {id:"lemmer",name:"Shulem Lemmer",initials:"SL"},
  {id:"shwekey",name:"Yaakov Shwekey",initials:"YS"},
  {id:"motti",name:"Motti Steinmetz",initials:"MS"},
  {id:"michoel",name:"Michoel Schnitzler",initials:"MS"},
  {id:"dachs",name:"Dovid Dachs",initials:"DD"},
  {id:"eitan",name:"Eitan Katz",initials:"EK"}
];

const composers = [
  {id:"alter",name:"Alter Rebbe",initials:"AR"},
  {id:"maharash",name:"Rebbe Maharash",initials:"RM"},
  {id:"rashab",name:"Rebbe Rashab",initials:"RR"},
  {id:"frierdiker",name:"Frierdiker Rebbe",initials:"FR"},
  {id:"rebbe",name:"The Rebbe",initials:"TR"},
  {id:"chassidim",name:"Chabad Chassidim",initials:"CC"}
];

const songs = [
  {id:"s1",title:"Tzomah Nafshi",artist:"Avraham Fried",artistId:"fried",composer:"Alter Rebbe",initials:"TN"},
  {id:"s2",title:"Dalet Bavos",artist:"Shulem Lemmer",artistId:"lemmer",composer:"Rebbe Maharash",initials:"DB"},
  {id:"s3",title:"Rosh Chodesh Kislev",artist:"Benny Friedman",artistId:"benny",composer:"Rebbe Rashab",initials:"RK"},
  {id:"s4",title:"Hachana",artist:"Yaakov Shwekey",artistId:"shwekey",composer:"Frierdiker Rebbe",initials:"HA"},
  {id:"s5",title:"Niggun Simcha",artist:"Avraham Fried",artistId:"fried",composer:"The Rebbe",initials:"NS"},
  {id:"s6",title:"Yechidus",artist:"Shulem Lemmer",artistId:"lemmer",composer:"The Rebbe",initials:"YE"},
  {id:"s7",title:"Hu Elokeinu",artist:"Avraham Fried",artistId:"fried",composer:"Alter Rebbe",initials:"HE"},
  {id:"s8",title:"Four Bavos",artist:"Motti Steinmetz",artistId:"motti",composer:"Rebbe Maharash",initials:"FB"},
  {id:"s9",title:"Niggun Hachana",artist:"Avraham Fried",artistId:"fried",composer:"Rebbe Rashab",initials:"NH"},
  {id:"s10",title:"Rosh Chodesh",artist:"Yaakov Shwekey",artistId:"shwekey",composer:"Rebbe Rashab",initials:"RC"},
  {id:"s11",title:"Dveikus",artist:"Benny Friedman",artistId:"benny",composer:"Chabad Chassidim",initials:"DV"},
  {id:"s12",title:"Simcha",artist:"Michoel Schnitzler",artistId:"michoel",composer:"Frierdiker Rebbe",initials:"SI"}
];

const official = [
  {id:"op1",name:"Niggunim for Farbrengen",count:18},
  {id:"op2",name:"Chabad Classics",count:25},
  {id:"op3",name:"Deep Chabad",count:16},
  {id:"op4",name:"Niggunim of Dveikus",count:21},
  {id:"op5",name:"Simcha & Geulah",count:14}
];

const categories = [
  {name:"Farbrengen",sub:"Warm and uplifting"},
  {name:"Dveikus",sub:"Deep and soulful"},
  {name:"Simcha",sub:"Joyful niggunim"},
  {name:"Classic Niggunim",sub:"Timeless melodies"},
  {name:"Geulah",sub:"Hope and redemption"},
  {name:"Meditative",sub:"Quiet reflection"}
];

const read = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

let playlists = read("nc_playlists_v2", []);
let favorites = read("nc_favorites_v2", []);
let recent = read("nc_recent_v2", []);

let currentSong = songs[0];
let playing = false;
let elapsed = 0;
let tick = null;
let pendingSong = songs[0];
let screenStack = [];
let savedScroll = 0;

const color = i =>
  `style="--c1:${palette[i % palette.length][0]};--c2:${palette[i % palette.length][1]}"`;

const esc = s =>
  String(s).replace(/[&<>"']/g, c => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  }[c]));

function persist() {
  try {
    localStorage.setItem("nc_playlists_v2", JSON.stringify(playlists));
    localStorage.setItem("nc_favorites_v2", JSON.stringify(favorites));
    localStorage.setItem("nc_recent_v2", JSON.stringify(recent));
  } catch (error) {
    console.warn("Browser storage is unavailable.", error);
  }
}

function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.remove("hidden");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => element.classList.add("hidden"), 2400);
}

function songById(id) {
  return songs.find(song => song.id === id);
}

function cover(initials, i, extra = "") {
  return `<div class="cover ${extra}" ${color(i)}><span>${esc(initials)}</span></div>`;
}

function songCard(song, i) {
  return `
    <article class="music-card">
      <button class="cover-button" data-play="${song.id}" aria-label="Play ${esc(song.title)}" style="border:0;background:none;padding:0">
        ${cover(song.initials, i)}
      </button>
      <h3>${esc(song.title)}</h3>
      <div class="subline">${esc(song.artist)}</div>
      <div class="card-actions">
        <button class="tiny-action" data-add="${song.id}">＋ Add to Playlist</button>
        <button class="tiny-action ${favorites.includes(song.id) ? "active" : ""}" data-favorite="${song.id}">
          ♡ ${favorites.includes(song.id) ? "Favorited" : "Favorite"}
        </button>
      </div>
    </article>`;
}

function personCard(person, i, type) {
  return `
    <article class="music-card person-card">
      <button class="cover-button" data-person="${type}:${person.id}" aria-label="Open ${esc(person.name)}" style="border:0;background:none;padding:0">
        ${cover(person.initials, i)}
      </button>
      <h3>${esc(person.name)}</h3>
      <div class="subline">${type === "singer" ? "Singer" : "Composer"}</div>
    </article>`;
}

function chartRow(song, i, rank) {
  return `
    <div class="chart-row">
      <span class="rank">${rank}</span>
      <div class="mini-cover" ${color(i)}>${esc(song.initials)}</div>
      <div class="chart-info">
        <strong>${esc(song.title)}</strong>
        <span>${esc(song.artist)}</span>
      </div>
      <button class="play-small" data-play="${song.id}" aria-label="Play ${esc(song.title)}">▶</button>
    </div>`;
}

function playlistCard(playlist, i) {
  return `
    <article class="playlist-card">
      <div class="playlist-art" ${color(i)}>♫</div>
      <h3>${esc(playlist.name)}</h3>
      <p class="muted">${playlist.songIds.length} ${playlist.songIds.length === 1 ? "song" : "songs"}</p>
      <div class="playlist-card-actions">
        <button class="outline-button" data-open-playlist="${playlist.id}">Open</button>
        <button class="outline-button" data-edit-playlist="${playlist.id}" aria-label="Edit ${esc(playlist.name)}">•••</button>
      </div>
    </article>`;
}

function renderHome() {
  $("#composerRow").innerHTML =
    composers.map((person, i) => personCard(person, i, "composer")).join("");

  $("#topChart").innerHTML =
    songs.slice(0, 12).map((song, i) => chartRow(song, i, i + 1)).join("");

  $("#officialRow").innerHTML = official.map((playlist, i) => `
    <article class="playlist-card">
      <div class="playlist-art" ${color(i)}>♫</div>
      <h3>${esc(playlist.name)}</h3>
      <p class="muted">${playlist.count} songs · Official</p>
      <div class="playlist-card-actions">
        <button class="outline-button" data-open-official="${playlist.id}">Explore</button>
      </div>
    </article>`).join("");

  renderPlaylists();

  $("#singerRow").innerHTML =
    artists.map((person, i) => personCard(person, i, "singer")).join("");

  const recentSongs = recent.map(songById).filter(Boolean).slice(0, 12);
  const displayedRecent = recentSongs.length ? recentSongs : songs.slice(0, 12);

  $("#recentChart").innerHTML =
    displayedRecent.map((song, i) => chartRow(song, i, i + 1)).join("");

  $("#categoryRow").innerHTML = categories.map((category, i) => `
    <button class="category-card" ${color(i)} data-category="${esc(category.name)}">
      ${esc(category.name)}
    </button>`).join("");

  updateFeatured();
}

function renderPlaylists() {
  const row = $("#playlistRow");

  row.innerHTML = `
    <button class="create-playlist" id="createPlaylistOpen">
      <span class="plus">＋</span>
      <span>Create Your Playlist</span>
    </button>
  ` + (
    playlists.length
      ? playlists.map(playlistCard).join("")
      : `<div class="empty-state" style="min-width:230px">
           <h3>Your playlists live here</h3>
           <p>Create one even before adding songs.</p>
         </div>`
  );
}

function updateFeatured() {
  const song = songs[0];
  $("#featuredTitle").textContent = song.title;
  $("#featuredArtist").textContent = song.artist;
  $("#featuredFavorite").textContent =
    favorites.includes(song.id) ? "♥ Favorited" : "♡ Favorite";
}

function setSong(song, autoPlay = true) {
  currentSong = song;
  elapsed = 0;
  recent = [song.id, ...recent.filter(id => id !== song.id)].slice(0, 12);

  persist();
  updatePlayer();
  renderHome();

  $("#miniPlayer").classList.remove("hidden");

  if (autoPlay) {
    playing = true;
    startTicker();
  } else {
    playing = false;
    stopTicker();
  }

  updatePlayButtons();
}

function updatePlayer() {
  ["miniTitle", "fullTitle"].forEach(id => {
    $("#" + id).textContent = currentSong.title;
  });

  ["miniArtist", "fullArtist"].forEach(id => {
    $("#" + id).textContent = currentSong.artist;
  });

  $("#duration").textContent = "3:30";
  $("#elapsed").textContent = formatTime(elapsed);
  $("#progress").value = Math.min(100, elapsed / 210 * 100);
}

function formatTime(seconds) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function updatePlayButtons() {
  const symbol = playing ? "Ⅱ" : "▶";
  $("#miniPlay").textContent = symbol;
  $("#fullPlay").textContent = symbol;

  $("#featuredPlay").textContent =
    playing && currentSong.id === songs[0].id
      ? "Ⅱ Pause Niggun"
      : "▶ Play Niggun";
}

function startTicker() {
  stopTicker();

  tick = setInterval(() => {
    if (!playing) return;

    elapsed++;

    if (elapsed >= 210) {
      elapsed = 0;
      playing = false;
      stopTicker();
    }

    updatePlayer();
    updatePlayButtons();
  }, 1000);
}

function stopTicker() {
  if (tick) {
    clearInterval(tick);
    tick = null;
  }
}

function togglePlay() {
  playing = !playing;

  if (playing) {
    startTicker();
  } else {
    stopTicker();
  }

  updatePlayButtons();
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(item => item !== id);
  } else {
    favorites.push(id);
  }

  persist();
  renderHome();

  if (currentSong.id === id) {
    $("#fullFavorite").textContent =
      favorites.includes(id) ? "♥ Favorited" : "♡ Favorite";
  }

  toast(favorites.includes(id) ? "Added to My Favorites" : "Removed from My Favorites");
}

function showScreen(title, content, count = "") {
  savedScroll = window.scrollY;

  screenStack.push({
    title: $("#detailTitle").textContent,
    content: $("#detailContent").innerHTML,
    scroll: savedScroll
  });

  $("#homeScreen").classList.add("hidden");
  $("#detailScreen").classList.remove("hidden");

  $("#detailTitle").textContent = title;
  $("#detailContent").innerHTML = content;
  $("#detailCount").textContent = count;

  window.scrollTo(0, 0);
}

function backHome() {
  if (screenStack.length) screenStack.pop();

  $("#detailScreen").classList.add("hidden");
  $("#homeScreen").classList.remove("hidden");

  window.scrollTo(0, savedScroll);
}

function songList(songsToShow) {
  return `
    <div class="detail-list">
      ${
        songsToShow.length
          ? songsToShow.map((song, i) => chartRow(song, i, i + 1)).join("")
          : `<div class="empty-state">
               <h3>Nothing here yet</h3>
               <p>When you add music, it will appear here.</p>
             </div>`
      }
    </div>`;
}

function openView(view) {
  const views = {
    top: () => [
      "Top 12 of the Week",
      songList(songs.slice(0, 12)),
      "12 songs"
    ],

    recent: () => [
      "Recently Listened To",
      songList(recent.map(songById).filter(Boolean).slice(0, 12)),
      "Recently played"
    ],

    singers: () => [
      "Singers",
      `<div class="detail-list">${
        artists.map((person, i) => `
          <button class="chart-row" data-person="singer:${person.id}">
            <div class="mini-cover" ${color(i)}>${person.initials}</div>
            <div class="chart-info">
              <strong>${esc(person.name)}</strong>
              <span>Singer</span>
            </div>
            <span>›</span>
          </button>`).join("")
      }</div>`,
      `${artists.length} singers`
    ],

    composers: () => [
      "Composers",
      `<div class="detail-list">${
        composers.map((person, i) => `
          <button class="chart-row" data-person="composer:${person.id}">
            <div class="mini-cover" ${color(i)}>${person.initials}</div>
            <div class="chart-info">
              <strong>${esc(person.name)}</strong>
              <span>Composer</span>
            </div>
            <span>›</span>
          </button>`).join("")
      }</div>`,
      `${composers.length} composers`
    ],

    official: () => [
      "Chabad Niggunim Playlists",
      `<div class="detail-list">${
        official.map((playlist, i) => `
          <article class="playlist-card">
            <div class="playlist-art" ${color(i)}>♫</div>
            <div class="playlist-text">
              <h3>${esc(playlist.name)}</h3>
              <p class="muted">${playlist.count} songs · Official</p>
            </div>
            <div class="playlist-card-actions">
              <button class="outline-button" data-open-official="${playlist.id}">Explore</button>
            </div>
          </article>`).join("")
      }</div>`,
      `${official.length} playlists`
    ],

    playlists: () => [
      "My Own Playlists",
      `<div class="detail-list">
        <button class="create-playlist" id="createPlaylistOpen">
          <span class="plus">＋</span>
          Create Your Playlist
        </button>
        ${
          playlists.map((playlist, i) => `
            <article class="playlist-card">
              <div class="playlist-art" ${color(i)}>♫</div>
              <div class="playlist-text">
                <h3>${esc(playlist.name)}</h3>
                <p class="muted">${playlist.songIds.length} songs</p>
              </div>
              <div class="playlist-card-actions">
                <button class="outline-button" data-open-playlist="${playlist.id}">Open</button>
                <button class="outline-button" data-edit-playlist="${playlist.id}">Edit</button>
              </div>
            </article>`).join("")
        }
      </div>`,
      "Your private playlists"
    ],

    categories: () => [
      "Categories",
      `<div class="horizontal">${
        categories.map((category, i) => `
          <button class="category-card" ${color(i)} data-category="${esc(category.name)}">
            ${esc(category.name)}
          </button>`).join("")
      }</div>`,
      "Browse by mood"
    ]
  };

  if (views[view]) {
    const [title, content, count] = views[view]();
    showScreen(title, content, count);
  }
}

function openPerson(key) {
  const [type, id] = key.split(":");

  if (type === "singer") {
    const person = artists.find(item => item.id === id);
    if (!person) return;

    showScreen(
      person.name,
      songList(songs.filter(song => song.artistId === id)),
      "Songs by this singer"
    );
  } else {
    const person = composers.find(item => item.id === id);
    if (!person) return;

    showScreen(
      person.name,
      songList(songs.filter(song => song.composer === person.name)),
      "Niggunim by this composer"
    );
  }
}

function openPlaylist(id) {
  const playlist = playlists.find(item => item.id === id);
  if (!playlist) return;

  showScreen(
    playlist.name,
    `<div class="detail-toolbar">
       <button class="outline-button" data-edit-playlist="${playlist.id}">Edit Playlist</button>
     </div>
     ${songList(playlist.songIds.map(songById).filter(Boolean))}`,
    `${playlist.songIds.length} songs`
  );
}

function openOfficial(id) {
  const playlist = official.find(item => item.id === id);

  if (playlist) {
    showScreen(
      playlist.name,
      songList(songs.slice(0, Math.min(playlist.count, 12))),
      `${playlist.count} songs · Preview`
    );
  }
}

function openCategory(name) {
  const categoryIndex = categories.findIndex(category => category.name === name);

  showScreen(
    name,
    songList(songs.filter((song, i) => i % categories.length === categoryIndex)),
    "Niggunim"
  );
}

function openOverlay(id) {
  $(id).classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeOverlay(id) {
  $(id).classList.add("hidden");

  if (!$(".overlay:not(.hidden)")) {
    document.body.style.overflow = "";
  }
}

function openAdd(id) {
  pendingSong = songById(id) || currentSong;

  const content = $("#playlistDialogContent");

  content.innerHTML = playlists.length
    ? playlists.map(playlist => `
        <button class="playlist-choice" data-choose-playlist="${playlist.id}">
          <span>
            ${esc(playlist.name)}
            <small class="muted"> · ${playlist.songIds.length} songs</small>
          </span>
          <b>＋</b>
        </button>`).join("")
    : `<div class="empty-state">
         <h3>No playlists yet</h3>
         <p>Create a playlist first. You can add songs later.</p>
       </div>`;

  content.insertAdjacentHTML(
    "beforeend",
    `<button class="primary-button full-button" id="createFromAdd">＋ Create a Playlist</button>`
  );

  openOverlay("#playlistOverlay");
}

function createPlaylist(name) {
  const clean = name.trim();
  if (!clean) return;

  playlists.push({
    id: "pl_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name: clean,
    songIds: []
  });

  persist();
  renderHome();

  closeOverlay("#createOverlay");
  closeOverlay("#playlistOverlay");

  renderCurrentDetail();
  toast("Playlist created");
}

function renderCurrentDetail() {
  if (!$("#detailScreen").classList.contains("hidden")) {
    const title = $("#detailTitle").textContent;

    if (title === "My Own Playlists") {
      openView("playlists");
    } else {
      const playlist = playlists.find(item => item.name === title);
      if (playlist) openPlaylist(playlist.id);
    }
  }
}

function editPlaylist(id) {
  const playlist = playlists.find(item => item.id === id);
  if (!playlist) return;

  $("#editPlaylistId").value = id;
  $("#editPlaylistName").value = playlist.name;

  openOverlay("#editOverlay");
}

function deletePlaylist() {
  const id = $("#editPlaylistId").value;
  const playlist = playlists.find(item => item.id === id);

  if (!playlist) return;

  if (!confirm(`Delete "${playlist.name}"? This cannot be undone.`)) return;

  playlists = playlists.filter(item => item.id !== id);

  persist();
  closeOverlay("#editOverlay");
  renderHome();

  if (!$("#detailScreen").classList.contains("hidden")) {
    openView("playlists");
  }

  toast("Playlist deleted");
}

function updateSearch() {
  const query = $("#searchInput").value.trim().toLowerCase();
  const target = $("#searchResults");

  if (!query) {
    target.innerHTML = '<p class="muted">Start typing to find music.</p>';
    return;
  }

  const songMatches = songs.filter(song =>
    (song.title + " " + song.artist + " " + song.composer).toLowerCase().includes(query)
  );

  const singerMatches = artists.filter(person =>
    person.name.toLowerCase().includes(query)
  );

  const composerMatches = composers.filter(person =>
    person.name.toLowerCase().includes(query)
  );

  target.innerHTML = [
    ...songMatches.map(song => `
      <button class="result-row" data-play="${song.id}">
        <div class="mini-cover" ${color(songs.indexOf(song))}>${song.initials}</div>
        <div>
          <strong>${esc(song.title)}</strong>
          <small>${esc(song.artist)} · Niggun</small>
        </div>
        <span>▶</span>
      </button>`),

    ...singerMatches.map(person => `
      <button class="result-row" data-person="singer:${person.id}">
        <div class="mini-cover" ${color(1)}>${person.initials}</div>
        <div>
          <strong>${esc(person.name)}</strong>
          <small>Singer</small>
        </div>
        <span>›</span>
      </button>`),

    ...composerMatches.map(person => `
      <button class="result-row" data-person="composer:${person.id}">
        <div class="mini-cover" ${color(2)}>${person.initials}</div>
        <div>
          <strong>${esc(person.name)}</strong>
          <small>Composer</small>
        </div>
        <span>›</span>
      </button>`)
  ].join("") || '<p class="muted">No results found. Try another search.</p>';
}

function openSearch() {
  savedScroll = window.scrollY;
  $("#searchInput").value = "";
  updateSearch();
  openOverlay("#searchOverlay");

  setTimeout(() => {
    $("#searchInput").focus({ preventScroll: true });
  }, 50);
}

function openFullPlayer() {
  updatePlayer();
  $("#fullFavorite").textContent =
    favorites.includes(currentSong.id) ? "♥ Favorited" : "♡ Favorite";

  openOverlay("#fullPlayer");
}

document.addEventListener("click", event => {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.matches("[data-home]")) {
    screenStack = [];
    $("#detailScreen").classList.add("hidden");
    $("#homeScreen").classList.remove("hidden");
    window.scrollTo(0, 0);
    return;
  }

  if (target.dataset.view) {
    openView(target.dataset.view);
    return;
  }

  if (target.dataset.play) {
    const song = songById(target.dataset.play);
    if (song) setSong(song, true);
    return;
  }

  if (target.dataset.favorite) {
    toggleFavorite(target.dataset.favorite);
    return;
  }

  if (target.dataset.add) {
    openAdd(target.dataset.add);
    return;
  }

  if (target.dataset.person) {
    openPerson(target.dataset.person);
    return;
  }

  if (target.dataset.openPlaylist) {
    openPlaylist(target.dataset.openPlaylist);
    return;
  }

  if (target.dataset.editPlaylist) {
    editPlaylist(target.dataset.editPlaylist);
    return;
  }

  if (target.dataset.choosePlaylist) {
    const playlist = playlists.find(item => item.id === target.dataset.choosePlaylist);

    if (playlist && !playlist.songIds.includes(pendingSong.id)) {
      playlist.songIds.push(pendingSong.id);
      persist();
      renderHome();
      toast(`Added to ${playlist.name}`);
    } else if (playlist) {
      toast("Already in that playlist");
    }

    closeOverlay("#playlistOverlay");
    return;
  }

  if (target.dataset.openOfficial) {
    openOfficial(target.dataset.openOfficial);
    return;
  }

  if (target.dataset.category) {
    openCategory(target.dataset.category);
    return;
  }

  if (target.hasAttribute("data-close-search")) {
    closeOverlay("#searchOverlay");
    window.scrollTo(0, savedScroll);
    return;
  }

  if (target.hasAttribute("data-close-playlist")) {
    closeOverlay("#playlistOverlay");
    return;
  }

  if (target.hasAttribute("data-close-create")) {
    closeOverlay("#createOverlay");
    return;
  }

  if (target.hasAttribute("data-close-edit")) {
    closeOverlay("#editOverlay");
    return;
  }

  if (target.hasAttribute("data-close-account")) {
    closeOverlay("#accountOverlay");
    return;
  }

  if (target.id === "createPlaylistOpen" || target.id === "createFromAdd") {
    closeOverlay("#playlistOverlay");
    $("#playlistName").value = "";
    openOverlay("#createOverlay");
    return;
  }

  if (target.id === "searchOpen") {
    openSearch();
    return;
  }

  if (target.id === "createAccount" || target.id === "accountButton") {
    openOverlay("#accountOverlay");
    return;
  }

  if (target.id === "backHome") {
    backHome();
    return;
  }

  if (target.id === "featuredPlay") {
    if (currentSong.id === songs[0].id) {
      togglePlay();
    } else {
      setSong(songs[0], true);
    }
    return;
  }

  if (target.id === "featuredFavorite") {
    toggleFavorite(songs[0].id);
    return;
  }

  if (target.id === "featuredAdd") {
    openAdd(songs[0].id);
    return;
  }

  if (target.id === "miniPlay" || target.id === "fullPlay") {
    togglePlay();
    return;
  }

  if (target.id === "miniPrev" || target.id === "fullPrev") {
    const index = songs.findIndex(song => song.id === currentSong.id);
    setSong(songs[(index - 1 + songs.length) % songs.length], true);
    return;
  }

  if (target.id === "miniNext" || target.id === "fullNext") {
    const index = songs.findIndex(song => song.id === currentSong.id);
    setSong(songs[(index + 1) % songs.length], true);
    return;
  }

  if (target.id === "playerExpand") {
    openFullPlayer();
    return;
  }

  if (target.id === "minimizePlayer" || target.id === "closeFullPlayer") {
    closeOverlay("#fullPlayer");
    return;
  }

  if (target.id === "fullFavorite") {
    toggleFavorite(currentSong.id);
    return;
  }

  if (target.id === "openFavorites") {
    closeOverlay("#accountOverlay");
    showScreen(
      "My Favorites",
      songList(favorites.map(songById).filter(Boolean)),
      "Saved favorites"
    );
    return;
  }

  if (target.id === "openLibrary") {
    closeOverlay("#accountOverlay");
    showScreen(
      "Library",
      songList(recent.map(songById).filter(Boolean)),
      "Your recently played music"
    );
    return;
  }

  if (target.id === "deletePlaylistButton") {
    deletePlaylist();
  }
});

$("#createPlaylistForm").addEventListener("submit", event => {
  event.preventDefault();
  createPlaylist($("#playlistName").value);
});

$("#editPlaylistForm").addEventListener("submit", event => {
  event.preventDefault();

  const playlist = playlists.find(item => item.id === $("#editPlaylistId").value);
  if (!playlist) return;

  playlist.name = $("#editPlaylistName").value.trim();

  persist();
  closeOverlay("#editOverlay");
  renderHome();
  renderCurrentDetail();
  toast("Playlist renamed");
});

$("#searchInput").addEventListener("input", updateSearch);

$("#progress").addEventListener("input", event => {
  elapsed = Number(event.target.value) / 100 * 210;
  updatePlayer();
});

["#searchOverlay", "#playlistOverlay", "#createOverlay", "#editOverlay", "#accountOverlay"]
  .forEach(selector => {
    $(selector).addEventListener("click", event => {
      if (event.target === $(selector)) {
        closeOverlay(selector);

        if (selector === "#searchOverlay") {
          window.scrollTo(0, savedScroll);
        }
      }
    });
  });

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    const searchWasOpen = !$("#searchOverlay").classList.contains("hidden");

    $$(".overlay:not(.hidden)").forEach(element => {
      closeOverlay("#" + element.id);
    });

    if (searchWasOpen) {
      window.scrollTo(0, savedScroll);
    }
  }
});

renderHome();
updatePlayer();

})();
