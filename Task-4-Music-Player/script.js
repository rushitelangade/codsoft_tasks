// ==========================================
// VIBEX MUSIC PLAYER
// COMPLETE JAVASCRIPT
// ==========================================


// ==========================================
// SONG DATA
// ==========================================

const songs = [

    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        src: "music/song1.mp3",
        cover: "images/cover1.jpg",
        colors: ["#ff1744", "#ff9100"]
    },

    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        src: "music/song2.mp3",
        cover: "images/cover2.jpg",
        colors: ["#00c6ff", "#0072ff"]
    },

    {
        title: "Believer",
        artist: "Imagine Dragons",
        src: "music/song3.mp3",
        cover: "images/cover3.jpg",
        colors: ["#ff512f", "#dd2476"]
    },

    {
        title: "Perfect",
        artist: "Ed Sheeran",
        src: "music/song4.mp3",
        cover: "images/cover4.jpg",
        colors: ["#667eea", "#764ba2"]
    },

    {
        title: "Counting Stars",
        artist: "OneRepublic",
        src: "music/song5.mp3",
        cover: "images/cover5.jpg",
        colors: ["#11998e", "#38ef7d"]
    },

    {
        title: "Stay",
        artist: "The Kid LAROI & Justin Bieber",
        src: "music/song6.mp3",
        cover: "images/cover6.jpg",
        colors: ["#f7971e", "#ffd200"]
    },

    {
        title: "Attention",
        artist: "Charlie Puth",
        src: "music/song7.mp3",
        cover: "images/cover7.jpg",
        colors: ["#8e2de2", "#4a00e0"]
    },

    {
        title: "Heat Waves",
        artist: "Glass Animals",
        src: "music/song8.mp3",
        cover: "images/cover8.jpg",
        colors: ["#fc466b", "#3f5efb"]
    },

    {
        title: "Night Changes",
        artist: "One Direction",
        src: "music/song9.mp3",
        cover: "images/cover9.jpg",
        colors: ["#141e30", "#243b55"]
    },

    {
        title: "Let Me Down Slowly",
        artist: "Alec Benjamin",
        src: "music/song10.mp3",
        cover: "images/cover10.jpg",
        colors: ["#654ea3", "#eaafc8"]
    }

];


// ==========================================
// ELEMENTS
// ==========================================

const audio = document.getElementById("audio");

const albumArt = document.getElementById("albumArt");

const songTitle = document.getElementById("songTitle");

const artistName = document.getElementById("artistName");

const playBtn = document.getElementById("playBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

const volumeBar = document.getElementById("volumeBar");

const volumeValue = document.getElementById("volumeValue");

const muteBtn = document.getElementById("muteBtn");

const shuffleBtn = document.getElementById("shuffleBtn");

const repeatBtn = document.getElementById("repeatBtn");

const favoriteBtn = document.getElementById("favoriteBtn");

const songsList = document.getElementById("songsList");

const playlist = document.getElementById("playlist");

const searchInput = document.getElementById("searchInput");

const equalizer = document.getElementById("equalizer");

const autoplayBtn = document.getElementById("autoplayBtn");

const favoritesTab = document.getElementById("favoritesTab");

const allSongsBtn = document.getElementById("allSongsBtn");

const listTitle = document.getElementById("listTitle");

const toast = document.getElementById("toast");


// ==========================================
// STATE
// ==========================================

let currentIndex = 0;

let isPlaying = false;

let isShuffle = false;

let repeatMode = "off";

let autoplay = true;

let showingFavorites = false;


let favorites =

    JSON.parse(
        localStorage.getItem("vibexFavorites")
    ) || [];


// ==========================================
// THEME
// ==========================================

function setTheme(colors) {

    document.documentElement.style.setProperty(
        "--accent",
        colors[0]
    );

    document.documentElement.style.setProperty(
        "--accent2",
        colors[1]
    );

    document.body.style.background = `

        radial-gradient(
            circle at 10% 10%,
            ${colors[0]}20,
            transparent 35%
        ),

        radial-gradient(
            circle at 90% 90%,
            ${colors[1]}20,
            transparent 35%
        ),

        #08090d

    `;

}


// ==========================================
// LOAD SONG
// ==========================================

function loadSong(index) {

    currentIndex = index;

    const song = songs[currentIndex];


    setTheme(song.colors);


    songTitle.textContent =
        song.title;


    artistName.textContent =
        song.artist;


    albumArt.src =
        song.cover;


    audio.src =
        song.src;


    audio.load();


    progressBar.value = 0;


    currentTime.textContent =
        "0:00";


    duration.textContent =
        "0:00";


    updateFavoriteButton();

    renderSongs();

    renderPlaylist();

}


// ==========================================
// PLAY SONG
// ==========================================

async function playSong() {

    try {

        await audio.play();

        isPlaying = true;

        updatePlayButton();

        equalizer.classList.add(
            "playing"
        );

        document
            .querySelector(".art-wrapper")
            .classList.add("playing");

    }

    catch (error) {

        console.log(error);

        showToast(
            "Audio file not found"
        );

    }

}


// ==========================================
// PAUSE SONG
// ==========================================

function pauseSong() {

    audio.pause();

    isPlaying = false;

    updatePlayButton();

    equalizer.classList.remove(
        "playing"
    );

    document
        .querySelector(".art-wrapper")
        .classList.remove("playing");

}


// ==========================================
// PLAY BUTTON
// ==========================================

playBtn.addEventListener(
    "click",
    () => {

        if (isPlaying) {

            pauseSong();

        }

        else {

            playSong();

        }

    }
);


// ==========================================
// PLAY ICON
// ==========================================

function updatePlayButton() {

    playBtn.textContent =
        isPlaying
            ? "❚❚"
            : "▶";

}


// ==========================================
// NEXT SONG
// ==========================================

function nextSong() {

    let nextIndex;


    if (isShuffle) {

        do {

            nextIndex =
                Math.floor(
                    Math.random() *
                    songs.length
                );

        }

        while (
            nextIndex === currentIndex &&
            songs.length > 1
        );

    }

    else {

        nextIndex =
            (currentIndex + 1) %
            songs.length;

    }


    loadSong(nextIndex);

    playSong();

}


// ==========================================
// PREVIOUS SONG
// ==========================================

function previousSong() {

    let previousIndex =

        (currentIndex - 1 + songs.length)
        %
        songs.length;


    loadSong(previousIndex);

    playSong();

}


// ==========================================
// BUTTONS
// ==========================================

nextBtn.addEventListener(
    "click",
    nextSong
);


prevBtn.addEventListener(
    "click",
    previousSong
);


// ==========================================
// TIME UPDATE
// ==========================================

audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration) return;


        const progress =

            (audio.currentTime /
                audio.duration) *
            100;


        progressBar.value =
            progress;


        currentTime.textContent =

            formatTime(
                audio.currentTime
            );

    }
);


// ==========================================
// METADATA
// ==========================================

audio.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =

            formatTime(
                audio.duration
            );

    }
);


// ==========================================
// SEEK
// ==========================================

progressBar.addEventListener(
    "input",
    () => {

        if (!audio.duration)
            return;


        audio.currentTime =

            (progressBar.value / 100)
            *
            audio.duration;

    }
);


// ==========================================
// SONG ENDED
// ==========================================

audio.addEventListener(
    "ended",
    () => {

        if (
            repeatMode === "one"
        ) {

            audio.currentTime = 0;

            playSong();

            return;

        }


        if (
            repeatMode === "all"
        ) {

            nextSong();

            return;

        }


        if (autoplay) {

            nextSong();

        }

        else {

            pauseSong();

        }

    }
);


// ==========================================
// VOLUME
// ==========================================

audio.volume = 0.8;

volumeBar.value = 0.8;


volumeBar.addEventListener(
    "input",
    () => {

        const value =
            Number(
                volumeBar.value
            );


        audio.volume =
            value;


        audio.muted =
            value === 0;


        volumeValue.textContent =

            Math.round(
                value * 100
            ) + "%";


        updateVolumeIcon();

    }
);


// ==========================================
// MUTE
// ==========================================

muteBtn.addEventListener(
    "click",
    () => {

        audio.muted =
            !audio.muted;

        updateVolumeIcon();

    }
);


function updateVolumeIcon() {

    if (
        audio.muted ||
        audio.volume === 0
    ) {

        muteBtn.textContent =
            "🔇";

    }

    else if (
        audio.volume < 0.5
    ) {

        muteBtn.textContent =
            "🔉";

    }

    else {

        muteBtn.textContent =
            "🔊";

    }

}


// ==========================================
// SHUFFLE
// ==========================================

shuffleBtn.addEventListener(
    "click",
    () => {

        isShuffle =
            !isShuffle;


        shuffleBtn.classList.toggle(
            "active",
            isShuffle
        );


        showToast(

            isShuffle
                ? "Shuffle ON"
                : "Shuffle OFF"

        );

    }
);


// ==========================================
// REPEAT
// ==========================================

repeatBtn.addEventListener(
    "click",
    () => {

        if (
            repeatMode === "off"
        ) {

            repeatMode =
                "all";

            repeatBtn.classList.add(
                "active"
            );

            repeatBtn.textContent =
                "↻";

            showToast(
                "Repeat All"
            );

        }

        else if (
            repeatMode === "all"
        ) {

            repeatMode =
                "one";

            repeatBtn.textContent =
                "↻¹";

            showToast(
                "Repeat One"
            );

        }

        else {

            repeatMode =
                "off";

            repeatBtn.classList.remove(
                "active"
            );

            repeatBtn.textContent =
                "↻";

            showToast(
                "Repeat OFF"
            );

        }

    }
);


// ==========================================
// FAVORITES
// ==========================================

favoriteBtn.addEventListener(
    "click",
    () => {

        toggleFavorite(
            currentIndex
        );

    }
);


function toggleFavorite(index) {

    if (
        favorites.includes(index)
    ) {

        favorites =
            favorites.filter(
                item =>
                    item !== index
            );

        showToast(
            "Removed from favorites"
        );

    }

    else {

        favorites.push(index);

        showToast(
            "Added to favorites ❤️"
        );

    }


    localStorage.setItem(
        "vibexFavorites",
        JSON.stringify(
            favorites
        )
    );


    updateFavoriteButton();

    renderSongs();

}


function updateFavoriteButton() {

    favoriteBtn.textContent =

        favorites.includes(
            currentIndex
        )

            ? "♥"

            : "♡";

}


// ==========================================
// RENDER SONGS
// ==========================================

function renderSongs(list = songs) {

    songsList.innerHTML = "";


    list.forEach(
        (song) => {

            const realIndex =
                songs.indexOf(song);


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "song-row";


            if (
                realIndex ===
                currentIndex
            ) {

                row.classList.add(
                    "active"
                );

            }


            row.innerHTML = `

                <span class="song-number">

                    ${String(
                        realIndex + 1
                    ).padStart(2, "0")}

                </span>


                <img
                    src="${song.cover}"
                    alt="${song.title}"
                >


                <div class="song-info">

                    <h4>
                        ${song.title}
                    </h4>

                    <p>
                        ${song.artist}
                    </p>

                </div>


                <button
                    class="row-heart"
                >

                    ${
                        favorites.includes(
                            realIndex
                        )
                            ? "♥"
                            : "♡"
                    }

                </button>

            `;


            row.addEventListener(
                "click",
                () => {

                    loadSong(
                        realIndex
                    );

                    playSong();

                }
            );


            const heart =
                row.querySelector(
                    ".row-heart"
                );


            heart.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    toggleFavorite(
                        realIndex
                    );

                }
            );


            songsList.appendChild(
                row
            );

        }
    );

}


// ==========================================
// SIDEBAR PLAYLIST
// ==========================================

function renderPlaylist() {

    playlist.innerHTML = "";


    songs.slice(0, 7)
        .forEach(
            (song, index) => {

                const item =
                    document.createElement(
                        "button"
                    );


                item.className =
                    "menu-item";


                if (
                    index ===
                    currentIndex
                ) {

                    item.classList.add(
                        "active"
                    );

                }


                item.innerHTML = `

                    <span>♫</span>

                    <span>
                        ${song.title}
                    </span>

                `;


                item.addEventListener(
                    "click",
                    () => {

                        loadSong(index);

                        playSong();

                    }
                );


                playlist.appendChild(
                    item
                );

            }
        );

}


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    () => {

        const query =

            searchInput.value
                .toLowerCase()
                .trim();


        const filtered =

            songs.filter(
                song =>

                    song.title
                        .toLowerCase()
                        .includes(query)

                    ||

                    song.artist
                        .toLowerCase()
                        .includes(query)
            );


        renderSongs(
            filtered
        );

    }
);


// ==========================================
// AUTOPLAY
// ==========================================

autoplayBtn.addEventListener(
    "click",
    () => {

        autoplay =
            !autoplay;


        autoplayBtn.classList.toggle(
            "active",
            autoplay
        );


        showToast(

            autoplay
                ? "Autoplay ON"
                : "Autoplay OFF"

        );

    }
);


// ==========================================
// FAVORITES TAB
// ==========================================

favoritesTab.addEventListener(
    "click",
    () => {

        showingFavorites =
            true;


        const favoriteSongs =

            songs.filter(
                (_, index) =>
                    favorites.includes(
                        index
                    )
            );


        listTitle.textContent =
            "Favorites";


        renderSongs(
            favoriteSongs
        );


        allSongsBtn.classList.remove(
            "active"
        );


        favoritesTab.classList.add(
            "active"
        );

    }
);


// ==========================================
// ALL SONGS TAB
// ==========================================

allSongsBtn.addEventListener(
    "click",
    () => {

        showingFavorites =
            false;


        listTitle.textContent =
            "All Songs";


        searchInput.value =
            "";


        renderSongs();


        favoritesTab.classList.remove(
            "active"
        );


        allSongsBtn.classList.add(
            "active"
        );

    }
);


// ==========================================
// TIME FORMAT
// ==========================================

function formatTime(seconds) {

    if (
        !Number.isFinite(
            seconds
        )
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secs =
        Math.floor(
            seconds % 60
        );


    return (

        minutes +
        ":" +
        String(secs)
            .padStart(2, "0")

    );

}


// ==========================================
// TOAST
// ==========================================

let toastTimer;


function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =

        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            1800
        );

}


// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.target.tagName ===
            "INPUT"
        ) {

            return;

        }


        // SPACE

        if (
            event.code === "Space"
        ) {

            event.preventDefault();


            if (isPlaying) {

                pauseSong();

            }

            else {

                playSong();

            }

        }


        // RIGHT

        if (
            event.code ===
            "ArrowRight"
        ) {

            if (audio.duration) {

                audio.currentTime =

                    Math.min(
                        audio.currentTime + 5,
                        audio.duration
                    );

            }

        }


        // LEFT

        if (
            event.code ===
            "ArrowLeft"
        ) {

            if (audio.duration) {

                audio.currentTime =

                    Math.max(
                        audio.currentTime - 5,
                        0
                    );

            }

        }


        // MUTE

        if (
            event.key.toLowerCase()
            === "m"
        ) {

            audio.muted =
                !audio.muted;

            updateVolumeIcon();

        }

    }
);


// ==========================================
// INITIALIZE
// ==========================================

loadSong(0);

renderSongs();

renderPlaylist();

updateVolumeIcon();