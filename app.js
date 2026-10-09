/* =========================================================
   DATA
========================================================= */

const artists = [

  {
    id:"fried",
    name:"Avraham Fried",
    image:"",
    albums:["fried1","fried2"]
  },

  {
    id:"benny",
    name:"Benny Friedman",
    image:"",
    albums:["benny1"]
  },

  {
    id:"shulem",
    name:"Shulem Lemmer",
    image:"",
    albums:["shulem1"]
  },

  {
    id:"shwekey",
    name:"Yaakov Shwekey",
    image:"",
    albums:["shwekey1"]
  },

  {
    id:"motti",
    name:"Motti Steinmetz",
    image:"",
    albums:["motti1"]
  },

  {
    id:"michoel",
    name:"Michoel Schnitzler",
    image:"",
    albums:["michoel1"]
  },

  {
    id:"dovid",
    name:"Dovid Dachs",
    image:"",
    albums:["dovid1"]
  },

  {
    id:"eitan",
    name:"Eitan Katz",
    image:"",
    albums:["eitan1"]
  }

];

const albums = [

  {
    id:"fried1",
    title:"Avraham Fried Classics",
    artistId:"fried",
    image:"",
    songs:[0,4]
  },

  {
    id:"fried2",
    title:"Chassidic Favorites",
    artistId:"fried",
    image:"",
    songs:[6,8]
  },

  {
    id:"benny1",
    title:"Benny Friedman",
    artistId:"benny",
    image:"",
    songs:[2,10]
  },

  {
    id:"shulem1",
    title:"Shulem Lemmer",
    artistId:"shulem",
    image:"",
    songs:[1,5]
  },

  {
    id:"shwekey1",
    title:"Yaakov Shwekey",
    artistId:"shwekey",
    image:"",
    songs:[3,9]
  },

  {
    id:"motti1",
    title:"Motti Steinmetz",
    artistId:"motti",
    image:"",
    songs:[7]
  },

  {
    id:"michoel1",
    title:"Michoel Schnitzler",
    artistId:"michoel",
    image:"",
    songs:[11]
  },

  {
    id:"dovid1",
    title:"Dovid Dachs",
    artistId:"dovid",
    image:"",
    songs:[0,6]
  },

  {
    id:"eitan1",
    title:"Eitan Katz",
    artistId:"eitan",
    image:"",
    songs:[4,10]
  }

];

const songs = [

  {
    id:"song0",
    title:"Tzomah Nafshi",
    artistId:"fried",
    composerId:"alter",
    albumId:"fried1",
    initials:"TN",
    image:""
  },

  {
    id:"song1",
    title:"Dalet Bavos",
    artistId:"shulem",
    composerId:"alter",
    albumId:"shulem1",
    initials:"DB",
    image:""
  },

  {
    id:"song2",
    title:"Rosh Chodesh Kislev",
    artistId:"benny",
    composerId:"rashab",
    albumId:"benny1",
    initials:"RK",
    image:""
  },

  {
    id:"song3",
    title:"Hachana",
    artistId:"shwekey",
    composerId:"frierdiker",
    albumId:"shwekey1",
    initials:"HA",
    image:""
  },

  {
    id:"song4",
    title:"Niggun Simcha",
    artistId:"fried",
    composerId:"chassidim",
    albumId:"fried1",
    initials:"NS",
    image:""
  },

  {
    id:"song5",
    title:"Yechidus",
    artistId:"shulem",
    composerId:"alter",
    albumId:"shulem1",
    initials:"YE",
    image:""
  },

  {
    id:"song6",
    title:"Hu Elokeinu",
    artistId:"fried",
    composerId:"alter",
    albumId:"fried2",
    initials:"HE",
    image:""
  },

  {
    id:"song7",
    title:"Four Bavos",
    artistId:"motti",
    composerId:"alter",
    albumId:"motti1",
    initials:"FB",
    image:""
  },

  {
    id:"song8",
    title:"Niggun Hachana",
    artistId:"fried",
    composerId:"rashab",
    albumId:"fried2",
    initials:"NH",
    image:""
  },

  {
    id:"song9",
    title:"Rosh Chodesh",
    artistId:"shwekey",
    composerId:"rashab",
    albumId:"shwekey1",
    initials:"RC",
    image:""
  },

  {
    id:"song10",
    title:"Dveikus",
    artistId:"benny",
    composerId:"chassidim",
    albumId:"benny1",
    initials:"DV",
    image:""
  },

  {
    id:"song11",
    title:"Simcha",
    artistId:"michoel",
    composerId:"frierdiker",
    albumId:"michoel1",
    initials:"SI",
    image:""
  }

];

const composers = [

  {
    id:"alter",
    name:"Alter Rebbe",
    initials:"AR"
  },

  {
    id:"maharash",
    name:"Rebbe Maharash",
    initials:"RM"
  },

  {
    id:"rashab",
    name:"Rebbe Rashab",
    initials:"RR"
  },

  {
    id:"frierdiker",
    name:"Frierdiker Rebbe",
    initials:"FR"
  },

  {
    id:"rebbe",
    name:"The Rebbe",
    initials:"TR"
  },

  {
    id:"chassidim",
    name:"Chabad Chassidim",
    initials:"CC"
  }

];

const officialPlaylists = [

  ["Niggunim for Farbrengen","18 songs"],
  ["Chabad Classics","25 songs"],
  ["Deep Chabad","16 songs"],
  ["Niggunim of Dveikus","21 songs"],
  ["Simcha & Geulah","14 songs"]

];

const categories = [

  ["Farbrengen","cat1"],
  ["Dveikus","cat2"],
  ["Simcha","cat3"],
  ["Classic Niggunim","cat4"],
  ["Geulah","cat5"],
  ["Meditative","cat6"]

];


/* =========================================================
   NIGGUNEICHABAD — WORKING APP LOGIC
   Built directly on the original file/data.
========================================================= */

const officialPlaylistSongs = {
  "Niggunim for Farbrengen":[0,1,2,3,4,5,6,7,8,9,10,11],
  "Chabad Classics":[0,1,2,4,6,7,8,10],
  "Deep Chabad":[1,5,6,7,8],
  "Niggunim of Dveikus":[0,1,5,6,7,10],
  "Simcha & Geulah":[2,4,8,9,10,11]
};

const categorySongs = {
  "Farbrengen":[0,1,2,3,4,5,8,9],
  "Dveikus":[1,5,6,7,10],
  "Simcha":[4,8,10,11],
  "Classic Niggunim":[0,1,6,7],
  "Geulah":[2,3,8,9,11],
  "Meditative":[1,5,6,7]
};

/* ---------- persistent state ---------- */

let currentSongIndex = 0;
let playing = false;
let shuffled = false;
let repeated = false;
let authMode = "signin";
let pendingAddType = null;
let pendingAddId = null;
let playerTimer = null;

let recentSongIndexes = JSON.parse(
  localStorage.getItem("nc_recent") || "[]"
).filter(i => songs[i]);

let playCounts = JSON.parse(
  localStorage.getItem("nc_play_counts") || "{}"
);

let playlists = JSON.parse(
  localStorage.getItem("nc_playlists") || "[]"
);

function savePlaylists(){
  localStorage.setItem("nc_playlists", JSON.stringify(playlists));
}

function saveCounts(){
  localStorage.setItem("nc_play_counts", JSON.stringify(playCounts));
}

function ensureFavoritesPlaylist(){
  let fav = playlists.find(p => p.id === "favorites");
  if(!fav){
    fav = {
      id:"favorites",
      name:"My Favorites",
      songIndexes:[],
      albumIds:[]
    };
    playlists.unshift(fav);
    savePlaylists();
  }else{
    fav.songIndexes = Array.isArray(fav.songIndexes) ? fav.songIndexes : [];
    fav.albumIds = Array.isArray(fav.albumIds) ? fav.albumIds : [];
    savePlaylists();
  }
  return fav;
}

ensureFavoritesPlaylist();

/* ---------- helpers ---------- */

function getArtist(id){ return artists.find(a => a.id === id); }
function getAlbum(id){ return albums.find(a => a.id === id); }
function getComposer(id){ return composers.find(c => c.id === id); }
function artistName(id){ return getArtist(id)?.name || "Chabad Niggun"; }
function composerName(id){ return getComposer(id)?.name || "Chabad"; }
function artClass(index){ return "a" + ((index % 8) + 1); }

function escapeHTML(value){
  return String(value ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

function artHTML(item,index=0){
  const image = item.image || (item.artistId ? getArtist(item.artistId)?.image : "");
  if(image){
    return `<div class="art ${artClass(index)}"><img src="${image}" alt=""></div>`;
  }
  const initials = item.initials ||
    item.name?.split(" ").map(x=>x[0]).join("").slice(0,2) || "NC";
  return `<div class="art ${artClass(index)}"><div class="art-content"><div class="art-initial">${escapeHTML(initials)}</div></div></div>`;
}

function artistArtHTML(artist,index=0){
  if(artist.image){
    return `<div class="art ${artClass(index)}"><img src="${artist.image}" alt="${escapeHTML(artist.name)}"></div>`;
  }
  const initials = artist.name.split(" ").map(x=>x[0]).join("").slice(0,2);
  return `<div class="art ${artClass(index)}"><div class="art-content"><div class="art-initial">${escapeHTML(initials)}</div></div></div>`;
}

function songCard(song,index){
  const i = songs.indexOf(song);
  return `
    <button class="music-card" type="button" data-song="${i}">
      ${artHTML(song,index)}
      <div class="card-title">${escapeHTML(song.title)}</div>
      <div class="card-subtitle">${escapeHTML(artistName(song.artistId))}</div>
    </button>`;
}

function composerCard(composer,index){
  return `
    <button class="music-card" type="button" data-composer="${escapeHTML(composer.id)}">
      <div class="art ${artClass(index)}"><div class="art-content"><div class="art-initial">${escapeHTML(composer.initials)}</div></div></div>
      <div class="card-title">${escapeHTML(composer.name)}</div>
      <div class="card-subtitle">Composer</div>
    </button>`;
}

function singerCard(artist,index){
  return `
    <button class="singer-item" type="button" data-artist="${escapeHTML(artist.id)}">
      <div class="singer-avatar">${artist.image ? `<img src="${artist.image}" alt="">` : escapeHTML(artist.name.split(" ").map(x=>x[0]).join("").slice(0,2))}</div>
      <div class="singer-info">
        <strong>${escapeHTML(artist.name)}</strong>
        <span>${artist.albums?.length || 0} album${(artist.albums?.length || 0) === 1 ? "" : "s"}</span>
      </div>
      <span class="singer-arrow">›</span>
    </button>`;
}

function chartRow(song,index){
  const i = songs.indexOf(song);
  const image = song.image || getArtist(song.artistId)?.image || "";
  return `
    <div class="chart-row">
      <div class="chart-number">${index+1}</div>
      <button class="chart-song" type="button" data-song="${i}">
        <div class="chart-mini-art">${image ? `<img src="${image}" alt="">` : escapeHTML(song.initials)}</div>
        <div class="chart-info">
          <div class="chart-title">${escapeHTML(song.title)}</div>
          <div class="chart-artist">${escapeHTML(artistName(song.artistId))}</div>
        </div>
      </button>
      <button class="play-small" type="button" data-song="${i}" aria-label="Play">▶</button>
    </div>`;
}

function compactSongRow(song,index=0,options={}){
  const i = songs.indexOf(song);
  const favoriteOn = isFavorite(i);
  return `
    <div class="compact-song">
      <div class="compact-number">${index + 1}</div>
      <button class="compact-main" type="button" data-song="${i}">
        <div class="compact-art">${escapeHTML(song.initials)}</div>
        <div class="compact-info">
          <strong>${escapeHTML(song.title)}</strong>
          <span>${escapeHTML(artistName(song.artistId))} • ${escapeHTML(composerName(song.composerId))}</span>
        </div>
      </button>
      <button class="row-heart ${favoriteOn ? "active" : ""}" type="button" data-favorite-song="${i}">${favoriteOn ? "♥" : "♡"}</button>
      <button class="row-more" type="button" data-add-song="${i}">＋</button>
      <button class="row-play" type="button" data-song="${i}">▶</button>
    </div>`;
}

/* ---------- charts ---------- */

function getWeeklyTopSongs(){
  return songs
    .map((song,index)=>({song,index,count:Number(playCounts[song.id] || 0)}))
    .sort((a,b)=>b.count-a.count || a.index-b.index)
    .slice(0,12)
    .map(x=>x.song);
}

function getRecentSongs(){
  const result=[];
  recentSongIndexes.forEach(i=>{
    if(songs[i] && !result.includes(songs[i])) result.push(songs[i]);
  });
  songs.forEach(song=>{
    if(result.length < 12 && !result.includes(song)) result.push(song);
  });
  return result.slice(0,12);
}

function renderWeekly(){
  document.getElementById("weeklySongs").innerHTML =
    songs.slice(0,7).map((song,i)=>songCard(song,i)).join("");
}

function renderComposers(){
  document.getElementById("composers").innerHTML =
    composers.slice(0,7).map((composer,i)=>composerCard(composer,i)).join("");
}

function renderSingers(){
  const box=document.getElementById("singers");
  box.classList.add("singers-column");
  box.innerHTML=artists.slice(0,7).map((artist,i)=>singerCard(artist,i)).join("");
}

function renderTopChart(){
  document.getElementById("topChart").innerHTML =
    getWeeklyTopSongs().map((song,i)=>chartRow(song,i)).join("");
}

function renderRecent(){
  document.getElementById("recentChart").innerHTML =
    getRecentSongs().map((song,i)=>chartRow(song,i)).join("");
}

function playlistCardHTML(p, official=false){
  const count = official
    ? (officialPlaylistSongs[p[0]]?.length || 0)
    : (p.songIndexes?.length || 0);
  const name = official ? p[0] : p.name;
  const meta = official ? p[1] : `${count} song${count===1 ? "" : "s"}`;
  return `
    <button class="playlist-card" type="button"
      ${official ? `data-official-playlist="${escapeHTML(name)}"` : `data-user-playlist="${escapeHTML(p.id || "")}"`}>
      <div class="playlist-art">
        <div class="line"></div><div class="line2"></div>
        <div class="playlist-label">${escapeHTML(name)}</div>
        <div class="playlist-meta">${escapeHTML(meta)}</div>
      </div>
    </button>`;
}

function renderOfficialPlaylists(){
  document.getElementById("officialPlaylists").innerHTML =
    officialPlaylists.map(p=>playlistCardHTML(p,true)).join("");
}

function renderCategories(){
  document.getElementById("categories").innerHTML =
    categories.map(c=>`
      <button class="category-card ${c[1]}" type="button" data-category="${escapeHTML(c[0])}">
        <span></span><strong>${escapeHTML(c[0])}</strong>
      </button>`).join("");
}

function renderPlaylists(){
  const container=document.getElementById("myPlaylists");
  const userLists=playlists.filter(p=>p.id !== "favorites");
  let html=`
    <button class="create-playlist" id="createPlaylistButton" type="button">
      <div class="plus">+</div><strong>Create Playlist</strong>
    </button>`;
  html += userLists.map(p=>playlistCardHTML(p,false)).join("");
  container.innerHTML=html;
  document.getElementById("createPlaylistButton").onclick=()=>openCreatePlaylist();
}

/* ---------- playlist system ---------- */

function isFavorite(songIndex){
  return ensureFavoritesPlaylist().songIndexes.includes(Number(songIndex));
}

function toggleFavorite(songIndex){
  const fav=ensureFavoritesPlaylist();
  const i=Number(songIndex);
  const pos=fav.songIndexes.indexOf(i);
  if(pos >= 0) fav.songIndexes.splice(pos,1);
  else fav.songIndexes.push(i);
  savePlaylists();
  updateFavoriteButtons();
  renderPlaylists();
}

function addSongToPlaylist(songIndex, playlistId){
  const p=playlists.find(x=>x.id===playlistId);
  if(!p) return;
  p.songIndexes=Array.isArray(p.songIndexes) ? p.songIndexes : [];
  const i=Number(songIndex);
  if(!p.songIndexes.includes(i)) p.songIndexes.push(i);
  savePlaylists();
}

function addAlbumToPlaylist(albumId, playlistId){
  const p=playlists.find(x=>x.id===playlistId);
  const album=getAlbum(albumId);
  if(!p || !album) return;
  p.albumIds=Array.isArray(p.albumIds) ? p.albumIds : [];
  if(!p.albumIds.includes(albumId)) p.albumIds.push(albumId);
  p.songIndexes=Array.isArray(p.songIndexes) ? p.songIndexes : [];
  album.songs.forEach(i=>{ if(!p.songIndexes.includes(i)) p.songIndexes.push(i); });
  savePlaylists();
}

function openPlaylistChooser(type,id){
  pendingAddType=type;
  pendingAddId=id;
  const choices=playlists.map(p=>`
    <button class="playlist-choice" type="button" data-choose-playlist="${escapeHTML(p.id)}">
      <span>${escapeHTML(p.name)}</span>
      <small>${p.songIndexes?.length || 0} songs</small>
    </button>`).join("");
  showChooserModal(
    type==="song" ? "Add Song to Playlist" : "Add Album to Playlist",
    choices
  );
}

function showChooserModal(title,html){
  let box=document.getElementById("playlistChooserModal");
  if(!box){
    box=document.createElement("div");
    box.id="playlistChooserModal";
    box.className="modal-bg";
    box.innerHTML=`<div class="modal"><h2 id="chooserTitle"></h2><p>Select a playlist.</p><div id="chooserList" class="chooser-list"></div><button class="secondary" id="chooserCancel" type="button" style="width:100%;margin-top:12px;">Cancel</button></div>`;
    document.body.appendChild(box);
    document.getElementById("chooserCancel").onclick=()=>box.classList.remove("open");
  }
  document.getElementById("chooserTitle").textContent=title;
  document.getElementById("chooserList").innerHTML=html;
  box.classList.add("open");
  box.querySelectorAll("[data-choose-playlist]").forEach(btn=>{
    btn.onclick=()=>{
      const pid=btn.dataset.choosePlaylist;
      if(pendingAddType==="song") addSongToPlaylist(pendingAddId,pid);
      else addAlbumToPlaylist(pendingAddId,pid);
      box.classList.remove("open");
      renderPlaylists();
      alert("Added to " + (playlists.find(p=>p.id===pid)?.name || "playlist") + ".");
    };
  });
}

function openCreatePlaylist(){
  openModal("playlistModal");
  setTimeout(()=>document.getElementById("playlistName")?.focus(),50);
}

/* ---------- player ---------- */

function playSong(index){
  const i=Number(index);
  if(!songs[i]) return;
  currentSongIndex=i;
  playing=true;
  playCounts[songs[i].id]=Number(playCounts[songs[i].id]||0)+1;
  saveCounts();
  recentSongIndexes=[i,...recentSongIndexes.filter(x=>x!==i)].slice(0,12);
  localStorage.setItem("nc_recent",JSON.stringify(recentSongIndexes));
  updatePlayer();
  document.getElementById("bottomPlayer").classList.add("active");
  updatePlayButtons();
  renderTopChart();
  renderRecent();
}

function updatePlayer(){
  const song=songs[currentSongIndex];
  if(!song) return;
  const artist=getArtist(song.artistId);
  const image=song.image || artist?.image || "";
  document.getElementById("miniTitle").textContent=song.title;
  document.getElementById("miniArtist").textContent=artistName(song.artistId);
  document.getElementById("miniArt").innerHTML=image ? `<img src="${image}" alt="">` : escapeHTML(song.initials);
  document.getElementById("playerTitle").textContent=song.title;
  document.getElementById("playerArtist").textContent=`${artistName(song.artistId)} • ${composerName(song.composerId)}`;
  document.getElementById("bigArt").innerHTML=image ? `<img src="${image}" alt="">` : escapeHTML(song.initials);
  document.getElementById("favorite").classList.toggle("active",isFavorite(currentSongIndex));
  document.getElementById("favorite").textContent=isFavorite(currentSongIndex) ? "♥ Favorited" : "♡ Favorite";
  document.getElementById("progress").value=0;
  document.getElementById("currentTime").textContent="0:00";
  document.getElementById("duration").textContent=song.duration || "3:42";
  clearInterval(playerTimer);
  if(playing) startFakePlayback();
}

function startFakePlayback(){
  clearInterval(playerTimer);
  playerTimer=setInterval(()=>{
    if(!playing) return;
    const input=document.getElementById("progress");
    let value=Number(input.value)+0.35;
    if(value>=100){
      if(repeated){ value=0; }
      else { clearInterval(playerTimer); nextSong(); return; }
    }
    input.value=value;
    const total=parseDuration(document.getElementById("duration").textContent);
    const sec=Math.floor(total*value/100);
    document.getElementById("currentTime").textContent=formatTime(sec);
  },1000);
}

function parseDuration(v){
  const p=String(v||"3:42").split(":").map(Number);
  return (p[0]||0)*60+(p[1]||0);
}
function formatTime(sec){
  return `${Math.floor(sec/60)}:${String(Math.floor(sec%60)).padStart(2,"0")}`;
}
function updatePlayButtons(){
  document.getElementById("miniPlay").textContent=playing?"Ⅱ":"▶";
  document.getElementById("bigPlay").textContent=playing?"Ⅱ":"▶";
}
function togglePlaying(){
  if(!songs[currentSongIndex]) return;
  playing=!playing;
  updatePlayButtons();
  if(playing) startFakePlayback(); else clearInterval(playerTimer);
}
function openPlayer(){
  if(!songs[currentSongIndex]) return;
  document.getElementById("playerScreen").classList.add("open");
  document.body.classList.add("player-open");
}
function closePlayer(){
  document.getElementById("playerScreen").classList.remove("open");
  document.body.classList.remove("player-open");
}
function nextSong(){
  if(shuffled){
    let n=Math.floor(Math.random()*songs.length);
    if(songs.length>1 && n===currentSongIndex) n=(n+1)%songs.length;
    playSong(n); return;
  }
  playSong((currentSongIndex+1)%songs.length);
}
function previousSong(){
  playSong((currentSongIndex-1+songs.length)%songs.length);
}
function updateFavoriteButtons(){
  const f=document.getElementById("favorite");
  if(f){
    const on=isFavorite(currentSongIndex);
    f.textContent=on?"♥ Favorited":"♡ Favorite";
    f.classList.toggle("active",on);
  }
  document.querySelectorAll("[data-favorite-song]").forEach(b=>{
    const on=isFavorite(b.dataset.favoriteSong);
    b.textContent=on?"♥":"♡";
    b.classList.toggle("active",on);
  });
}

/* ---------- full-page navigation ---------- */

function closeBrowseScreens(){
  document.getElementById("libraryScreen").classList.remove("open");
  document.getElementById("detailScreen").classList.remove("open");
}

function setRoute(route){
  if(location.hash !== "#"+route) history.pushState({route},"","#"+route);
  renderRoute(route);
}

function home(){
  closeBrowseScreens();
  closePlayer();
  window.scrollTo({top:0,behavior:"smooth"});
  if(location.hash) history.pushState({route:"home"},"",location.pathname+location.search);
}

function renderRoute(route){
  if(!route || route==="home"){
    closeBrowseScreens();
    window.scrollTo(0,0);
    return;
  }
  if(route==="search"){
    renderSearchPage("");
    return;
  }
  if(route==="top12"){
    renderSongPage("Top 12 of the Week",getWeeklyTopSongs(),"Most listened to this week");
    return;
  }
  if(route==="recent"){
    renderSongPage("Recently Listened To",getRecentSongs(),"Your latest listening");
    return;
  }
  if(route==="weekly"){
    renderSongPage("Niggunim of the Week",songs.slice(0,12),"This week's featured niggunim");
    return;
  }
  if(route==="composers"){
    renderCollectionPage("Composers",composers.map((c,i)=>composerCard(c,i)).join(""));
    return;
  }
  if(route==="singers"){
    renderSingerPage();
    return;
  }
  if(route==="categories"){
    renderCollectionPage("Categories",categories.map(c=>`
      <button class="category-card ${c[1]}" type="button" data-category="${escapeHTML(c[0])}"><span></span><strong>${escapeHTML(c[0])}</strong></button>`).join(""));
    return;
  }
  if(route==="official-playlists"){
    renderOfficialPage();
    return;
  }
  if(route==="my-playlists"){
    renderMyPlaylistPage();
    return;
  }
  if(route.startsWith("category:")){
    const name=decodeURIComponent(route.slice(9));
    const indexes=categorySongs[name]||[];
    renderSongPage(name,indexes.map(i=>songs[i]).filter(Boolean),`${indexes.length} niggun${indexes.length===1?"":"im"}`);
    return;
  }
  if(route.startsWith("official:")){
    renderOfficialPlaylistPage(decodeURIComponent(route.slice(9)));
    return;
  }
  if(route.startsWith("playlist:")){
    renderUserPlaylistPage(decodeURIComponent(route.slice(9)));
    return;
  }
  if(route.startsWith("artist:")){
    openArtist(decodeURIComponent(route.slice(7)),false);
    return;
  }
  if(route.startsWith("composer:")){
    openComposer(decodeURIComponent(route.slice(9)),false);
    return;
  }
  if(route.startsWith("album:")){
    openAlbum(decodeURIComponent(route.slice(6)),false);
    return;
  }
  renderRoute("home");
}

function renderPageShell(title,sub,body){
  closeBrowseScreens();
  const grid=document.getElementById("libraryGrid");
  grid.className="page-body";
  grid.innerHTML=body;
  document.getElementById("libraryTitle").textContent=title;
  document.getElementById("libraryScreen").classList.add("open");
  const top=document.querySelector("#libraryScreen .library-top");
  let old=top.querySelector(".route-sub");
  if(old) old.remove();
  if(sub){
    const p=document.createElement("span");
    p.className="route-sub";
    p.textContent=sub;
    top.appendChild(p);
  }
  bindDynamic();
  window.scrollTo(0,0);
}

function renderSongPage(title,list,sub){
  renderPageShell(title,sub,`
    <div class="compact-list">
      ${list.map((song,i)=>compactSongRow(song,i)).join("") || `<div class="empty-state">No songs here yet.</div>`}
    </div>`);
}

function renderCollectionPage(title,html){
  renderPageShell(title,"Browse all",`<div class="collection-grid">${html}</div>`);
}

function renderSingerPage(){
  renderPageShell("Singers","Browse all",`
    <div class="singers-page-column">${artists.map((a,i)=>singerCard(a,i)).join("")}</div>`);
}

function renderOfficialPage(){
  const admin=isAdmin();
  renderPageShell("Chabad Niggunim Playlists","Official playlists",`
    ${admin ? `<div class="admin-bar"><strong>Admin mode</strong><button class="primary small-btn" id="createOfficial">＋ Create Official Playlist</button></div>` : ""}
    <div class="playlist-page-grid">${officialPlaylists.map(p=>playlistCardHTML(p,true)).join("")}</div>`);
  if(admin) document.getElementById("createOfficial").onclick=createOfficialPlaylist;
}

function renderMyPlaylistPage(){
  const userLists=playlists.filter(p=>p.id!=="favorites");
  renderPageShell("My Own Playlists","Private to your account on this device",`
    <button class="create-large" id="createPagePlaylist">＋ Create Your Playlist</button>
    <div class="playlist-page-grid">
      ${playlistCardHTML({id:"favorites",name:"My Favorites",songIndexes:ensureFavoritesPlaylist().songIndexes},false)}
      ${userLists.map(p=>playlistCardHTML(p,false)).join("")}
    </div>`);
  document.getElementById("createPagePlaylist").onclick=openCreatePlaylist;
}

function renderSearchPage(query){
  renderPageShell("Search","Songs, singers, composers, albums and playlists",`
    <div class="search-page">
      <input id="pageSearchInput" class="page-search-input" type="search" value="${escapeHTML(query)}" placeholder="Search NigguneiChabad..." autocomplete="off">
      <div id="pageSearchResults"></div>
    </div>`);
  const input=document.getElementById("pageSearchInput");
  input.oninput=()=>renderSearchResults(input.value);
  renderSearchResults(query);
  setTimeout(()=>input.focus(),50);
}

function renderSearchResults(query){
  const box=document.getElementById("pageSearchResults");
  if(!box) return;
  const q=query.trim().toLowerCase();
  if(!q){ box.innerHTML=`<div class="empty-state">Start typing to search songs, singers, composers, albums and playlists.</div>`; return; }
  const songsFound=songs.filter(s=>(s.title+" "+artistName(s.artistId)+" "+composerName(s.composerId)).toLowerCase().includes(q));
  const artistsFound=artists.filter(a=>a.name.toLowerCase().includes(q));
  const composersFound=composers.filter(c=>c.name.toLowerCase().includes(q));
  const albumsFound=albums.filter(a=>(a.title+" "+artistName(a.artistId)).toLowerCase().includes(q));
  const pls=officialPlaylists.filter(p=>p[0].toLowerCase().includes(q)).map(p=>p[0]);
  const users=playlists.filter(p=>p.name.toLowerCase().includes(q));
  let html="";
  if(songsFound.length) html+=`<h3 class="result-heading">Songs</h3>${songsFound.map((s,i)=>compactSongRow(s,i)).join("")}`;
  if(artistsFound.length) html+=`<h3 class="result-heading">Singers</h3>${artistsFound.map((a,i)=>`<button class="search-result-wide" data-artist="${a.id}">${artistArtHTML(a,i)}<span>${escapeHTML(a.name)}</span>›</button>`).join("")}`;
  if(composersFound.length) html+=`<h3 class="result-heading">Composers</h3>${composersFound.map(c=>`<button class="search-result-wide" data-composer="${c.id}"><div class="search-result-art">${escapeHTML(c.initials)}</div><span>${escapeHTML(c.name)}</span>›</button>`).join("")}`;
  if(albumsFound.length) html+=`<h3 class="result-heading">Albums</h3>${albumsFound.map(a=>`<button class="search-result-wide" data-album="${a.id}"><div class="search-result-art">${escapeHTML(a.title.split(" ").map(x=>x[0]).join("").slice(0,2))}</div><span>${escapeHTML(a.title)}<small>${escapeHTML(artistName(a.artistId))}</small></span>›</button>`).join("")}`;
  if(pls.length) html+=`<h3 class="result-heading">Chabad Niggunim Playlists</h3>${pls.map(n=>`<button class="search-result-wide" data-official-playlist="${escapeHTML(n)}"><div class="search-result-art">♫</div><span>${escapeHTML(n)}</span>›</button>`).join("")}`;
  if(users.length) html+=`<h3 class="result-heading">My Playlists</h3>${users.map(p=>`<button class="search-result-wide" data-user-playlist="${escapeHTML(p.id)}"><div class="search-result-art">♪</div><span>${escapeHTML(p.name)}</span>›</button>`).join("")}`;
  box.innerHTML=html || `<div class="empty-state">Nothing found for “${escapeHTML(query)}”.</div>`;
  bindDynamic();
}

/* ---------- details ---------- */

function openArtist(id,push=true){
  const artist=getArtist(id); if(!artist) return;
  if(push) setRoute("artist:"+encodeURIComponent(id));
  const artistAlbums=albums.filter(a=>a.artistId===id);
  const art=artist.image?`<img src="${artist.image}" alt="">`:escapeHTML(artist.name.split(" ").map(x=>x[0]).join("").slice(0,2));
  renderDetail(artist.name,`${artistAlbums.length} album${artistAlbums.length===1?"":"s"}`,art,`
    <div class="detail-albums">
      ${artistAlbums.map((a,i)=>`
        <div class="detail-album-card">
          <button class="music-card" type="button" data-album="${a.id}">${artHTML(a,i)}<div class="card-title">${escapeHTML(a.title)}</div><div class="card-subtitle">${a.songs.length} songs</div></button>
          <button class="tiny-add" type="button" data-add-album="${a.id}">＋ Add Album to Playlist</button>
        </div>`).join("")}
    </div>
    <h3 class="detail-section-title">Songs</h3>
    <div class="compact-list">${songs.filter(s=>s.artistId===id).map((s,i)=>compactSongRow(s,i)).join("")}</div>`);
}

function openAlbum(id,push=true){
  const album=getAlbum(id); if(!album) return;
  if(push) setRoute("album:"+encodeURIComponent(id));
  const artist=getArtist(album.artistId);
  renderDetail(album.title,`${artistName(album.artistId)} • ${album.songs.length} songs`,
    artHTML(album,0),
    `<div class="detail-actions"><button class="primary small-btn" data-add-album="${album.id}">＋ Add Album to Playlist</button><button class="secondary small-btn" data-play-album="${album.id}">▶ Play Album</button></div>
     <div class="compact-list">${album.songs.map((i,n)=>compactSongRow(songs[i],n)).join("")}</div>`);
}

function openComposer(id,push=true){
  const composer=getComposer(id); if(!composer) return;
  if(push) setRoute("composer:"+encodeURIComponent(id));
  const list=songs.filter(s=>s.composerId===id);
  renderDetail(composer.name,`${list.length} niggun${list.length===1?"":"im"}`,
    `<div class="detail-heading-art">${escapeHTML(composer.initials)}</div>`,
    `<div class="compact-list">${list.map((s,i)=>compactSongRow(s,i)).join("") || `<div class="empty-state">No songs yet.</div>`}</div>`);
}

function renderDetail(title,sub,art,html){
  document.getElementById("libraryScreen").classList.remove("open");
  document.getElementById("detailTitle").textContent=title;
  document.getElementById("detailHeading").textContent=title;
  document.getElementById("detailSubheading").textContent=sub||"";
  document.getElementById("detailArt").innerHTML=art;
  document.getElementById("detailSongs").className="detail-song-list";
  document.getElementById("detailSongs").innerHTML=html;
  document.getElementById("detailScreen").classList.add("open");
  bindDynamic();
  window.scrollTo(0,0);
}

function renderOfficialPlaylistPage(name){
  const p=officialPlaylists.find(x=>x[0]===name); if(!p) return;
  const list=(officialPlaylistSongs[name]||[]).map(i=>songs[i]).filter(Boolean);
  renderDetail(name,p[1],`<div class="detail-heading-art">♫</div>`,
    `<div class="detail-actions"><button class="primary small-btn" data-play-list='${escapeHTML(JSON.stringify(list.map(s=>songs.indexOf(s))))}'>▶ Play Playlist</button></div>
     <div class="compact-list">${list.map((s,i)=>compactSongRow(s,i)).join("")}</div>`);
}

function renderUserPlaylistPage(id){
  const p=playlists.find(x=>x.id===id); if(!p) return;
  const list=(p.songIndexes||[]).map(i=>songs[i]).filter(Boolean);
  renderDetail(p.name,`${list.length} songs • private`,
    `<div class="detail-heading-art">♪</div>`,
    `<div class="detail-actions"><button class="primary small-btn" data-play-list='${escapeHTML(JSON.stringify(p.songIndexes||[]))}'>▶ Play Playlist</button></div>
     <div class="compact-list">${list.map((s,i)=>compactSongRow(s,i)).join("") || `<div class="empty-state">This playlist is empty. Add songs with ＋.</div>`}</div>`);
}

/* ---------- admin ---------- */

function isAdmin(){
  const account=JSON.parse(localStorage.getItem("nc_demo_account")||"null");
  return localStorage.getItem("nc_demo_admin")==="true" ||
    account?.email?.toLowerCase()==="admin@nigguneichabad.com";
}

function createOfficialPlaylist(){
  if(!isAdmin()){ alert("Admin access required."); return; }
  const name=prompt("Official playlist name:");
  if(!name?.trim()) return;
  const count=prompt("How many songs should it contain?","0");
  officialPlaylists.push([name.trim(),`${Number(count)||0} songs`]);
  officialPlaylistSongs[name.trim()]=[];
  renderOfficialPage();
}

/* ---------- dynamic click binding ---------- */

function bindDynamic(){
  document.querySelectorAll("[data-song]").forEach(el=>{
    if(el.dataset.bound) return;
    el.dataset.bound="1";
    el.addEventListener("click",()=>playSong(el.dataset.song));
  });
  document.querySelectorAll("[data-artist]").forEach(el=>{
    if(el.dataset.bound) return;
    el.dataset.bound="1";
    el.addEventListener("click",()=>openArtist(el.dataset.artist));
  });
  document.querySelectorAll("[data-composer]").forEach(el=>{
    if(el.dataset.bound) return;
    el.dataset.bound="1";
    el.addEventListener("click",()=>openComposer(el.dataset.composer));
  });
  document.querySelectorAll("[data-album]").forEach(el=>{
    if(el.dataset.bound) return;
    el.dataset.bound="1";
    el.addEventListener("click",()=>openAlbum(el.dataset.album));
  });
  document.querySelectorAll("[data-category]").forEach(el=>{
    if(el.dataset.bound) return;
    el.dataset.bound="1";
    el.addEventListener("click",()=>setRoute("category:"+encodeURIComponent(el.dataset.category)));
  });
  document.querySelectorAll("[data-official-playlist]").forEach(el=>{
    if(el.dataset.bound) return;
    el.dataset.bound="1";
    el.addEventListener("click",()=>setRoute("official:"+encodeURIComponent(el.dataset.officialPlaylist)));
  });
  document.querySelectorAll("[data-user-playlist]").forEach(el=>{
    if(el.dataset.bound) return;
    el.dataset.bound="1";
    el.addEventListener("click",()=>setRoute("playlist:"+encodeURIComponent(el.dataset.userPlaylist)));
  });
  document.querySelectorAll("[data-favorite-song]").forEach(el=>{
    if(el.dataset.bound) return;
    el.dataset.bound="1";
    el.addEventListener("click",e=>{e.stopPropagation();toggleFavorite(el.dataset.favoriteSong);});
  });
  document.querySelectorAll("[data-add-song]").forEach(el=>{
    if(el.dataset.bound) return;
    el.dataset.bound="1";
    el.addEventListener("click",e=>{e.stopPropagation();openPlaylistChooser("song",el.dataset.addSong);});
  });
  document.querySelectorAll("[data-add-album]").forEach(el=>{
    if(el.dataset.bound) return;
    el.dataset.bound="1";
    el.addEventListener("click",e=>{e.stopPropagation();openPlaylistChooser("album",el.dataset.addAlbum);});
  });
  document.querySelectorAll("[data-play-album]").forEach(el=>{
    if(el.dataset.bound) return;
    el.dataset.bound="1";
    el.addEventListener("click",()=>{
      const a=getAlbum(el.dataset.playAlbum);
      if(a?.songs?.length) playSong(a.songs[0]);
    });
  });
  document.querySelectorAll("[data-play-list]").forEach(el=>{
    if(el.dataset.bound) return;
    el.dataset.bound="1";
    el.addEventListener("click",()=>{
      try{
        const list=JSON.parse(el.dataset.playList);
        if(list.length) playSong(list[0]);
      }catch{}
    });
  });
}

/* ---------- auth ---------- */

function updateAuthUI(){
  const account=JSON.parse(localStorage.getItem("nc_demo_account")||"null");
  const user=localStorage.getItem("nc_demo_user");
  const button=document.getElementById("authButton");
  button.textContent=user?(account?.firstName||"Account"):"Sign In";
}

function updateAuthFields(){
  const signup=document.getElementById("signupFields");
  const confirm=document.getElementById("authConfirmPassword");
  const password=document.getElementById("authPassword");
  const title=document.getElementById("authTitle");
  const desc=document.getElementById("authDescription");
  const switchBtn=document.getElementById("switchAuth");
  const submit=document.getElementById("submitAuth");
  const on=authMode==="signup";
  signup.style.display=on?"block":"none";
  confirm.style.display=on?"block":"none";
  title.textContent=on?"Create Account":"Sign In";
  desc.textContent=on?"Create a local demo account.":"Sign in to your NigguneiChabad account.";
  switchBtn.textContent=on?"Already have an account":"Create Account";
  submit.textContent=on?"Create Account":"Sign In";
  password.autocomplete=on?"new-password":"current-password";
}

function openAuth(){
  openModal("authModal");
  updateAuthFields();
  setTimeout(()=>document.getElementById(authMode==="signup"?"authFirstName":"authEmail")?.focus(),50);
}

function submitAuth(){
  const email=document.getElementById("authEmail").value.trim();
  const password=document.getElementById("authPassword").value;
  if(!email || !password){ alert("Please enter your email and password."); return; }
  if(authMode==="signup"){
    const firstName=document.getElementById("authFirstName").value.trim();
    const lastName=document.getElementById("authLastName").value.trim();
    const phone=document.getElementById("authPhone").value.trim();
    const confirm=document.getElementById("authConfirmPassword").value;
    if(!firstName || !lastName || password!==confirm){ alert("Please complete the account fields and make sure the passwords match."); return; }
    localStorage.setItem("nc_demo_account",JSON.stringify({firstName,lastName,phone,email,password}));
    localStorage.setItem("nc_demo_user",email);
    ensureFavoritesPlaylist();
    closeModal("authModal");
    updateAuthUI();
    return;
  }
  const account=JSON.parse(localStorage.getItem("nc_demo_account")||"null");
  if(account && account.email===email && account.password===password){
    localStorage.setItem("nc_demo_user",email);
    ensureFavoritesPlaylist();
    closeModal("authModal");
    updateAuthUI();
  }else{
    alert("For this demo, create an account first on this device.");
  }
}

/* ---------- modal helpers ---------- */

function openModal(id){ document.getElementById(id)?.classList.add("open"); }
function closeModal(id){ document.getElementById(id)?.classList.remove("open"); }

/* ---------- playlist create ---------- */

function saveNewPlaylist(){
  const input=document.getElementById("playlistName");
  const name=input.value.trim();
  if(!name){ alert("Please enter a playlist name."); input.focus(); return; }
  const id="playlist_"+Date.now();
  playlists.push({id,name,songIndexes:[],albumIds:[]});
  savePlaylists();
  input.value="";
  closeModal("playlistModal");
  renderPlaylists();
  alert(`Created “${name}”.`);
}

/* ---------- home wiring ---------- */

document.getElementById("homeButton").onclick=home;

document.getElementById("searchButton").onclick=()=>{
  setRoute("search");
};

document.getElementById("authButton").onclick=openAuth;

document.querySelectorAll(".see-all").forEach(button=>{
  button.onclick=()=>{
    const section=button.dataset.section;
    const routes={
      "Niggunim of the Week":"weekly",
      "Composers":"composers",
      "Top 12 of the Week":"top12",
      "Chabad Niggunim Playlists":"official-playlists",
      "My Own Playlists":"my-playlists",
      "Singers":"singers",
      "Recently Listened To":"recent",
      "Categories":"categories"
    };
    setRoute(routes[section]);
  };
});

/* ---------- player wiring ---------- */

document.getElementById("miniArt").onclick=openPlayer;
document.getElementById("miniInfo").onclick=openPlayer;
document.getElementById("miniPlay").onclick=e=>{e.stopPropagation();togglePlaying();};
document.getElementById("closePlayer").onclick=closePlayer;
document.getElementById("playerHome").onclick=()=>{closePlayer();home();};
document.getElementById("bigPlay").onclick=togglePlaying;
document.getElementById("next").onclick=nextSong;
document.getElementById("previous").onclick=previousSong;

document.getElementById("shuffle").onclick=()=>{
  shuffled=!shuffled;
  document.getElementById("shuffle").classList.toggle("active",shuffled);
};
document.getElementById("repeat").onclick=()=>{
  repeated=!repeated;
  document.getElementById("repeat").classList.toggle("active",repeated);
};
document.getElementById("favorite").onclick=()=>toggleFavorite(currentSongIndex);
document.getElementById("addPlaylist").onclick=()=>openPlaylistChooser("song",currentSongIndex);

document.getElementById("progress").oninput=function(){
  const total=parseDuration(document.getElementById("duration").textContent);
  const sec=Math.floor(total*Number(this.value)/100);
  document.getElementById("currentTime").textContent=formatTime(sec);
};

document.getElementById("switchAuth").onclick=()=>{
  authMode=authMode==="signin"?"signup":"signin";
  updateAuthFields();
};
document.getElementById("submitAuth").onclick=submitAuth;
document.getElementById("closeAuth").onclick=()=>closeModal("authModal");

["authFirstName","authLastName","authPhone","authEmail","authPassword","authConfirmPassword"].forEach(id=>{
  document.getElementById(id)?.addEventListener("keydown",e=>{
    if(e.key==="Enter"){e.preventDefault();submitAuth();}
  });
});

document.getElementById("cancelPlaylist").onclick=()=>closeModal("playlistModal");
document.getElementById("savePlaylist").onclick=saveNewPlaylist;
document.getElementById("playlistName").addEventListener("keydown",e=>{
  if(e.key==="Enter"){e.preventDefault();saveNewPlaylist();}
});

document.getElementById("closeDetail").onclick=()=>{
  if(history.length>1) history.back(); else home();
};
document.getElementById("closeLibrary").onclick=()=>{
  if(history.length>1) history.back(); else home();
};

window.addEventListener("popstate",()=>{
  renderRoute(location.hash.slice(1));
});

window.addEventListener("hashchange",()=>{
  renderRoute(location.hash.slice(1));
});

/* ---------- initial render ---------- */

renderWeekly();
renderComposers();
renderTopChart();
renderRecent();
renderOfficialPlaylists();
renderSingers();
renderCategories();
renderPlaylists();
bindDynamic();
updateAuthUI();
updateAuthFields();
updatePlayer();
renderRoute(location.hash.slice(1));
