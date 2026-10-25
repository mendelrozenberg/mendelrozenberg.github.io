/* =========================================================
   NigguneiChabad — app.js (fixed version)
========================================================= */
"use strict";

const $ = id => document.getElementById(id);

/* =========================================================
   DATA
   NOTE: names, albums, composers and audio are placeholders.
   Add real files by filling in song.audio (e.g. "audio/song0.mp3").
========================================================= */

const artists = [
  {id:"fried",   name:"Avraham Fried",      image:""},
  {id:"benny",   name:"Benny Friedman",     image:""},
  {id:"shulem",  name:"Shulem Lemmer",      image:""},
  {id:"shwekey", name:"Yaakov Shwekey",     image:""},
  {id:"motti",   name:"Motti Steinmetz",    image:""},
  {id:"michoel", name:"Michoel Schnitzler", image:""},
  {id:"dovid",   name:"Dovid Dachs",        image:""},
  {id:"eitan",   name:"Eitan Katz",         image:""}
];

/* Album song lists are DERIVED from song.albumId (see below),
   so they can never disagree with the songs again. */
const albums = [
  {id:"fried1",   title:"Avraham Fried Classics", artistId:"fried",   image:""},
  {id:"fried2",   title:"Chassidic Favorites",    artistId:"fried",   image:""},
  {id:"benny1",   title:"Benny Friedman",         artistId:"benny",   image:""},
  {id:"shulem1",  title:"Shulem Lemmer",          artistId:"shulem",  image:""},
  {id:"shwekey1", title:"Yaakov Shwekey",         artistId:"shwekey", image:""},
  {id:"motti1",   title:"Motti Steinmetz",        artistId:"motti",   image:""},
  {id:"michoel1", title:"Michoel Schnitzler",     artistId:"michoel", image:""},
  {id:"dovid1",   title:"Dovid Dachs",            artistId:"dovid",   image:""},
  {id:"eitan1",   title:"Eitan Katz",             artistId:"eitan",   image:""}
];

const categories = [
  {id:"farbrengen", name:"Farbrengen",      cls:"cat1"},
  {id:"dveikus",    name:"Dveikus",         cls:"cat2"},
  {id:"simcha",     name:"Simcha",          cls:"cat3"},
  {id:"classic",    name:"Classic Niggunim",cls:"cat4"},
  {id:"geulah",     name:"Geulah",          cls:"cat5"},
  {id:"meditative", name:"Meditative",      cls:"cat6"}
];

/* The first 12 songs keep their original order, so old saved
   data (which used list positions) migrates correctly. */
const songs = [
  {id:"song0", title:"Tzomah Nafshi",       artistId:"fried",   composerId:"alter",      albumId:"fried1",   initials:"TN", image:"", audio:"", categories:["dveikus","classic"]},
  {id:"song1", title:"Dalet Bavos",         artistId:"shulem",  composerId:"alter",      albumId:"shulem1",  initials:"DB", image:"", audio:"", categories:["farbrengen","classic"]},
  {id:"song2", title:"Rosh Chodesh Kislev", artistId:"benny",   composerId:"rashab",     albumId:"benny1",   initials:"RK", image:"", audio:"", categories:["farbrengen","simcha"]},
  {id:"song3", title:"Hachana",             artistId:"shwekey", composerId:"frierdiker", albumId:"shwekey1", initials:"HA", image:"", audio:"", categories:["meditative","geulah"]},
  {id:"song4", title:"Niggun Simcha",       artistId:"fried",   composerId:"chassidim",  albumId:"fried1",   initials:"NS", image:"", audio:"", categories:["simcha","farbrengen"]},
  {id:"song5", title:"Yechidus",            artistId:"shulem",  composerId:"alter",      albumId:"shulem1",  initials:"YE", image:"", audio:"", categories:["dveikus","meditative"]},
  {id:"song6", title:"Hu Elokeinu",         artistId:"fried",   composerId:"alter",      albumId:"fried2",   initials:"HE", image:"", audio:"", categories:["classic","farbrengen"]},
  {id:"song7", title:"Four Bavos",          artistId:"motti",   composerId:"alter",      albumId:"motti1",   initials:"FB", image:"", audio:"", categories:["classic","farbrengen"]},
  {id:"song8", title:"Niggun Hachana",      artistId:"fried",   composerId:"rashab",     albumId:"fried2",   initials:"NH", image:"", audio:"", categories:["meditative","dveikus"]},
  {id:"song9", title:"Rosh Chodesh",        artistId:"shwekey", composerId:"rashab",     albumId:"shwekey1", initials:"RC", image:"", audio:"", categories:["simcha","geulah"]},
  {id:"song10",title:"Dveikus",             artistId:"benny",   composerId:"chassidim",  albumId:"benny1",   initials:"DV", image:"", audio:"", categories:["dveikus","meditative"]},
  {id:"song11",title:"Simcha",              artistId:"michoel", composerId:"frierdiker", albumId:"michoel1", initials:"SI", image:"", audio:"", categories:["simcha","geulah"]},
  /* Added so Dovid Dachs and Eitan Katz have songs of their own (placeholders). */
  {id:"song12",title:"Niggun Ahavah",       artistId:"dovid",   composerId:"chassidim",  albumId:"dovid1",   initials:"NA", image:"", audio:"", categories:["dveikus"]},
  {id:"song13",title:"Niggun Bitachon",     artistId:"eitan",   composerId:"chassidim",  albumId:"eitan1",   initials:"NB", image:"", audio:"", categories:["geulah","simcha"]}
];

const composers = [
  {id:"alter",      name:"Alter Rebbe",      initials:"AR"},
  {id:"maharash",   name:"Rebbe Maharash",   initials:"RM"},
  {id:"rashab",     name:"Rebbe Rashab",     initials:"RR"},
  {id:"frierdiker", name:"Frierdiker Rebbe", initials:"FR"},
  {id:"rebbe",      name:"The Rebbe",        initials:"TR"},
  {id:"chassidim",  name:"Chabad Chassidim", initials:"CC"}
];

/* Official playlists now have real song lists (placeholder picks). */
const officialPlaylists = [
  {id:"off-farbrengen", name:"Niggunim for Farbrengen", songIds:["song1","song2","song4","song6","song7"]},
  {id:"off-classics",   name:"Chabad Classics",         songIds:["song0","song1","song3","song6","song7"]},
  {id:"off-deep",       name:"Deep Chabad",             songIds:["song3","song5","song8","song10"]},
  {id:"off-dveikus",    name:"Niggunim of Dveikus",     songIds:["song0","song5","song8","song10","song12"]},
  {id:"off-simcha",     name:"Simcha & Geulah",         songIds:["song2","song4","song9","song11","song13"]}
];

const songById = {};
songs.forEach(s => { songById[s.id] = s; });
albums.forEach(a => { a.songIds = songs.filter(s => s.albumId === a.id).map(s => s.id); });

/* =========================================================
   HELPERS
========================================================= */

const FAV_ID = "favorites";
const SIM_DURATION = 222; // used only for songs with no audio file yet

function esc(v){
  return String(v == null ? "" : v).replace(/[&<>"']/g, c => (
    {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]
  ));
}
function initialsOf(text){
  return String(text || "").split(/\s+/).filter(Boolean).map(w => w[0]).join("").slice(0,2).toUpperCase() || "NC";
}
function uid(){ return "pl" + Date.now().toString(36) + Math.random().toString(36).slice(2,6); }
function formatTime(s){
  s = Math.max(0, Math.floor(s || 0));
  return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
}
function plural(n){ return n + (n === 1 ? " song" : " songs"); }

/* Safe storage: never throws (private mode, full quota, corrupt data). */
const store = {
  getJSON(k, fallback){
    try{ const v = localStorage.getItem(k); return v === null ? fallback : JSON.parse(v); }
    catch(e){ return fallback; }
  },
  setJSON(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); return true; }catch(e){ return false; } },
  getRaw(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
  setRaw(k, v){ try{ localStorage.setItem(k, v); return true; }catch(e){ return false; } },
  remove(k){ try{ localStorage.removeItem(k); }catch(e){} }
};

function getArtist(id){ return artists.find(a => a.id === id); }
function getAlbum(id){ return albums.find(a => a.id === id); }
function getComposer(id){ return composers.find(c => c.id === id); }
function artistName(id){ const a = getArtist(id); return a ? a.name : "Chabad Niggun"; }
function composerName(id){ const c = getComposer(id); return c ? c.name : "Chabad"; }
function artClass(index){ return "a" + ((index % 8) + 1); }

function getWeeklySongs(){ return songs.slice(0,7); }
function getTopSongs(){ return songs.slice(0,12); }

/* =========================================================
   STATE (saved data is migrated from the old index-based format)
========================================================= */

function normalizeRecents(raw){
  if(!Array.isArray(raw)) return [];
  const out = [];
  raw.forEach(v => {
    const id = typeof v === "number" ? (songs[v] && songs[v].id) : v;
    if(id && songById[id] && !out.includes(id)) out.push(id);
  });
  return out.slice(0,12);
}

function normalizePlaylists(raw){
  if(!Array.isArray(raw)) return [];
  const seen = new Set();
  const out = [];
  raw.forEach(p => {
    if(!p || typeof p.name !== "string") return;
    let ids = Array.isArray(p.songIds) ? p.songIds
            : Array.isArray(p.songIndexes) ? p.songIndexes.map(i => songs[i] && songs[i].id)
            : [];
    ids = ids.filter((id, i) => songById[id] && ids.indexOf(id) === i);
    let id = p.id || (p.name === "My Favorites" ? FAV_ID : uid());
    if(seen.has(id)) id = uid();
    seen.add(id);
    out.push({id, name:p.name, songIds:ids});
  });
  return out;
}

let currentSongId = null;
let playing = false;
let shuffled = false;
let repeated = false;
let seeking = false;
let pendingSongIds = [];
const playHistory = [];

let recentSongIds = normalizeRecents(store.getJSON("nc_recent", []));
let playlists = normalizePlaylists(store.getJSON("nc_playlists", []));

function persistPlaylists(){
  if(!store.setJSON("nc_playlists", playlists)){
    toast("Couldn't save your playlists (browser storage is full or blocked).");
  }
}

function currentSong(){ return currentSongId ? songById[currentSongId] : null; }
function getRecentSongs(){ return recentSongIds.map(id => songById[id]).filter(Boolean).slice(0,12); }
function isFavorite(id){
  const p = playlists.find(x => x.id === FAV_ID);
  return !!p && p.songIds.includes(id);
}

/* =========================================================
   TOAST (replaces alert())
========================================================= */

let toastTimer = null;
function toast(msg){
  const t = $("toast");
  if(!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

/* =========================================================
   HTML BUILDERS
========================================================= */

function artHTML(item, index = 0){
  const image = item.image || (item.artistId && getArtist(item.artistId) ? getArtist(item.artistId).image : "") || "";
  if(image){
    return `<div class="art ${artClass(index)}"><img src="${esc(image)}" alt=""></div>`;
  }
  return `<div class="art ${artClass(index)}"><div class="art-content"><div class="art-initial">${esc(item.initials || initialsOf(item.name || item.title))}</div></div></div>`;
}

function songCard(song, index){
  const fav = isFavorite(song.id);
  return `
    <div class="song-card-wrap">
      <button class="music-card" type="button" data-song="${song.id}">
        ${artHTML(song, index)}
        <div class="card-title">${esc(song.title)}</div>
        <div class="card-subtitle">${esc(artistName(song.artistId))}</div>
      </button>
      <div class="song-card-actions">
        <button type="button" data-add-song="${song.id}">＋ Add to Playlist</button>
        <button type="button" data-favorite-song="${song.id}">${fav ? "♥ Favorited" : "♡ Favorite"}</button>
      </div>
    </div>`;
}

function composerCard(composer, index){
  return `
    <button class="music-card" type="button" data-composer="${composer.id}">
      <div class="art ${artClass(index)}"><div class="art-content"><div class="art-initial">${esc(composer.initials)}</div></div></div>
      <div class="card-title">${esc(composer.name)}</div>
      <div class="card-subtitle">Composer</div>
    </button>`;
}

function singerCard(artist){
  return `
    <button class="singer-row" type="button" data-artist="${artist.id}">
      <span class="singer-avatar" aria-hidden="true">${esc(initialsOf(artist.name))}</span>
      <span class="singer-copy"><strong>${esc(artist.name)}</strong><span>Singer</span></span>
      <span class="singer-chevron" aria-hidden="true">›</span>
    </button>`;
}

function chartRow(song, index, rank = true){
  const image = song.image || (getArtist(song.artistId) ? getArtist(song.artistId).image : "") || "";
  return `
    <div class="chart-row">
      <div class="chart-number">${rank ? index + 1 : "♪"}</div>
      <button class="chart-song" type="button" data-song="${song.id}">
        <div class="chart-mini-art">${image ? `<img src="${esc(image)}" alt="">` : esc(song.initials)}</div>
        <div class="chart-info">
          <div class="chart-title">${esc(song.title)}</div>
          <div class="chart-artist">${esc(artistName(song.artistId))}</div>
        </div>
      </button>
      <button class="play-small" type="button" data-song="${song.id}" tabindex="-1" aria-label="Play ${esc(song.title)}">▶</button>
    </div>`;
}

function playlistCard(p, official){
  const attr = official ? `data-offplaylist="${esc(p.id)}"` : `data-playlist="${esc(p.id)}"`;
  return `
    <button class="playlist-card" type="button" ${attr}>
      <div class="playlist-art">
        <div class="line"></div><div class="line2"></div>
        <div class="playlist-label">${esc(p.name)}</div>
        <div class="playlist-meta">${plural(p.songIds.length)}</div>
      </div>
    </button>`;
}

function categoryCard(c){
  return `<button class="category-card ${c.cls}" type="button" data-category="${c.id}"><span></span><strong>${esc(c.name)}</strong></button>`;
}

function emptyNote(text){ return `<p class="empty-note">${esc(text)}</p>`; }

/* =========================================================
   HOME RENDERING
========================================================= */

function renderWeekly(){ $("weeklySongs").innerHTML = getWeeklySongs().map(songCard).join(""); }
function renderComposers(){ $("composers").innerHTML = composers.map(composerCard).join(""); }
function renderSingers(){ $("singers").innerHTML = artists.map(singerCard).join(""); }
function renderTopChart(){ $("topChart").innerHTML = getTopSongs().map((s,i) => chartRow(s,i,true)).join(""); }
function renderRecent(){
  const list = getRecentSongs();
  $("recentChart").innerHTML = list.length
    ? list.map((s,i) => chartRow(s,i,false)).join("")
    : emptyNote("Songs you play will appear here.");
}
function renderOfficialPlaylists(){ $("officialPlaylists").innerHTML = officialPlaylists.map(p => playlistCard(p,true)).join(""); }
function renderCategories(){ $("categories").innerHTML = categories.map(categoryCard).join(""); }
function renderPlaylists(){
  $("myPlaylists").innerHTML =
    `<button class="create-playlist" type="button" data-action="create-playlist"><div class="plus">+</div><strong>Create Playlist</strong></button>` +
    playlists.map(p => playlistCard(p,false)).join("");
}

/* =========================================================
   SCROLL LOCK + OVERLAYS (with Back button / Esc support)
========================================================= */

let savedBodyScroll = 0;
function lockBackground(){
  if(!document.body.classList.contains("page-locked")){
    savedBodyScroll = window.scrollY || window.pageYOffset || 0;
    document.body.style.top = `-${savedBodyScroll}px`;
    document.body.classList.add("page-locked");
  }
}
function unlockBackground(){
  const anyOpen = document.querySelector(".library-screen.open,.detail-screen.open,.player-screen.open,.modal-bg.open");
  if(!anyOpen && document.body.classList.contains("page-locked")){
    document.body.classList.remove("page-locked");
    document.body.style.top = "";
    const root = document.documentElement;
    root.style.scrollBehavior = "auto";          // restore position instantly, not animated
    window.scrollTo(0, savedBodyScroll);
    root.style.scrollBehavior = "";
  }
}

const overlayStack = [];
let skipPop = 0;

function isOpen(id){ return overlayStack.includes($(id)); }

function openOverlay(id){
  const el = $(id);
  if(!el || overlayStack.includes(el)) return;
  lockBackground();
  el.classList.add("open");
  overlayStack.push(el);
  try{ history.pushState({nc:1}, ""); }catch(e){}
}
function closeOverlay(id){
  const el = $(id);
  const i = overlayStack.indexOf(el);
  if(i < 0) return;
  overlayStack.splice(i,1);
  el.classList.remove("open");
  unlockBackground();
  skipPop++;
  try{ history.back(); }catch(e){ skipPop--; }
}
function closeAllOverlays(){
  const n = overlayStack.length;
  if(!n) return;
  overlayStack.forEach(el => el.classList.remove("open"));
  overlayStack.length = 0;
  unlockBackground();
  skipPop++;
  try{ history.go(-n); }catch(e){ skipPop--; }
}
function dismissOverlay(id){
  if(id === "playlistModal") pendingSongIds = [];
  closeOverlay(id);
}

window.addEventListener("popstate", () => {
  if(skipPop > 0){ skipPop--; return; }
  const el = overlayStack.pop();       // the phone's Back button closes the top overlay
  if(el){ el.classList.remove("open"); unlockBackground(); }
});

document.addEventListener("keydown", e => {
  if(e.key !== "Escape") return;
  const top = overlayStack[overlayStack.length - 1];
  if(top) dismissOverlay(top.id);
});

document.querySelectorAll(".modal-bg").forEach(bg => {
  let downOnBg = false;
  bg.addEventListener("pointerdown", e => { downOnBg = e.target === bg; });
  bg.addEventListener("click", e => { if(e.target === bg && downOnBg) dismissOverlay(bg.id); });
});

/* =========================================================
   AUDIO ENGINE
   Real <audio> when song.audio is set, otherwise a timer so
   the progress bar / repeat / auto-next still work in the demo.
========================================================= */

const audio = new Audio();
audio.preload = "metadata";
let simTimer = null;
let simPos = 0;

function usesAudio(){ const s = currentSong(); return !!(s && s.audio); }
function getDuration(){
  if(usesAudio()) return isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0;
  return SIM_DURATION;
}
function getPosition(){ return usesAudio() ? audio.currentTime : simPos; }
function seekTo(sec){
  if(usesAudio()) audio.currentTime = sec; else simPos = sec;
  updateProgress();
}
function stopSim(){ clearInterval(simTimer); simTimer = null; }
function startSim(){
  stopSim();
  simTimer = setInterval(() => {
    simPos += 0.25;
    if(simPos >= SIM_DURATION){ handleEnded(); return; }
    updateProgress();
  }, 250);
}
function playAudioFile(){
  const p = audio.play();
  if(p && p.catch) p.catch(() => { playing = false; updatePlayButtons(); });
}

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("loadedmetadata", updateProgress);
audio.addEventListener("ended", handleEnded);
audio.addEventListener("error", () => {
  if(!audio.getAttribute("src")) return;
  playing = false;
  updatePlayButtons();
  toast("This audio file couldn't be played.");
});

function updateProgress(){
  const dur = getDuration();
  const pos = getPosition();
  if(!seeking) $("progress").value = dur ? (pos / dur) * 100 : 0;
  $("currentTime").textContent = formatTime(pos);
  $("duration").textContent = formatTime(dur);
}

function handleEnded(){
  stopSim();
  if(repeated){
    if(usesAudio()){ audio.currentTime = 0; playAudioFile(); }
    else { simPos = 0; startSim(); }
    playing = true;
    updatePlayButtons();
  }else{
    nextSong();
  }
}

/* =========================================================
   PLAYER
========================================================= */

function playSong(id, opts = {}){
  const song = songById[id];
  if(!song) return;

  if(!opts.fromHistory && currentSongId && currentSongId !== id){
    playHistory.push(currentSongId);
    if(playHistory.length > 50) playHistory.shift();
  }
  currentSongId = id;

  recentSongIds = [id, ...recentSongIds.filter(x => x !== id)].slice(0,12);
  store.setJSON("nc_recent", recentSongIds);

  stopSim();
  simPos = 0;
  playing = true;

  if(song.audio){
    audio.src = song.audio;
    audio.currentTime = 0;
    playAudioFile();
  }else{
    audio.pause();
    audio.removeAttribute("src");
    startSim();
  }

  $("bottomPlayer").classList.add("active");
  updatePlayer();
  updatePlayButtons();
  updateProgress();
}

function togglePlay(){
  if(!currentSongId) return;
  if(playing){
    playing = false;
    audio.pause();
    stopSim();
  }else{
    playing = true;
    if(usesAudio()) playAudioFile(); else startSim();
  }
  updatePlayButtons();
}

function updatePlayer(){
  const song = currentSong();
  if(!song) return;
  const artist = getArtist(song.artistId);
  const img = song.image || (artist && artist.image) || "";
  const art = img ? `<img src="${esc(img)}" alt="">` : esc(song.initials);

  $("miniTitle").textContent = song.title;
  $("miniArtist").textContent = artistName(song.artistId);
  $("miniArt").innerHTML = art;
  $("bigArt").innerHTML = art;
  $("playerTitle").textContent = song.title;
  $("playerArtist").textContent = artistName(song.artistId) + " • " + composerName(song.composerId);

  renderRecent();
  syncFavoriteUI();
}

function updatePlayButtons(){
  $("miniPlay").textContent = playing ? "Ⅱ" : "▶";
  $("bigPlay").textContent = playing ? "Ⅱ" : "▶";
}

function openPlayer(){ if(currentSongId) openOverlay("playerScreen"); }

function nextSong(){
  const idx = songs.findIndex(s => s.id === currentSongId);
  let next;
  if(shuffled && songs.length > 1){
    do{ next = Math.floor(Math.random() * songs.length); }while(next === idx);
  }else{
    next = (idx + 1) % songs.length;
  }
  playSong(songs[next].id);
}

function previousSong(){
  if(getPosition() > 3){ seekTo(0); return; }          // restart the song first
  if(playHistory.length){ playSong(playHistory.pop(), {fromHistory:true}); return; }
  const idx = songs.findIndex(s => s.id === currentSongId);
  playSong(songs[(idx - 1 + songs.length) % songs.length].id, {fromHistory:true});
}

/* =========================================================
   FAVORITES + PLAYLISTS
========================================================= */

function ensureFavoritesPlaylist(){
  let p = playlists.find(x => x.id === FAV_ID);
  if(!p){ p = {id:FAV_ID, name:"My Favorites", songIds:[]}; playlists.unshift(p); }
  return p;
}

function syncFavoriteUI(){
  const fav = currentSongId ? isFavorite(currentSongId) : false;
  const b = $("favorite");
  if(b){ b.textContent = fav ? "♥ Favorited" : "♡ Favorite"; b.classList.toggle("active", fav); }
  document.querySelectorAll("[data-favorite-song]").forEach(btn => {
    btn.textContent = isFavorite(btn.dataset.favoriteSong) ? "♥ Favorited" : "♡ Favorite";
  });
}

function toggleFavoriteSong(id){
  if(!songById[id]) return;
  const p = ensureFavoritesPlaylist();
  const pos = p.songIds.indexOf(id);
  if(pos >= 0) p.songIds.splice(pos,1); else p.songIds.push(id);
  persistPlaylists();
  renderPlaylists();
  syncFavoriteUI();
  if(isOpen("libraryScreen") && $("libraryTitle").textContent === p.name) openUserPlaylist(FAV_ID);
}

function playlistNameTaken(name, exceptId){
  return playlists.some(p => p.id !== exceptId && p.name.toLowerCase() === name.toLowerCase());
}

function showPlaylistModal(mode){
  const choose = mode === "choose";
  $("playlistTitle").textContent = choose ? "Add to Playlist" : "Create Playlist";
  $("playlistDesc").textContent = choose
    ? "Choose an existing playlist or create a new one."
    : (pendingSongIds.length ? "The selected music will be added to your new playlist." : "Your playlist can exist even before you add songs.");
  const chooser = $("playlistChooser");
  chooser.hidden = !choose;
  if(choose){
    chooser.innerHTML =
      (playlists.length
        ? playlists.map(p => `<button type="button" class="search-result" data-choose-playlist="${esc(p.id)}"><span class="search-result-info"><span class="search-result-title">${esc(p.name)}</span><span class="search-result-sub">${plural(p.songIds.length)}</span></span></button>`).join("")
        : `<p>You don't have a playlist yet.</p>`) +
      `<button type="button" class="primary" data-action="chooser-create" style="width:100%;margin-top:12px">＋ Create New Playlist</button>`;
  }
  $("playlistName").hidden = choose;
  $("savePlaylist").hidden = choose;
  $("cancelPlaylist").textContent = choose ? "Close" : "Cancel";
  if(!choose) $("playlistName").value = "";
}

function openAddToPlaylist(ids){
  pendingSongIds = (Array.isArray(ids) ? ids : [ids]).filter(id => songById[id]);
  if(!pendingSongIds.length) return;
  showPlaylistModal("choose");
  openOverlay("playlistModal");
}

function openCreatePlaylist(){
  pendingSongIds = [];
  showPlaylistModal("create");
  openOverlay("playlistModal");
  $("playlistName").focus();
}

function addPendingToPlaylist(playlistId){
  const pl = playlists.find(p => p.id === playlistId);
  if(!pl) return;
  let added = 0;
  pendingSongIds.forEach(sid => { if(!pl.songIds.includes(sid)){ pl.songIds.push(sid); added++; } });
  pendingSongIds = [];
  persistPlaylists();
  closeOverlay("playlistModal");
  renderPlaylists();
  syncFavoriteUI();
  toast(added ? `Added to ${pl.name}` : `Already in ${pl.name}`);
}

function savePlaylistFromModal(){
  const input = $("playlistName");
  const name = input.value.trim();
  if(!name){ toast("Please enter a playlist name."); input.focus(); return; }
  if(playlistNameTaken(name)){ toast("You already have a playlist with that name."); input.focus(); return; }
  playlists.push({id:uid(), name, songIds:[...pendingSongIds]});
  pendingSongIds = [];
  persistPlaylists();
  closeOverlay("playlistModal");
  renderPlaylists();
  toast(`Created “${name}”`);
}

function removeFromPlaylist(playlistId, songId){
  const p = playlists.find(x => x.id === playlistId);
  if(!p) return;
  p.songIds = p.songIds.filter(id => id !== songId);
  persistPlaylists();
  renderPlaylists();
  syncFavoriteUI();
  openUserPlaylist(playlistId);
}

function renamePlaylist(id){
  const p = playlists.find(x => x.id === id);
  if(!p || id === FAV_ID) return;
  const input = prompt("Rename playlist", p.name);
  if(input === null) return;
  const name = input.trim().slice(0,40);
  if(!name){ toast("Playlist name can't be empty."); return; }
  if(playlistNameTaken(name, id)){ toast("You already have a playlist with that name."); return; }
  p.name = name;
  persistPlaylists();
  renderPlaylists();
  openUserPlaylist(id);
}

function deletePlaylist(id){
  const p = playlists.find(x => x.id === id);
  if(!p || id === FAV_ID) return;
  if(!confirm(`Delete “${p.name}”?`)) return;
  playlists = playlists.filter(x => x.id !== id);
  persistPlaylists();
  renderPlaylists();
  closeOverlay("libraryScreen");
  toast("Playlist deleted.");
}

/* =========================================================
   LIBRARY / DETAIL SCREENS
========================================================= */

function showLibrary(title, html, asList){
  $("libraryTitle").textContent = title;
  const grid = $("libraryGrid");
  grid.className = "library-grid" + (asList ? " chart-list" : "");
  grid.innerHTML = html;
  if(isOpen("detailScreen")) closeOverlay("detailScreen");
  openOverlay("libraryScreen");
}

function songRows(list, rank){
  return list.length ? list.map((s,i) => chartRow(s,i,rank)).join("") : "";
}

function openLibrary(section){
  switch(section){
    case "Top 12 of the Week":
      showLibrary(section, songRows(getTopSongs(), true), true); break;
    case "Recently Listened To": {
      const list = getRecentSongs();
      showLibrary(section, songRows(list, false) || emptyNote("No songs have been played yet."), true); break;
    }
    case "Niggunim of the Week":
      showLibrary(section, getWeeklySongs().map(songCard).join(""), false); break;
    case "Composers":
      showLibrary(section, composers.map(composerCard).join(""), false); break;
    case "Singers":
      showLibrary(section, artists.map(singerCard).join(""), true); break;
    case "Categories":
      showLibrary(section, categories.map(categoryCard).join(""), false); break;
    case "Chabad Niggunim Playlists":
      showLibrary(section, officialPlaylists.map(p => playlistCard(p,true)).join(""), false); break;
    case "My Own Playlists":
      showLibrary(section, playlists.length ? playlists.map(p => playlistCard(p,false)).join("") : emptyNote("You haven't created any playlists yet."), false); break;
  }
}

function openUserPlaylist(id){
  const p = playlists.find(x => x.id === id);
  if(!p) return;
  const rows = p.songIds.map(sid => songById[sid]).filter(Boolean);
  let html = "";
  if(id !== FAV_ID){
    html += `<div class="list-toolbar"><button class="pill-btn" type="button" data-rename-playlist="${esc(p.id)}">Rename</button><button class="pill-btn danger" type="button" data-delete-playlist="${esc(p.id)}">Delete playlist</button></div>`;
  }
  html += rows.length
    ? rows.map((s,i) => `<div class="playlist-row">${chartRow(s,i,false)}<button class="remove-song" type="button" data-remove-song="${s.id}" data-from-playlist="${esc(p.id)}" aria-label="Remove ${esc(s.title)} from playlist">✕</button></div>`).join("")
    : emptyNote("This playlist is empty. Use Add to Playlist on a song or album to add music.");
  showLibrary(p.name, html, true);
}

function openOfficialPlaylist(id){
  const p = officialPlaylists.find(x => x.id === id);
  if(!p) return;
  const rows = p.songIds.map(sid => songById[sid]).filter(Boolean);
  showLibrary(p.name, songRows(rows, false) || emptyNote("No songs yet."), true);
}

function openCategory(id){
  const c = categories.find(x => x.id === id);
  if(!c) return;
  const rows = songs.filter(s => s.categories.includes(id));
  showLibrary(c.name, songRows(rows, false) || emptyNote("No songs in this category yet."), true);
}

function openDetail(title, subheading, artHtml, html, listClass){
  $("detailTitle").textContent = title;
  $("detailHeading").textContent = title;
  $("detailSubheading").textContent = subheading || "";
  $("detailArt").innerHTML = artHtml;
  $("detailSongs").className = listClass;
  $("detailSongs").innerHTML = html;
  openOverlay("detailScreen");
}

function detailSongRow(song){
  return `
    <button class="detail-song" type="button" data-song="${song.id}">
      <div class="detail-song-art">${esc(song.initials)}</div>
      <div class="detail-song-info">
        <div class="detail-song-title">${esc(song.title)}</div>
        <div class="detail-song-sub">${esc(artistName(song.artistId))}</div>
      </div>
      <div class="detail-play">▶</div>
    </button>`;
}

function openArtist(id){
  const artist = getArtist(id);
  if(!artist) return;
  const art = artist.image ? `<img src="${esc(artist.image)}" alt="${esc(artist.name)}">` : esc(initialsOf(artist.name));
  const html = albums.filter(a => a.artistId === id).map((album, index) => `
    <button class="music-card" type="button" data-album="${album.id}">
      ${artHTML({image:album.image, initials:initialsOf(album.title)}, index)}
      <div class="card-title">${esc(album.title)}</div>
      <div class="card-subtitle">${plural(album.songIds.length)}</div>
    </button>`).join("");
  openDetail(artist.name, "Albums", art, html || emptyNote("No albums yet."), "horizontal");
}

function openAlbum(id){
  const album = getAlbum(id);
  if(!album) return;
  const artist = getArtist(album.artistId);
  const html =
    `<button type="button" class="primary add-album-btn" data-add-album="${album.id}">＋ Add Album to Playlist</button>` +
    album.songIds.map(sid => detailSongRow(songById[sid])).join("");
  const img = album.image || (artist && artist.image) || "";
  const art = img ? `<img src="${esc(img)}" alt="${esc(album.title)}">` : esc(initialsOf(album.title));
  openDetail(album.title, artist ? artist.name + " • Album" : "Album", art, html, "detail-song-list");
}

function openComposer(id){
  const composer = getComposer(id);
  if(!composer) return;
  const list = songs.filter(s => s.composerId === id);
  openDetail(composer.name, "Songs by this composer", esc(composer.initials),
    list.length ? list.map(detailSongRow).join("") : emptyNote("No songs yet."), "detail-song-list");
}

/* =========================================================
   SEARCH
========================================================= */

function searchRow(attr, value, artHtml, title, sub){
  return `
    <button class="search-result" type="button" ${attr}="${esc(value)}">
      <div class="search-result-art">${artHtml}</div>
      <div class="search-result-info">
        <div class="search-result-title">${esc(title)}</div>
        <div class="search-result-sub">${esc(sub)}</div>
      </div>
    </button>`;
}

function doSearch(){
  const q = $("searchInput").value.trim().toLowerCase();
  const results = $("searchResults");
  if(!q){ results.innerHTML = emptyNote("Start typing to search."); return; }

  const has = text => String(text).toLowerCase().includes(q);
  let html = "";

  songs.filter(s => has(s.title) || has(artistName(s.artistId)) || has(composerName(s.composerId)))
    .forEach(s => { html += searchRow("data-song", s.id, esc(s.initials), s.title, "Song • " + artistName(s.artistId)); });

  artists.filter(a => has(a.name))
    .forEach(a => {
      const art = a.image ? `<img src="${esc(a.image)}" alt="">` : esc(initialsOf(a.name));
      html += searchRow("data-artist", a.id, art, a.name, "Singer / Artist");
    });

  albums.filter(a => has(a.title))
    .forEach(a => { html += searchRow("data-album", a.id, esc(initialsOf(a.title)), a.title, "Album • " + artistName(a.artistId)); });

  composers.filter(c => has(c.name))
    .forEach(c => { html += searchRow("data-composer", c.id, esc(c.initials), c.name, "Composer"); });

  playlists.filter(p => has(p.name))
    .forEach(p => { html += searchRow("data-playlist", p.id, esc(initialsOf(p.name)), p.name, "Your playlist • " + plural(p.songIds.length)); });

  officialPlaylists.filter(p => has(p.name))
    .forEach(p => { html += searchRow("data-offplaylist", p.id, esc(initialsOf(p.name)), p.name, "Playlist • " + plural(p.songIds.length)); });

  results.innerHTML = html || emptyNote("Nothing found.");
}

/* =========================================================
   AUTH (prototype only — nothing here is real security)
========================================================= */

let authMode = "signin";

function setAuthMode(mode){
  authMode = mode;
  const signup = mode === "signup";
  $("authTitle").textContent = signup ? "Create Account" : "Sign In";
  $("authDescription").textContent = signup ? "Create your NigguneiChabad account." : "Sign in to your NigguneiChabad account.";
  $("submitAuth").textContent = signup ? "Create Account" : "Sign In";
  $("switchAuth").textContent = signup ? "Sign In" : "Create Account";
  $("signupFields").hidden = !signup;
  $("authConfirmPassword").hidden = !signup;
  $("authPassword").autocomplete = signup ? "new-password" : "current-password";
}

function clearAuthFields(){
  ["authFirstName","authLastName","authPhone","authEmail","authPassword","authConfirmPassword"].forEach(id => { $(id).value = ""; });
}

function openAuthModal(){
  openOverlay("authModal");
  $(authMode === "signup" ? "authFirstName" : "authEmail").focus();   // focus inside the tap so iOS opens the keyboard
}

function updateAuthUI(){
  const user = store.getRaw("nc_demo_user");
  const account = store.getJSON("nc_demo_account", null);
  const btn = $("authButton");
  if(user){
    btn.textContent = account && account.email === user && account.firstName ? account.firstName : "Account";
  }else{
    btn.textContent = "Sign In";
  }
  $("createAccountButton").hidden = !!user;
}

function submitAuth(){
  const email = $("authEmail").value.trim().toLowerCase();
  const password = $("authPassword").value;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if(authMode === "signup"){
    const firstName = $("authFirstName").value.trim();
    const lastName = $("authLastName").value.trim();
    const phone = $("authPhone").value.trim();
    const confirmPassword = $("authConfirmPassword").value;

    if(!firstName || !lastName || !email || !phone || !password || !confirmPassword){ toast("Please fill in every field."); return; }
    if(!emailOk){ toast("Please enter a valid email address."); return; }
    if(password.length < 6){ toast("Password must be at least 6 characters."); return; }
    if(password !== confirmPassword){ toast("The passwords do not match."); return; }

    // Prototype: keep only what the header needs. No password or phone is stored.
    store.setJSON("nc_demo_account", {firstName, lastName, email});
    store.setRaw("nc_demo_user", email);
    clearAuthFields();
    closeOverlay("authModal");
    setAuthMode("signin");
    updateAuthUI();
    toast("Account created for this prototype!");
    return;
  }

  if(!email || !password){ toast("Please enter your email and password."); return; }
  if(!emailOk){ toast("Please enter a valid email address."); return; }

  store.setRaw("nc_demo_user", email);
  clearAuthFields();
  closeOverlay("authModal");
  updateAuthUI();
  toast("Signed in for this prototype.");
}

/* =========================================================
   EVENTS — one delegated click handler for everything dynamic
========================================================= */

document.addEventListener("click", e => {
  const t = e.target;
  if(!(t instanceof Element)) return;
  let el;

  if((el = t.closest("[data-action]"))){
    if(el.dataset.action === "create-playlist") openCreatePlaylist();
    else if(el.dataset.action === "chooser-create"){ showPlaylistModal("create"); $("playlistName").focus(); }
    return;
  }
  if((el = t.closest("[data-section]"))){ openLibrary(el.dataset.section); return; }
  if((el = t.closest("[data-add-song]"))){ openAddToPlaylist([el.dataset.addSong]); return; }
  if((el = t.closest("[data-favorite-song]"))){ toggleFavoriteSong(el.dataset.favoriteSong); return; }
  if((el = t.closest("[data-add-album]"))){
    const album = getAlbum(el.dataset.addAlbum);
    if(album) openAddToPlaylist(album.songIds);
    return;
  }
  if((el = t.closest("[data-choose-playlist]"))){ addPendingToPlaylist(el.dataset.choosePlaylist); return; }
  if((el = t.closest("[data-remove-song]"))){ removeFromPlaylist(el.dataset.fromPlaylist, el.dataset.removeSong); return; }
  if((el = t.closest("[data-rename-playlist]"))){ renamePlaylist(el.dataset.renamePlaylist); return; }
  if((el = t.closest("[data-delete-playlist]"))){ deletePlaylist(el.dataset.deletePlaylist); return; }

  const fromSearch = !!t.closest("#searchModal");
  const go = fn => { if(fromSearch) closeOverlay("searchModal"); fn(); };

  if((el = t.closest("[data-song]"))){
    go(() => { playSong(el.dataset.song); if(fromSearch) openPlayer(); });
    return;
  }
  if((el = t.closest("[data-artist]"))){ go(() => openArtist(el.dataset.artist)); return; }
  if((el = t.closest("[data-album]"))){ go(() => openAlbum(el.dataset.album)); return; }
  if((el = t.closest("[data-composer]"))){ go(() => openComposer(el.dataset.composer)); return; }
  if((el = t.closest("[data-playlist]"))){ go(() => openUserPlaylist(el.dataset.playlist)); return; }
  if((el = t.closest("[data-offplaylist]"))){ go(() => openOfficialPlaylist(el.dataset.offplaylist)); return; }
  if((el = t.closest("[data-category]"))){ go(() => openCategory(el.dataset.category)); return; }
});

/* Home */
$("homeButton").addEventListener("click", () => {
  closeAllOverlays();
  window.scrollTo({top:0, behavior:"smooth"});
});

/* Player */
$("miniArt").addEventListener("click", openPlayer);
$("miniInfo").addEventListener("click", openPlayer);
$("miniPlay").addEventListener("click", e => { e.stopPropagation(); togglePlay(); });
$("closePlayer").addEventListener("click", () => closeOverlay("playerScreen"));
$("playerHome").addEventListener("click", () => {
  closeAllOverlays();
  window.scrollTo({top:0, behavior:"smooth"});
});
$("playerChabadButton").addEventListener("click", () => {
  closeOverlay("playerScreen");
  openLibrary("Chabad Niggunim Playlists");
});
$("bigPlay").addEventListener("click", togglePlay);
$("next").addEventListener("click", nextSong);
$("previous").addEventListener("click", previousSong);
$("shuffle").addEventListener("click", () => {
  shuffled = !shuffled;
  $("shuffle").classList.toggle("active", shuffled);
  $("shuffle").setAttribute("aria-pressed", shuffled);
});
$("repeat").addEventListener("click", () => {
  repeated = !repeated;
  $("repeat").classList.toggle("active", repeated);
  $("repeat").setAttribute("aria-pressed", repeated);
});
$("favorite").addEventListener("click", () => { if(currentSongId) toggleFavoriteSong(currentSongId); });
$("addPlaylist").addEventListener("click", () => { if(currentSongId) openAddToPlaylist([currentSongId]); });

const progress = $("progress");
progress.addEventListener("pointerdown", () => { seeking = true; });
progress.addEventListener("input", () => {
  const dur = getDuration();
  if(dur) seekTo((Number(progress.value) / 100) * dur);
});
progress.addEventListener("change", () => { seeking = false; });
progress.addEventListener("pointerup", () => { seeking = false; });
progress.addEventListener("pointercancel", () => { seeking = false; });

/* Search */
$("searchButton").addEventListener("click", () => {
  openOverlay("searchModal");
  $("searchInput").focus();
  doSearch();
});
$("searchInput").addEventListener("input", doSearch);
$("closeSearch").addEventListener("click", () => closeOverlay("searchModal"));

/* Auth */
$("authButton").addEventListener("click", () => {
  if(store.getRaw("nc_demo_user")){
    if(confirm("Sign out of NigguneiChabad?")){
      store.remove("nc_demo_user");
      updateAuthUI();
      toast("Signed out.");
    }
    return;
  }
  setAuthMode("signin");
  openAuthModal();
});
$("createAccountButton").addEventListener("click", () => { setAuthMode("signup"); openAuthModal(); });
$("switchAuth").addEventListener("click", () => {
  setAuthMode(authMode === "signin" ? "signup" : "signin");
  $(authMode === "signup" ? "authFirstName" : "authEmail").focus();
});
$("submitAuth").addEventListener("click", submitAuth);
$("closeAuth").addEventListener("click", () => closeOverlay("authModal"));
["authFirstName","authLastName","authPhone","authEmail","authPassword","authConfirmPassword"].forEach(id => {
  $(id).addEventListener("keydown", e => { if(e.key === "Enter"){ e.preventDefault(); submitAuth(); } });
});

/* Playlist modal */
$("cancelPlaylist").addEventListener("click", () => dismissOverlay("playlistModal"));
$("savePlaylist").addEventListener("click", savePlaylistFromModal);
$("playlistName").addEventListener("keydown", e => { if(e.key === "Enter"){ e.preventDefault(); savePlaylistFromModal(); } });

/* Detail / library back buttons */
$("closeDetail").addEventListener("click", () => closeOverlay("detailScreen"));
$("closeLibrary").addEventListener("click", () => closeOverlay("libraryScreen"));

/* =========================================================
   INITIALIZE
========================================================= */

renderWeekly();
renderComposers();
renderTopChart();
renderRecent();
renderOfficialPlaylists();
renderSingers();
renderCategories();
renderPlaylists();
setAuthMode("signin");
updateAuthUI();
updatePlayButtons();
updateProgress();
