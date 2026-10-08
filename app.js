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
   STATE
========================================================= */

let currentSongIndex = 0;
let playing = false;
let shuffled = false;
let repeated = false;
let favorite = false;
let authMode = "signin";

let recentSongIndexes =
  JSON.parse(
    localStorage.getItem("nc_recent") || "[]"
  );

let playlists =
  JSON.parse(
    localStorage.getItem("nc_playlists") || "[]"
  );

/* =========================================================
   HELPERS
========================================================= */

function getArtist(id){
  return artists.find(a => a.id === id);
}

function getAlbum(id){
  return albums.find(a => a.id === id);
}

function getComposer(id){
  return composers.find(c => c.id === id);
}

function artistName(id){
  const a = getArtist(id);
  return a ? a.name : "Chabad Niggun";
}

function composerName(id){
  const c = getComposer(id);
  return c ? c.name : "Chabad";
}

function artClass(index){
  return "a" + ((index % 8) + 1);
}

function artHTML(item,index=0){

  const image =
    item.image ||
    (
      item.artistId
        ? getArtist(item.artistId)?.image
        : ""
    );

  if(image){

    return `
      <div class="art ${artClass(index)}">
        <img src="${image}" alt="">
      </div>
    `;

  }

  const initials =
    item.initials ||
    item.name?.split(" ").map(x=>x[0]).join("").slice(0,2) ||
    "NC";

  return `
    <div class="art ${artClass(index)}">
      <div class="art-content">
        <div class="art-initial">${initials}</div>
      </div>
    </div>
  `;
}

function artistArtHTML(artist,index=0){

  if(artist.image){

    return `
      <div class="art ${artClass(index)}">
        <img src="${artist.image}" alt="${artist.name}">
      </div>
    `;

  }

  return `
    <div class="art ${artClass(index)}">
      <div class="art-content">
        <div class="art-initial">
          ${artist.name.split(" ").map(x=>x[0]).join("").slice(0,2)}
        </div>
      </div>
    </div>
  `;
}

/* =========================================================
   SONG CARDS
========================================================= */

function songCard(song,index){

  return `
    <button
      class="music-card"
      type="button"
      data-song="${songs.indexOf(song)}"
    >

      ${artHTML(song,index)}

      <div class="card-title">
        ${song.title}
      </div>

      <div class="card-subtitle">
        ${artistName(song.artistId)}
      </div>

    </button>
  `;
}

/* =========================================================
   COMPOSER CARDS
========================================================= */

function composerCard(composer,index){

  return `
    <button
      class="music-card"
      type="button"
      data-composer="${composer.id}"
    >

      <div class="art ${artClass(index)}">

        <div class="art-content">

          <div class="art-initial">
            ${composer.initials}
          </div>

        </div>

      </div>

      <div class="card-title">
        ${composer.name}
      </div>

      <div class="card-subtitle">
        Composer
      </div>

    </button>
  `;
}

/* =========================================================
   ARTIST CARDS
========================================================= */

function singerCard(artist,index){

  return `
    <button
      class="music-card"
      type="button"
      data-artist="${artist.id}"
    >

      ${artistArtHTML(artist,index)}

      <div class="card-title">
        ${artist.name}
      </div>

      <div class="card-subtitle">
        Singer
      </div>

    </button>
  `;
}

/* =========================================================
   CHART ROW
========================================================= */

function chartRow(song,index){

  const songIndex =
    songs.indexOf(song);

  const image =
    song.image ||
    getArtist(song.artistId)?.image ||
    "";

  return `
    <div class="chart-row">

      <div class="chart-number">
        ${index+1}
      </div>

      <button
        class="chart-song"
        type="button"
        data-song="${songIndex}"
      >

        <div class="chart-mini-art">

          ${
            image
              ? `<img src="${image}" alt="">`
              : song.initials
          }

        </div>

        <div class="chart-info">

          <div class="chart-title">
            ${song.title}
          </div>

          <div class="chart-artist">
            ${artistName(song.artistId)}
          </div>

        </div>

      </button>

      <button
        class="play-small"
        type="button"
        data-song="${songIndex}"
      >▶</button>

    </div>
  `;
}

/* =========================================================
   RENDER HOME
========================================================= */

function renderWeekly(){

  document.getElementById("weeklySongs").innerHTML =
    songs
      .slice(0,6)
      .map((song,i)=>songCard(song,i))
      .join("");

}

function renderComposers(){

  document.getElementById("composers").innerHTML =
    composers
      .map((composer,i)=>composerCard(composer,i))
      .join("");

}

function renderSingers(){

  document.getElementById("singers").innerHTML =
    artists
      .map((artist,i)=>singerCard(artist,i))
      .join("");

}

function renderTopChart(){

  document.getElementById("topChart").innerHTML =
    songs
      .slice(0,12)
      .map((song,i)=>chartRow(song,i))
      .join("");

}

function getRecentSongs(){

  const result = [];

  recentSongIndexes.forEach(index=>{

    const song = songs[index];

    if(song && !result.includes(song)){
      result.push(song);
    }

  });

  songs.forEach(song=>{

    if(result.length < 12 &&
       !result.includes(song)){

      result.push(song);

    }

  });

  return result.slice(0,12);
}

function renderRecent(){

  document.getElementById("recentChart").innerHTML =
    getRecentSongs()
      .map((song,i)=>chartRow(song,i))
      .join("");

}

function renderOfficialPlaylists(){

  document.getElementById("officialPlaylists").innerHTML =
    officialPlaylists.map(p=>`

      <button
        class="playlist-card"
        type="button"
      >

        <div class="playlist-art">

          <div class="line"></div>
          <div class="line2"></div>

          <div class="playlist-label">
            ${p[0]}
          </div>

          <div class="playlist-meta">
            ${p[1]}
          </div>

        </div>

      </button>

    `).join("");

}

function renderCategories(){

  document.getElementById("categories").innerHTML =
    categories.map(c=>`

      <button
        class="category-card ${c[1]}"
        type="button"
      >

        <span></span>

        <strong>${c[0]}</strong>

      </button>

    `).join("");

}

function renderPlaylists(){

  const container =
    document.getElementById("myPlaylists");

  let html = `

    <button
      class="create-playlist"
      id="createPlaylistButton"
      type="button"
    >

      <div class="plus">+</div>

      <strong>Create Playlist</strong>

    </button>
  `;

  html += playlists.map(p=>`

    <button
      class="playlist-card"
      type="button"
    >

      <div class="playlist-art">

        <div class="line"></div>
        <div class="line2"></div>

        <div class="playlist-label">
          ${p.name}
        </div>

        <div class="playlist-meta">
          ${p.songIndexes?.length || 0} songs
        </div>

      </div>

    </button>

  `).join("");

  container.innerHTML = html;

  document
    .getElementById("createPlaylistButton")
    .addEventListener("click",()=>{

      openModal("playlistModal");

      setTimeout(()=>{
        document
          .getElementById("playlistName")
          .focus();
      },100);

    });

}

/* =========================================================
   PLAYER
========================================================= */

function playSong(index){

  index = Number(index);

  if(!songs[index]) return;

  currentSongIndex = index;

  recentSongIndexes = [
    index,
    ...recentSongIndexes.filter(i=>i !== index)
  ].slice(0,12);

  localStorage.setItem(
    "nc_recent",
    JSON.stringify(recentSongIndexes)
  );

  playing = true;

  updatePlayer();

  document
    .getElementById("bottomPlayer")
    .classList.add("active");

  updatePlayButtons();

}

function updatePlayer(){

  const song =
    songs[currentSongIndex];

  const artist =
    getArtist(song.artistId);

  const songImage =
    song.image ||
    artist?.image ||
    "";

  document
    .getElementById("miniTitle")
    .textContent =
      song.title;

  document
    .getElementById("miniArtist")
    .textContent =
      artistName(song.artistId);

  const miniArt =
    document.getElementById("miniArt");

  miniArt.innerHTML =
    songImage
      ? `<img src="${songImage}" alt="">`
      : song.initials;

  document
    .getElementById("playerTitle")
    .textContent =
      song.title;

  document
    .getElementById("playerArtist")
    .textContent =
      artistName(song.artistId) +
      " • " +
      composerName(song.composerId);

  const bigArt =
    document.getElementById("bigArt");

  bigArt.innerHTML =
    songImage
      ? `<img src="${songImage}" alt="">`
      : song.initials;

  renderRecent();

  attachDynamicListeners();

}

function updatePlayButtons(){

  document
    .getElementById("miniPlay")
    .textContent =
      playing ? "Ⅱ" : "▶";

  document
    .getElementById("bigPlay")
    .textContent =
      playing ? "Ⅱ" : "▶";

}

function openPlayer(){

  if(!songs[currentSongIndex]) return;

  document
    .getElementById("playerScreen")
    .classList.add("open");

}

function closePlayer(){

  document
    .getElementById("playerScreen")
    .classList.remove("open");

}

function nextSong(){

  if(shuffled){

    let next =
      Math.floor(Math.random()*songs.length);

    if(songs.length > 1 &&
       next === currentSongIndex){

      next =
        (next + 1) % songs.length;

    }

    playSong(next);
    return;

  }

  const next =
    (currentSongIndex + 1) % songs.length;

  playSong(next);

}

function previousSong(){

  const previous =
    (currentSongIndex - 1 + songs.length)
    % songs.length;

  playSong(previous);

}

/* =========================================================
   DETAIL PAGES
========================================================= */

function openDetail(title,subheading,art,html){

  document
    .getElementById("detailTitle")
    .textContent = title;

  document
    .getElementById("detailHeading")
    .textContent = title;

  document
    .getElementById("detailSubheading")
    .textContent = subheading || "";

  document
    .getElementById("detailArt")
    .innerHTML = art;

  document
    .getElementById("detailSongs")
    .innerHTML = html;

  document
    .getElementById("detailScreen")
    .classList.add("open");

  attachDynamicListeners();

}

function openArtist(id){

  const artist =
    getArtist(id);

  if(!artist) return;

  const artistAlbums =
    albums.filter(a=>a.artistId === id);

  const art =
    artist.image
      ? `<img src="${artist.image}" alt="${artist.name}">`
      : artist.name
          .split(" ")
          .map(x=>x[0])
          .join("")
          .slice(0,2);

  let html = "";

  artistAlbums.forEach((album,index)=>{

    html += `

      <button
        class="music-card"
        type="button"
        data-album="${album.id}"
      >

        ${
          album.image
            ? `
              <div class="art ${artClass(index)}">
                <img src="${album.image}" alt="">
              </div>
            `
            :
            `
              <div class="art ${artClass(index)}">
                <div class="art-content">
                  <div class="art-initial">
                    ${album.title
                      .split(" ")
                      .map(x=>x[0])
                      .join("")
                      .slice(0,2)}
                  </div>
                </div>
              </div>
            `
        }

        <div class="card-title">
          ${album.title}
        </div>

        <div class="card-subtitle">
          ${album.songs.length} songs
        </div>

      </button>
    `;

  });

  document
    .getElementById("detailSongs")
    .className = "horizontal";

  openDetail(
    artist.name,
    "Albums",
    art,
    html || `
      <p style="color:#777">
        No albums yet.
      </p>
    `
  );

}

function openAlbum(id){

  const album =
    getAlbum(id);

  if(!album) return;

  const artist =
    getArtist(album.artistId);

  const html =
    album.songs.map(songIndex=>{

      const song =
        songs[songIndex];

      return `

        <button
          class="detail-song"
          type="button"
          data-song="${songIndex}"
        >

          <div class="detail-song-art">
            ${song.initials}
          </div>

          <div class="detail-song-info">

            <div class="detail-song-title">
              ${song.title}
            </div>

            <div class="detail-song-sub">
              ${artistName(song.artistId)}
            </div>

          </div>

          <div class="detail-play">
            ▶
          </div>

        </button>

      `;

    }).join("");

  document
    .getElementById("detailSongs")
    .className = "detail-song-list";

  const albumImage =
    album.image ||
    artist?.image ||
    "";

  const art =
    albumImage
      ? `<img src="${albumImage}" alt="${album.title}">`
      : album.title
          .split(" ")
          .map(x=>x[0])
          .join("")
          .slice(0,2);

  openDetail(
    album.title,
    artist
      ? artist.name + " • Album"
      : "Album",
    art,
    html
  );

}

function openComposer(id){

  const composer =
    getComposer(id);

  if(!composer) return;

  const composerSongs =
    songs.filter(
      song => song.composerId === id
    );

  const html =
    composerSongs.map((song,index)=>{

      const songIndex =
        songs.indexOf(song);

      return `

        <button
          class="detail-song"
          type="button"
          data-song="${songIndex}"
        >

          <div class="detail-song-art">
            ${song.initials}
          </div>

          <div class="detail-song-info">

            <div class="detail-song-title">
              ${song.title}
            </div>

            <div class="detail-song-sub">
              ${artistName(song.artistId)}
            </div>

          </div>

          <div class="detail-play">
            ▶
          </div>

        </button>

      `;

    }).join("");

  document
    .getElementById("detailSongs")
    .className = "detail-song-list";

  openDetail(
    composer.name,
    "Songs by this composer",
    composer.initials,
    html ||
      `<p style="color:#777">
        No songs yet.
      </p>`
  );

}

/* =========================================================
   SEARCH
========================================================= */

function doSearch(){

  const q =
    document
      .getElementById("searchInput")
      .value
      .trim()
      .toLowerCase();

  const results =
    document.getElementById("searchResults");

  if(!q){

    results.innerHTML =
      `<p style="color:#777">
        Start typing to search.
      </p>`;

    return;

  }

  const foundSongs =
    songs.filter(song=>
      song.title.toLowerCase().includes(q) ||
      artistName(song.artistId)
        .toLowerCase()
        .includes(q) ||
      composerName(song.composerId)
        .toLowerCase()
        .includes(q)
    );

  const foundArtists =
    artists.filter(artist=>
      artist.name.toLowerCase().includes(q)
    );

  const foundAlbums =
    albums.filter(album=>
      album.title.toLowerCase().includes(q)
    );

  const foundComposers =
    composers.filter(composer=>
      composer.name.toLowerCase().includes(q)
    );

  let html = "";

  foundSongs.forEach(song=>{

    const index =
      songs.indexOf(song);

    html += `

      <button
        class="search-result"
        type="button"
        data-search-song="${index}"
      >

        <div class="search-result-art">
          ${song.initials}
        </div>

        <div class="search-result-info">

          <div class="search-result-title">
            ${song.title}
          </div>

          <div class="search-result-sub">
            Song • ${artistName(song.artistId)}
          </div>

        </div>

      </button>

    `;

  });

  foundArtists.forEach(artist=>{

    html += `

      <button
        class="search-result"
        type="button"
        data-search-artist="${artist.id}"
      >

        <div class="search-result-art">
          ${
            artist.image
              ? `<img src="${artist.image}" alt="">`
              :
              artist.name
                .split(" ")
                .map(x=>x[0])
                .join("")
                .slice(0,2)
          }
        </div>

        <div class="search-result-info">

          <div class="search-result-title">
            ${artist.name}
          </div>

          <div class="search-result-sub">
            Singer / Artist
          </div>

        </div>

      </button>

    `;

  });

  foundAlbums.forEach(album=>{

    html += `

      <button
        class="search-result"
        type="button"
        data-search-album="${album.id}"
      >

        <div class="search-result-art">
          ${
            album.title
              .split(" ")
              .map(x=>x[0])
              .join("")
              .slice(0,2)
          }
        </div>

        <div class="search-result-info">

          <div class="search-result-title">
            ${album.title}
          </div>

          <div class="search-result-sub">
            Album • ${artistName(album.artistId)}
          </div>

        </div>

      </button>

    `;

  });

  foundComposers.forEach(composer=>{

    html += `

      <button
        class="search-result"
        type="button"
        data-search-composer="${composer.id}"
      >

        <div class="search-result-art">
          ${composer.initials}
        </div>

        <div class="search-result-info">

          <div class="search-result-title">
            ${composer.name}
          </div>

          <div class="search-result-sub">
            Composer
          </div>

        </div>

      </button>

    `;

  });

  results.innerHTML =
    html ||
    `<p style="color:#777">
      Nothing found.
    </p>`;

  results
    .querySelectorAll("[data-search-song]")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        playSong(button.dataset.searchSong);

        closeModal("searchModal");

        openPlayer();

      });

    });

  results
    .querySelectorAll("[data-search-artist]")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        closeModal("searchModal");

        openArtist(button.dataset.searchArtist);

      });

    });

  results
    .querySelectorAll("[data-search-album]")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        closeModal("searchModal");

        openAlbum(button.dataset.searchAlbum);

      });

    });

  results
    .querySelectorAll("[data-search-composer]")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        closeModal("searchModal");

        openComposer(button.dataset.searchComposer);

      });

    });

}

/* =========================================================
   SEE ALL
========================================================= */

function openLibrary(section){

  document
    .getElementById("libraryTitle")
    .textContent = section;

  const grid =
    document.getElementById("libraryGrid");

  let html = "";

  if(
    section === "Top 12 of the Week" ||
    section === "Recently Listened To" ||
    section === "Niggunim of the Week"
  ){

    const list =
      section === "Recently Listened To"
        ? getRecentSongs()
        : songs.slice(0,12);

    html =
      list.map((song,i)=>
        songCard(song,i)
      ).join("");

  }else if(section === "Composers"){

    html =
      composers
        .map((composer,i)=>
          composerCard(composer,i)
        )
        .join("");

  }else if(section === "Singers"){

    html =
      artists
        .map((artist,i)=>
          singerCard(artist,i)
        )
        .join("");

  }else if(section === "Categories"){

    html =
      categories.map(c=>`

        <button
          class="category-card ${c[1]}"
          type="button"
        >

          <span></span>

          <strong>${c[0]}</strong>

        </button>

      `).join("");

  }else if(
    section === "Chabad Niggunim Playlists"
  ){

    html =
      officialPlaylists.map(p=>`

        <button
          style="text-align:left;background:none;"
          type="button"
        >

          <div
            class="playlist-art"
            style="width:100%;height:150px;"
          >

            <div class="line"></div>
            <div class="line2"></div>

            <div class="playlist-label">
              ${p[0]}
            </div>

            <div class="playlist-meta">
              ${p[1]}
            </div>

          </div>

        </button>

      `).join("");

  }else if(
    section === "My Own Playlists"
  ){

    html =
      playlists.length
        ?
        playlists.map(p=>`

          <button
            style="text-align:left;background:none;"
            type="button"
          >

            <div
              class="playlist-art"
              style="width:100%;height:150px;"
            >

              <div class="line"></div>
              <div class="line2"></div>

              <div class="playlist-label">
                ${p.name}
              </div>

              <div class="playlist-meta">
                ${p.songIndexes?.length || 0}
                songs
              </div>

            </div>

          </button>

        `).join("")
        :
        `
          <p style="color:#777">
            You haven't created any playlists yet.
          </p>
        `;

  }

  grid.innerHTML = html;

  document
    .getElementById("libraryScreen")
    .classList.add("open");

  attachDynamicListeners();

}

/* =========================================================
   MODALS
========================================================= */

function openModal(id){

  document
    .getElementById(id)
    .classList.add("open");

}

function closeModal(id){

  document
    .getElementById(id)
    .classList.remove("open");

}

/* =========================================================
   AUTH
========================================================= */

function updateAuthUI(){

  const account =
    JSON.parse(
      localStorage.getItem("nc_demo_account") || "null"
    );

  const user =
    localStorage.getItem("nc_demo_user");

  const button =
    document.getElementById("authButton");

  if(user){

    button.textContent =
      account?.firstName
        ? account.firstName
        : "Account";

  }else{

    button.textContent =
      "Sign In";

  }

}

function updateAuthFields(){

  const signup =
    document.getElementById("signupFields");

  const confirm =
    document.getElementById("authConfirmPassword");

  const password =
    document.getElementById("authPassword");

  if(authMode === "signup"){

    signup.style.display = "block";

    confirm.style.display = "block";

    password.autocomplete =
      "new-password";

    confirm.autocomplete =
      "new-password";

  }else{

    signup.style.display = "none";

    confirm.style.display = "none";

    password.autocomplete =
      "current-password";

  }

}

function openAuth(){

  openModal("authModal");

  updateAuthFields();

  setTimeout(()=>{

    const target =
      authMode === "signup"
        ? "authFirstName"
        : "authEmail";

    document
      .getElementById(target)
      .focus();

  },100);

}

function submitAuth(){

  const email =
    document
      .getElementById("authEmail")
      .value
      .trim();

  const password =
    document
      .getElementById("authPassword")
      .value;

  if(authMode === "signup"){

    const firstName =
      document
        .getElementById("authFirstName")
        .value
        .trim();

    const lastName =
      document
        .getElementById("authLastName")
        .value
        .trim();

    const phone =
      document
        .getElementById("authPhone")
        .value
        .trim();

    const confirmPassword =
      document
        .getElementById("authConfirmPassword")
        .value;

    if(
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ){

      alert(
        "Please fill in every field."
      );

      return;

    }

    if(password !== confirmPassword){

      alert(
        "The passwords do not match."
      );

      return;

    }

    const account = {

      firstName,
      lastName,
      email,
      phone

    };

    localStorage.setItem(
      "nc_demo_account",
      JSON.stringify(account)
    );

    localStorage.setItem(
      "nc_demo_user",
      email
    );

    closeModal("authModal");

    updateAuthUI();

    alert(
      "Account created for this prototype!"
    );

    return;

  }

  if(!email || !password){

    alert(
      "Please enter your email and password."
    );

    return;

  }

  localStorage.setItem(
    "nc_demo_user",
    email
  );

  closeModal("authModal");

  updateAuthUI();

  alert(
    "Signed in for this prototype."
  );

}

/* =========================================================
   DYNAMIC LISTENERS
========================================================= */

function attachDynamicListeners(){

  document
    .querySelectorAll("[data-song]")
    .forEach(button=>{

      if(button.dataset.listenerAttached) return;

      button.dataset.listenerAttached = "1";

      button.addEventListener("click",()=>{

        playSong(button.dataset.song);

      });

    });

  document
    .querySelectorAll("[data-artist]")
    .forEach(button=>{

      if(button.dataset.listenerAttached) return;

      button.dataset.listenerAttached = "1";

      button.addEventListener("click",()=>{

        openArtist(button.dataset.artist);

      });

    });

  document
    .querySelectorAll("[data-composer]")
    .forEach(button=>{

      if(button.dataset.listenerAttached) return;

      button.dataset.listenerAttached = "1";

      button.addEventListener("click",()=>{

        openComposer(button.dataset.composer);

      });

    });

  document
    .querySelectorAll("[data-album]")
    .forEach(button=>{

      if(button.dataset.listenerAttached) return;

      button.dataset.listenerAttached = "1";

      button.addEventListener("click",()=>{

        openAlbum(button.dataset.album);

      });

    });

}

/* =========================================================
   HOME
========================================================= */

document
  .getElementById("homeButton")
  .addEventListener("click",()=>{

    document
      .getElementById("libraryScreen")
      .classList.remove("open");

    document
      .getElementById("detailScreen")
      .classList.remove("open");

    document
      .getElementById("playerScreen")
      .classList.remove("open");

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  });

/* =========================================================
   FULL PLAYER
========================================================= */

document
  .getElementById("miniArt")
  .addEventListener("click",openPlayer);

document
  .getElementById("miniInfo")
  .addEventListener("click",openPlayer);

document
  .getElementById("miniPlay")
  .addEventListener("click",event=>{

    event.stopPropagation();

    playing = !playing;

    updatePlayButtons();

  });

document
  .getElementById("closePlayer")
  .addEventListener("click",closePlayer);

document
  .getElementById("playerHome")
  .addEventListener("click",()=>{

    closePlayer();

    document
      .getElementById("detailScreen")
      .classList.remove("open");

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  });

document
  .getElementById("bigPlay")
  .addEventListener("click",()=>{

    playing = !playing;

    updatePlayButtons();

  });

document
  .getElementById("next")
  .addEventListener("click",nextSong);

document
  .getElementById("previous")
  .addEventListener("click",previousSong);

document
  .getElementById("shuffle")
  .addEventListener("click",()=>{

    shuffled = !shuffled;

    document
      .getElementById("shuffle")
      .classList.toggle(
        "active",
        shuffled
      );

  });

document
  .getElementById("repeat")
  .addEventListener("click",()=>{

    repeated = !repeated;

    document
      .getElementById("repeat")
      .classList.toggle(
        "active",
        repeated
      );

  });

document
  .getElementById("favorite")
  .addEventListener("click",()=>{

    favorite = !favorite;

    const button =
      document.getElementById("favorite");

    button.textContent =
      favorite
        ? "♥ Favorited"
        : "♡ Favorite";

    button.classList.toggle(
      "active",
      favorite
    );

  });

document
  .getElementById("addPlaylist")
  .addEventListener("click",()=>{

    openModal("playlistModal");

  });

document
  .getElementById("progress")
  .addEventListener("input",function(){

    const seconds =
      Math.floor(
        Number(this.value) * 2.22
      );

    document
      .getElementById("currentTime")
      .textContent =
        Math.floor(seconds / 60) +
        ":" +
        String(seconds % 60)
          .padStart(2,"0");

  });

/* =========================================================
   SEARCH
========================================================= */

document
  .getElementById("searchButton")
  .addEventListener("click",()=>{

    openModal("searchModal");

    setTimeout(()=>{

      document
        .getElementById("searchInput")
        .focus();

    },100);

  });

document
  .getElementById("searchInput")
  .addEventListener(
    "input",
    doSearch
  );

document
  .getElementById("closeSearch")
  .addEventListener("click",()=>{

    closeModal("searchModal");

  });

/* =========================================================
   AUTH BUTTONS
========================================================= */

document
  .getElementById("authButton")
  .addEventListener(
    "click",
    openAuth
  );

document
  .getElementById("switchAuth")
  .addEventListener("click",()=>{

    authMode =
      authMode === "signin"
        ? "signup"
        : "signin";

    document
      .getElementById("authTitle")
      .textContent =
        authMode === "signin"
          ? "Sign In"
          : "Create Account";

    document
      .getElementById("authDescription")
      .textContent =
        authMode === "signin"
          ? "Sign in to your NigguneiChabad account."
          : "Create your NigguneiChabad account.";

    document
      .getElementById("submitAuth")
      .textContent =
        authMode === "signin"
          ? "Sign In"
          : "Create Account";

    document
      .getElementById("switchAuth")
      .textContent =
        authMode === "signin"
          ? "Create Account"
          : "Sign In";

    updateAuthFields();

    setTimeout(()=>{

      document
        .getElementById(
          authMode === "signup"
            ? "authFirstName"
            : "authEmail"
        )
        .focus();

    },100);

  });

document
  .getElementById("submitAuth")
  .addEventListener(
    "click",
    submitAuth
  );

document
  .getElementById("closeAuth")
  .addEventListener("click",()=>{

    closeModal("authModal");

  });

[
  "authFirstName",
  "authLastName",
  "authPhone",
  "authEmail",
  "authPassword",
  "authConfirmPassword"
].forEach(id=>{

  document
    .getElementById(id)
    .addEventListener(
      "keydown",
      event=>{

        if(event.key === "Enter"){

          event.preventDefault();

          submitAuth();

        }

      }
    );

});

/* =========================================================
   PLAYLIST
========================================================= */

document
  .getElementById("cancelPlaylist")
  .addEventListener("click",()=>{

    closeModal("playlistModal");

  });

document
  .getElementById("savePlaylist")
  .addEventListener("click",()=>{

    const input =
      document.getElementById("playlistName");

    const name =
      input.value.trim();

    if(!name){

      alert(
        "Please enter a playlist name."
      );

      input.focus();

      return;

    }

    playlists.push({

      name:name,

      songIndexes:[]

    });

    localStorage.setItem(
      "nc_playlists",
      JSON.stringify(playlists)
    );

    input.value = "";

    closeModal("playlistModal");

    renderPlaylists();

  });

document
  .getElementById("playlistName")
  .addEventListener("keydown",event=>{

    if(event.key === "Enter"){

      event.preventDefault();

      document
        .getElementById("savePlaylist")
        .click();

    }

  });

/* =========================================================
   DETAIL
========================================================= */

document
  .getElementById("closeDetail")
  .addEventListener("click",()=>{

    document
      .getElementById("detailScreen")
      .classList.remove("open");

  });

/* =========================================================
   SEE ALL
========================================================= */

document
  .querySelectorAll(".see-all")
  .forEach(button=>{

    button.addEventListener("click",()=>{

      openLibrary(
        button.dataset.section
      );

    });

  });

document
  .getElementById("closeLibrary")
  .addEventListener("click",()=>{

    document
      .getElementById("libraryScreen")
      .classList.remove("open");

  });

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

attachDynamicListeners();

updateAuthUI();
updateAuthFields();
