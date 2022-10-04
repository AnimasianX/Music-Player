const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

let trackNo = 0;
// check if playing
let isPlaying = false;

// play 
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//next
function nextSong() {
    if (trackNo + 1 > songs.length - 1) {
        trackNo = 0;
        loadSong(songs[trackNo])
    } else {
        trackNo++;
        loadSong(songs[trackNo]);
    }
    playSong();
}

//previous
function prevSong() {
    if (trackNo - 1 < 0) {
        trackNo = songs.length - 1;
        loadSong(songs[trackNo]);
    } else {
        trackNo--;
        loadSong(songs[trackNo]);
    }
    playSong();
}

//Update progress bar and time
function updateProgressBar(event) {
    if (isPlaying = true) {
        const { duration, currentTime } = event.srcElement;
        //console.log(duration, currentTime);
        // UPdate progress bar
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        //console.log('minutes', durationMinutes)
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        //delay switching duration element to avoid NaN when skipping tracks
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        //calculate display for current time on song.
        const currentMinutes = Math.floor(currentTime / 60);
        //console.log('minutes', currentMinutes)
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

//Set Progress Bar
function setProgressBar(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const { duration } = music;
    // console.log(clickX / width);
    // console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;
}

// Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`
}

//on load
