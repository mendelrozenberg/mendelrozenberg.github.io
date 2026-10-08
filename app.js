"use strict";

/* ---------------------------------------
   NIGGUNEICHABAD
   Main website functionality
--------------------------------------- */

const songs = [
  { id: 1, title: "Tzama Lecha Nafshi", artist: "Chabad Niggunim", composer: "Traditional", category: "Deep Niggunim", audio: "" },
  { id: 2, title: "Daled Bavos", artist: "Chabad Niggunim", composer: "Traditional", category: "Chabad Classics", audio: "" },
  { id: 3, title: "Keili Ata", artist: "Chabad Niggunim", composer: "Traditional", category: "Davening", audio: "" },
  { id: 4, title: "Rachamana D'onei", artist: "Chabad Niggunim", composer: "Traditional", category: "Farbrengen", audio: "" },
  { id: 5, title: "Shamil", artist: "Chabad Niggunim", composer: "Traditional", category: "Chabad Classics", audio: "" },
  { id: 6, title: "Nyet Nyet Nikavo", artist: "Chabad Niggunim", composer: "Traditional", category: "Freilach", audio: "" },
  { id: 7, title: "Hu Elokeinu", artist: "Chabad Niggunim", composer: "Traditional", category: "Davening", audio: "" },
  { id: 8, title: "Tzomo Lecho Nafshi", artist: "Chabad Niggunim", composer: "Traditional", category: "Deep Niggunim", audio: "" },
  { id: 9, title: "Ani Maamin", artist: "Chabad Niggunim", composer: "Traditional", category: "Emotional", audio: "" },
  { id: 10, title: "Ki Anu Amecha", artist: "Chabad Niggunim", composer: "Traditional", category: "Davening", audio: "" },
  { id: 11, title: "Utzu Eitza", artist: "Chabad Niggunim", composer: "Traditional", category: "Chabad Classics", audio: "" },
  { id: 12, title: "V'Hi She'amda", artist: "Chabad Niggunim", composer: "Traditional", category: "Emotional", audio: "" },
  { id: 13, title: "Hoshia Es Amecha", artist: "Chabad Niggunim", composer: "Traditional", category: "Farbrengen", audio: "" },
  { id: 14, title: "Simcha Niggun", artist: "Chabad Niggunim", composer: "Traditional", category: "Freilach", audio: "" },
  { id: 15, title: "Niggun Hisvaadus", artist: "Chabad Niggunim", composer: "Traditional", category: "Farbrengen", audio: "" },
  { id: 16, title: "Lchaim Velivracha", artist: "Chabad Niggunim", composer: "Traditional", category: "Freilach", audio: "" },
  { id: 17, title: "Avinu Malkeinu", artist: "Chabad Niggunim", composer: "Traditional", category: "Davening", audio: "" },
  { id: 18, title: "Tzama Lecha Nafshi (Live)", artist: "Chabad Niggunim", composer: "Traditional", category: "Deep Niggunim", audio: "" }
];

const composers = [
  "Alter Rebbe",
  "Mitteler Rebbe",
  "Tzemach Tzedek",
  "Rebbe Maharash",
  "Rebbe Rashab",
  "Frierdiker Rebbe",
  "Lubavitcher Rebbe"
];

const singers = [
  "Avraham Fried",
  "Yossi Green",
  "Shulem Lemmer",
  "Benny Friedman",
  "Yeedle",
  "Mordechai Ben David",
  "Chabad Choir"
];

const categories = [
  "Chabad Classics",
  "Deep Niggunim",
  "Farbrengen",
  "Freilach",
  "Davening",
  "Emotional",
  "Niggunim of the Rebbe",
  "Traditional"
];

const officialPlaylists = [
  "Niggunim of the Rebbe",
  "Farbrengen Favorites",
  "Chabad Classics",
  "Deep Niggunim"
];

/* ---------------------------------------
   SAVED BROWSER DATA
--------------------------------------- */

function readSaved(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    showToast("Your browser couldn't save this change.");
  }
}

let favorites = readSaved("nc-favorites", []);
let playlists = readSaved("nc-playlists", []);
let recentlyPlayed = readSaved("nc-recent", []);
let currentPage = "home";
let currentSongId = null;
let searchTerm = "";
let currentCollection = null;
let currentPlaylistId = null;

const $ = (selector) => document.querySelector(selector);
const main = $("#mainContent");
const audio = $("#audioElement");

/* ---------------------------------------
   GENERAL HELPERS
--------------------------------------- */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function getSong(id) {
  return songs.find(song => song.id === Number(id));
}

function getCurrentSong() {
  return getSong(currentSongId);
}

function showToast(message) {
  document.querySelector(".toast")?.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2800);
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);

  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function pageHeading(title, subtitle = "") {
  return `
    <div class="page-heading">
      <h1>${escapeHTML(title)}</h1>
      ${subtitle ? `<p>${escapeHTML(subtitle)}</p>` : ""}
    </div>
  `;
}

function sectionHeading(title, subtitle, page) {
  return `
    <div class="section-heading">
      <div>
        <h2>${escapeHTML(title)}</h2>
        ${subtitle ? `<p>${escapeHTML(subtitle)}</p>` : ""}
      </div>
      <button class="text-button" data-page="${escapeHTML(page)}">
        See all →
      </button>
    </div>
  `;
}

/* ---------------------------------------
   SONG LISTS AND MUSIC CARDS
--------------------------------------- */

function songRow(song, index, showNumber = true) {
  const isFavorite = favorites.includes(song.id);

  return `
    <div class="song-row">
      ${showNumber ? `<span class="song-number">${index + 1}</span>` : ""}

      <button class="song-cover" data-play="${song.id}"
              aria-label="Play ${escapeHTML(song.title)}">♫</button>

      <div class="song-info">
        <strong>${escapeHTML(song.title)}</strong>
        <span>${escapeHTML(song.artist)}</span>
      </div>

      <button class="icon-button ${isFavorite ? "is-favorite" : ""}"
              data-favorite="${song.id}"
              aria-label="${isFavorite ? "Remove from" : "Add to"} favorites">
        ${isFavorite ? "♥" : "♡"}
      </button>
    </div>
  `;
}

function songChart(list) {
  return `
    <div class="song-chart">
      ${list.map((song, index) => songRow(song, index)).join("")}
    </div>
  `;
}

function circleItem(name, type, index) {
  const symbols = ["♫", "♪", "♬", "♩", "𝄞", "✦", "♪"];
  const symbol = symbols[index % symbols.length];

  return `
    <button class="circle-item"
            data-collection="${escapeHTML(type)}"
            data-name="${escapeHTML(name)}">
      <span class="circle-art">${symbol}</span>
      <strong>${escapeHTML(name)}</strong>
      <small>${escapeHTML(type === "composer" ? "Composer" :
                           type === "singer" ? "Singer" :
                           type === "category" ? "Category" : "Collection")}</small>
    </button>
  `;
}

function circleSection(items, type) {
  return `
    <div class="circle-grid">
      ${items.slice(0, 7).map((name, index) =>
        circleItem(name, type, index)
      ).join("")}
    </div>
  `;
}

function singerSection() {
  return `
    <div class="singer-list">
      ${singers.slice(0, 6).map((name, index) => `
        <button class="singer-row"
                data-collection="singer"
                data-name="${escapeHTML(name)}">
          <span class="singer-avatar">${["♫", "♪", "♬"][index % 3]}</span>
          <span>
            <strong>${escapeHTML(name)}</strong>
            <small>Singer</small>
          </span>
        </button>
      `).join("")}
    </div>
  `;
}

function categorySection() {
  return `
    <div class="category-grid">
      ${categories.slice(0, 8).map((name, index) => `
        <button class="category-card"
                data-collection="category"
                data-name="${escapeHTML(name)}">
          <span>${["♫", "♪", "♬", "✦"][index % 4]}</span>
          ${escapeHTML(name)}
        </button>
      `).join("")}
    </div>
  `;
}

/* ---------------------------------------
   HOMEPAGE
--------------------------------------- */

function renderHome() {
  const weekly = songs.slice(0, 7);
  const topSongs = songs.slice(0, 12);
  const recentSongs = recentlyPlayed
    .map(id => getSong(id))
    .filter(Boolean)
    .slice(0, 12);

  main.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow">WELCOME TO NIGGUNEICHABAD</span>
        <h1>The home of Chabad niggunim.</h1>
        <p>Discover melodies, explore composers, and find niggunim for every moment.</p>
        <button class="button button-primary" data-page="weekly">
          Explore niggunim →
        </button>
      </div>
      <div class="hero-art" aria-hidden="true">♫</div>
    </section>

    <section class="section">
      ${sectionHeading("Niggunim of the Week", "Melodies to discover", "weekly")}
      ${circleSection(weekly.map(song => song.title), "song")}
    </section>

    <section class="section">
      ${sectionHeading("Composers", "Explore the people behind the melodies", "composers")}
      ${circleSection(composers, "composer")}
    </section>

    <section class="section">
      ${sectionHeading("Top 12 of the Week", "Featured niggunim", "top12")}
      ${songChart(topSongs)}
    </section>

    <section class="section">
      ${sectionHeading("Chabad Niggunim Playlists", "Collections selected for you", "official")}
      ${circleSection(officialPlaylists, "official")}
    </section>

    <section class="section">
      ${sectionHeading("My Own Playlists", "Your personal collections", "playlists")}
      ${playlists.length
        ? playlistCards(playlists.slice(0, 7))
        : `<div class="empty-state">
             <span>♫</span>
             <h2>Create your own playlist</h2>
             <p>Collect the niggunim you love in your own private playlists.</p>
             <button class="button button-primary" data-action="create-playlist">
               + Create your playlist
             </button>
           </div>`}
    </section>

    <section class="section">
      ${sectionHeading("Singers", "Discover performers", "singers")}
      ${singerSection()}
    </section>

    <section class="section">
      ${sectionHeading("Recently Listened To", "Your listening history", "recent")}
      ${recentSongs.length
        ? songChart(recentSongs)
        : `<div class="empty-state">
             <span>♫</span>
             <h2>Your listening history starts here</h2>
             <p>When you choose a niggun, it will appear in this section.</p>
           </div>`}
    </section>

    <section class="section">
      ${sectionHeading("Categories", "Find the right niggun for the moment", "categories")}
      ${categorySection()}
    </section>
  `;

  setActiveNav("home");
}

/* ---------------------------------------
   COLLECTION AND DETAIL PAGES
--------------------------------------- */

function renderSongPage(title, list, subtitle = "") {
  main.innerHTML = `
    ${pageHeading(title, subtitle)}
    ${list.length
      ? songChart(list)
      : `<div class="empty-state">
           <span>♫</span>
           <h2>No niggunim here yet</h2>
           <p>This collection doesn't have any songs to show yet.</p>
         </div>`}
  `;
}

function renderCollection(name, type) {
  let list = [];

  if (type === "song") {
    const selected = songs.find(song => song.title === name);
    if (selected) {
      playSong(selected.id);
      return;
    }
  } else if (type === "category") {
    list = songs.filter(song => song.category === name);
  } else if (type === "composer") {
    list = songs.filter(song => song.composer === name);
  } else if (type === "singer") {
    list = songs.filter(song => song.artist === name);
  } else if (type === "official") {
    list = songs.filter(song =>
      name === "Chabad Classics"
        ? song.category === "Chabad Classics"
        : name === "Deep Niggunim"
          ? song.category === "Deep Niggunim"
          : name === "Farbrengen Favorites"
            ? song.category === "Farbrengen"
            : true
    );
  }

  currentCollection = { name, type };

  main.innerHTML = `
    ${pageHeading(name, `${type === "category" ? "Category" :
                           type === "composer" ? "Composer" :
                           type === "singer" ? "Singer" :
                           "Chabad Niggunim"}`)}
    <div class="page-toolbar">
      <span>${list.length} niggunim</span>
      <button class="button button-light" data-page="home">← Home</button>
    </div>
    ${list.length
      ? songChart(list)
      : `<div class="empty-state">
           <span>♫</span>
           <h2>More music coming soon</h2>
           <p>This collection is ready for songs to be added.</p>
         </div>`}
  `;

  setActiveNav("");
}

function playlistCards(list) {
  return `
    <div class="playlist-grid">
      ${list.map(playlist => `
        <div class="playlist-card">
          <div class="playlist-card-art">♫</div>
          <h3>${escapeHTML(playlist.name)}</h3>
          <p>${playlist.songIds.length} songs · Private playlist</p>
          <button class="button button-light"
                  data-open-playlist="${playlist.id}">
            Open playlist
          </button>
        </div>
      `).join("")}
    </div>
  `;
}

function renderPlaylists() {
  main.innerHTML = `
    ${pageHeading("My Playlists", "Your personal music collections stay in this browser.")}
    <div class="page-toolbar">
      <span>${playlists.length} playlists</span>
      <button class="button button-primary" data-action="create-playlist">
        + Create playlist
      </button>
    </div>
    ${playlists.length
      ? playlistCards(playlists)
      : `<div class="empty-state">
           <span>♫</span>
           <h2>Your playlists, your way</h2>
           <p>Create a playlist, give it a name, and add songs whenever you like.</p>
           <button class="button button-primary" data-action="create-playlist">
             Create your first playlist
           </button>
         </div>`}
  `;

  setActiveNav("playlists");
}

function renderPlaylist(id) {
  const playlist = playlists.find(item => item.id === id);
  if (!playlist) return renderPlaylists();

  currentPlaylistId = id;
  const list = playlist.songIds.map(getSong).filter(Boolean);

  main.innerHTML = `
    ${pageHeading(playlist.name, "Your private playlist")}
    <div class="page-toolbar">
      <button class="button button-light" data-page="playlists">← My Playlists</button>
      <button class="button button-light"
              data-action="delete-playlist"
              data-id="${playlist.id}">
        Delete playlist
      </button>
    </div>

    <section class="section">
      <h2>Add a niggun</h2>
      <p>Choose a song below to add it to this playlist.</p>
      ${songChart(songs.filter(song => !playlist.songIds.includes(song.id)))}
    </section>

    <section class="section">
      <h2>Songs in this playlist (${list.length})</h2>
      ${list.length
        ? `<div class="song-chart">
            ${list.map((song, index) => `
              <div>
                ${songRow(song, index, false)}
                <button class="text-button"
                        data-remove-from-playlist="${song.id}"
                        data-id="${playlist.id}">
                  Remove from playlist
                </button>
              </div>
            `).join("")}
           </div>`
        : `<div class="empty-state">
             <span>♫</span>
             <h2>This playlist is empty</h2>
             <p>Add some niggunim from the list above.</p>
           </div>`}
    </section>
  `;

  setActiveNav("playlists");
}

/* ---------------------------------------
   SEARCH
--------------------------------------- */

function renderSearch(query = "") {
  const normalized = query.trim().toLowerCase();

  const results = normalized
    ? songs.filter(song =>
        `${song.title} ${song.artist} ${song.composer} ${song.category}`
          .toLowerCase()
          .includes(normalized)
      )
    : songs;

  main.innerHTML = `
    ${pageHeading("Search", "Find niggunim by title, singer, composer, or category.")}
    <label class="search page-search">
      <span aria-hidden="true">⌕</span>
      <input id="pageSearchInput" type="search"
             placeholder="What would you like to hear?"
             value="${escapeHTML(query)}"
             aria-label="Search all music">
    </label>
    <p>${normalized ? `${results.length} results` : "Browse all available niggunim"}</p>
    ${songChart(results)}
  `;

  setActiveNav("search");

  const input = $("#pageSearchInput");
  input?.addEventListener("input", event => {
    const cursor = event.target.selectionStart;
    renderSearch(event.target.value);
    const replacement = $("#pageSearchInput");
    replacement?.focus();
    replacement?.setSelectionRange(cursor, cursor);
  });
}

function renderLibrary() {
  const list = favorites.map(getSong).filter(Boolean);

  main.innerHTML = `
    ${pageHeading("Your Library", "Niggunim you've saved to your favorites.")}
    ${list.length
      ? songChart(list)
      : `<div class="empty-state">
           <span>♡</span>
           <h2>Your favorites live here</h2>
           <p>Press the heart beside a niggun to save it to your library.</p>
           <button class="button button-primary" data-page="home">Explore music</button>
         </div>`}
  `;

  setActiveNav("library");
}

/* ---------------------------------------
   NAVIGATION
--------------------------------------- */

function setActiveNav(page) {
  document.querySelectorAll("[data-page]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === page
    );
  });
}

function navigate(page) {
  currentPage = page;
  currentCollection = null;
  currentPlaylistId = null;

  if (page === "home") {
    renderHome();
  } else if (page === "search") {
    renderSearch(searchTerm);
  } else if (page === "library") {
    renderLibrary();
  } else if (page === "playlists") {
    renderPlaylists();
  } else if (page === "weekly") {
    renderSongPage("Niggunim of the Week", songs.slice(0, 7),
      "A selection of niggunim to explore.");
    setActiveNav("weekly");
  } else if (page === "top12") {
    renderSongPage("Top 12 of the Week", songs.slice(0, 12),
      "Featured niggunim. Real listening-based rankings can be added with a backend.");
    setActiveNav("top12");
  } else if (page === "recent") {
    renderSongPage("Recently Listened To",
      recentlyPlayed.map(getSong).filter(Boolean).slice(0, 12),
      "Your recent listening history.");
  } else if (page === "composers") {
    main.innerHTML = `${pageHeading("Composers", "Explore Chabad composers.")}${circleSection(composers, "composer")}`;
    setActiveNav("composers");
  } else if (page === "singers") {
    main.innerHTML = `${pageHeading("Singers", "Explore performers.")}${singerSection()}`;
    setActiveNav("singers");
  } else if (page === "categories") {
    main.innerHTML = `${pageHeading("Categories", "Browse niggunim by category.")}${categorySection()}`;
    setActiveNav("categories");
  } else if (page === "official") {
    main.innerHTML = `${pageHeading("Chabad Niggunim Playlists", "Curated music collections.")}${circleSection(officialPlaylists, "official")}`;
    setActiveNav("");
  } else {
    renderHome();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------------------------------------
   FAVORITES
--------------------------------------- */

function toggleFavorite(id) {
  id = Number(id);

  if (favorites.includes(id)) {
    favorites = favorites.filter(item => item !== id);
    showToast("Removed from your favorites.");
  } else {
    favorites.push(id);
    showToast("Added to your favorites.");
  }

  saveData("nc-favorites", favorites);

  if (currentPage === "library") {
    renderLibrary();
  } else if (currentPage === "home") {
    renderHome();
  } else if (currentPage === "playlists") {
    if (currentPlaylistId) renderPlaylist(currentPlaylistId);
    else renderPlaylists();
  } else if (currentPage === "search") {
    renderSearch(searchTerm);
  } else if (currentCollection) {
    renderCollection(currentCollection.name, currentCollection.type);
  } else {
    navigate(currentPage);
  }

  updatePlayerFavorite();
}

/* ---------------------------------------
   PLAYER
--------------------------------------- */

function playSong(id) {
  const song = getSong(id);
  if (!song) return;

  currentSongId = song.id;

  recentlyPlayed = [
    song.id,
    ...recentlyPlayed.filter(item => item !== song.id)
  ].slice(0, 12);

  saveData("nc-recent", recentlyPlayed);

  $("#playerBar").hidden = false;
  $("#playerTitle").textContent = song.title;
  $("#playerArtist").textContent = song.artist;
  $("#playerCover").textContent = "♫";

  if (song.audio) {
    audio.src = song.audio;
    audio.play().then(() => {
      $("#playPauseBtn").textContent = "Ⅱ";
    }).catch(() => {
      $("#playPauseBtn").textContent = "▶";
      showToast("Press play to try again.");
    });
  } else {
    audio.pause();
    audio.removeAttribute("src");
    $("#playPauseBtn").textContent = "▶";
    $("#currentTime").textContent = "0:00";
    $("#duration").textContent = "0:00";
    $("#progress").value = 0;
    showToast("This song needs an audio file before it can play.");
  }

  updatePlayerFavorite();
}

function togglePlayback() {
  const song = getCurrentSong();
  if (!song) {
    showToast("Choose a niggun first.");
    return;
  }

  if (!song.audio) {
    showToast("This niggun needs an audio URL before it can play.");
    return;
  }

  if (audio.paused) {
    audio.play().catch(() => showToast("Couldn't play this audio file."));
  } else {
    audio.pause();
  }
}

function playNext(direction) {
  const currentIndex = songs.findIndex(song => song.id === currentSongId);
  const nextIndex = currentIndex < 0
    ? 0
    : (currentIndex + direction + songs.length) % songs.length;

  playSong(songs[nextIndex].id);
}

function updatePlayerFavorite() {
  const button = $("#playerFavorite");
  if (!button || !currentSongId) return;

  const isFavorite = favorites.includes(currentSongId);
  button.textContent = isFavorite ? "♥" : "♡";
  button.classList.toggle("is-favorite", isFavorite);
}

audio.addEventListener("play", () => {
  $("#playPauseBtn").textContent = "Ⅱ";
});

audio.addEventListener("pause", () => {
  $("#playPauseBtn").textContent = "▶";
});

audio.addEventListener("loadedmetadata", () => {
  $("#duration").textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  $("#currentTime").textContent = formatTime(audio.currentTime);

  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    $("#progress").value = (audio.currentTime / audio.duration) * 100;
  }
});

audio.addEventListener("ended", () => playNext(1));

$("#progress").addEventListener("input", event => {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (Number(event.target.value) / 100) * audio.duration;
  }
});

/* ---------------------------------------
   PLAYLISTS
--------------------------------------- */

function createPlaylist() {
  openModal("Create a playlist", `
    <form id="createPlaylistForm">
      <label for="playlistName">Playlist name</label>
      <input id="playlistName" name="playlistName"
             maxlength="70" required
             placeholder="e.g. My favorite niggunim">
      <p class="modal-note">
        This playlist is saved in this browser. It is not yet connected
        to an online account.
      </p>
      <button class="button button-primary full-width" type="submit">
        Create playlist
      </button>
    </form>
  `);

  $("#createPlaylistForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = $("#playlistName").value.trim();
    if (!name) return;

    const playlist = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name,
      songIds: []
    };

    playlists.push(playlist);
    saveData("nc-playlists", playlists);
    closeModal();
    renderPlaylist(playlist.id);
    showToast("Playlist created!");
  });
}

function addSongToPlaylist(playlistId, songId) {
  const playlist = playlists.find(item => item.id === playlistId);
  if (!playlist) return;

  songId = Number(songId);

  if (!playlist.songIds.includes(songId)) {
    playlist.songIds.push(songId);
    saveData("nc-playlists", playlists);
    showToast("Added to playlist.");
  }

  renderPlaylist(playlistId);
}

function removeSongFromPlaylist(playlistId, songId) {
  const playlist = playlists.find(item => item.id === playlistId);
  if (!playlist) return;

  playlist.songIds = playlist.songIds.filter(id => id !== Number(songId));
  saveData("nc-playlists", playlists);
  renderPlaylist(playlistId);
  showToast("Removed from playlist.");
}

function deletePlaylist(id) {
  if (!confirm("Delete this playlist? This cannot be undone.")) return;

  playlists = playlists.filter(item => item.id !== id);
  saveData("nc-playlists", playlists);
  renderPlaylists();
  showToast("Playlist deleted.");
}

/* ---------------------------------------
   SIMPLE MODALS
--------------------------------------- */

function openModal(title, content) {
  $("#modalRoot").innerHTML = `
    <div class="modal-backdrop" data-close-modal>
      <section class="modal" role="dialog" aria-modal="true"
               aria-label="${escapeHTML(title)}">
        <div class="modal-header">
          <h2>${escapeHTML(title)}</h2>
          <button class="modal-close" data-action="close-modal"
                  aria-label="Close">×</button>
        </div>
        ${content}
      </section>
    </div>
  `;
}

function closeModal() {
  $("#modalRoot").innerHTML = "";
}

function showAccountMessage(action) {
  openModal(action, `
    <p>This is the account interface preview.</p>
    <p class="modal-note">
      Real sign-in, account creation, and private playlists across
      devices require an authentication service and database.
      No account is created by this demo.
    </p>
    <button class="button button-primary full-width"
            data-action="close-modal">Got it</button>
  `);
}

/* ---------------------------------------
   CLICK HANDLING
--------------------------------------- */

document.addEventListener("click", event => {
  const pageButton = event.target.closest("[data-page]");
  if (pageButton) {
    event.preventDefault();
    navigate(pageButton.dataset.page);
    return;
  }

  const playButton = event.target.closest("[data-play]");
  if (playButton) {
    playSong(playButton.dataset.play);
    return;
  }

  const favoriteButton = event.target.closest("[data-favorite]");
  if (favoriteButton) {
    toggleFavorite(favoriteButton.dataset.favorite);
    return;
  }

  const collectionButton = event.target.closest("[data-collection]");
  if (collectionButton) {
    renderCollection(
      collectionButton.dataset.name,
      collectionButton.dataset.collection
    );
    return;
  }

  const openPlaylistButton = event.target.closest("[data-open-playlist]");
  if (openPlaylistButton) {
    renderPlaylist(openPlaylistButton.dataset.openPlaylist);
    return;
  }

  const addButton = event.target.closest("[data-add-to-playlist]");
  if (addButton) {
    addSongToPlaylist(
      addButton.dataset.id,
      addButton.dataset.addToPlaylist
    );
    return;
  }

  const removeButton = event.target.closest("[data-remove-from-playlist]");
  if (removeButton) {
    removeSongFromPlaylist(
      removeButton.dataset.id,
      removeButton.dataset.removeFromPlaylist
    );
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (actionButton) {
    const action = actionButton.dataset.action;

    if (action === "create-playlist") createPlaylist();
    if (action === "delete-playlist") deletePlaylist(actionButton.dataset.id);
    if (action === "close-modal") closeModal();

    return;
  }

  if (event.target.matches("[data-close-modal]")) {
    closeModal();
  }
});

$("#searchInput").addEventListener("input", event => {
  searchTerm = event.target.value;

  if (currentPage !== "search") {
    navigate("search");
  } else {
    renderSearch(searchTerm);
  }
});

$("#playPauseBtn").addEventListener("click", togglePlayback);
$("#previousBtn").addEventListener("click", () => playNext(-1));
$("#nextBtn").addEventListener("click", () => playNext(1));

$("#playerFavorite").addEventListener("click", () => {
  if (currentSongId) toggleFavorite(currentSongId);
});

$("#signInBtn").addEventListener("click", () => {
  showAccountMessage("Sign in");
});

$("#createAccountBtn").addEventListener("click", () => {
  showAccountMessage("Create an account");
});

$("#expandPlayerBtn").addEventListener("click", () => {
  const song = getCurrentSong();

  if (!song) {
    showToast("Choose a niggun first.");
    return;
  }

  openModal("Now playing", `
    <div class="playlist-card-art">♫</div>
    <h3>${escapeHTML(song.title)}</h3>
    <p>${escapeHTML(song.artist)}</p>
    <p class="modal-note">
      Full-screen lyrics and song information can be added when
      the song data is available.
    </p>
    <button class="button button-primary full-width"
            data-action="close-modal">Close</button>
  `);
});

/* ---------------------------------------
   START THE WEBSITE
--------------------------------------- */

renderHome();
