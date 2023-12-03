let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_title = document.querySelector(".track-title");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let randomIcon = document.querySelector(".fa-repeat");
let speakerIcon = document.querySelector(".speaker");
var volumePercentage = document.querySelector(".volume-percentage");
let current_track = document.createElement("audio");
let current_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

//To set the track index random

var random_index = Math.floor(Math.random() * musicList.length - 1) + 1;
// track_index = random_index;
track_index = 1;

loadTrack(track_index);
volumeUpdate();

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  current_track.src = musicList[track_index].music;
  current_track.load();

  track_art.style.backgroundImage = "url(" + musicList[track_index].img + ")";
  track_title.textContent = musicList[track_index].title;
  track_artist.textContent = musicList[track_index].artist;
  now_playing.textContent =
    "Playing music " + (track_index + 1) + " of " + musicList.length;

  updateTimer = setInterval(setUpdate, 1000);

  current_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function reset() {
  current_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.remove("fa-repeat");
  randomIcon.classList.add("fa-random");
}

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("fa-random");
  randomIcon.classList.add("fa-repeat");
}

function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}

function playpauseTrack() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }

  // isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  current_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  //   wave.classList.add("loader");
  playpause_btn.innerHTML =
    '<i class="fa fa-pause-circle fa-3x" onclick="playpauseTrack()"></i>';
}

function pauseTrack() {
  current_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  //   wave.classList.remove("loader");
  playpause_btn.innerHTML =
    '<i class="fa fa-play-circle fa-3x"  onclick="playpauseTrack()"></i>';
}

function prevTrack() {
  if (isRandom === false) {
    if (track_index > 0) {
      track_index -= 1;
    } else {
      track_index = musicList.length - 1;
    }
    console.log(track_index);
  } else if (isRandom === true) {
    var random_index = Math.floor(Math.random() * musicList.length - 1) + 1;
    console.log(random_index);

    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function nextTrack() {
  if (track_index < musicList.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < musicList.length - 1 && isRandom === true) {
    var random_index = Math.floor(Math.random() * musicList.length - 1) + 1;
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = current_track.duration * (seek_slider.value / 100);
  current_track.currentTime = seekto;
}

//Volume Settings Code

function setVolume() {
  const list = speakerIcon.classList[3];

  let volume = (current_track.volume = volume_slider.value / 100);
  if (volume == 0) {
    if (list === "fa-volume-down") {
      speakerIcon.classList.remove("fa-volume-down");
      speakerIcon.classList.add("fa-volume-xmark");
    } else {
      speakerIcon.classList.remove("fa-volume-up");
      speakerIcon.classList.add("fa-volume-xmark");
    }
  } else if (volume > 0 && volume < 0.5) {
    if (list === "fa-volume-xmark") {
      speakerIcon.classList.remove("fa-volume-xmark");
      speakerIcon.classList.add("fa-volume-down");
    } else {
      speakerIcon.classList.remove("fa-volume-up");
      speakerIcon.classList.add("fa-volume-down");
    }
  } else {
    if (list === "fa-volume-xmark") {
      speakerIcon.classList.remove("fa-volume-xmark");
      speakerIcon.classList.add("fa-volume-up");
    } else {
      speakerIcon.classList.remove("fa-volume-down");
      speakerIcon.classList.add("fa-volume-up");
    }
  }
  volumeUpdate();
}

function forVolume() {
  const list = speakerIcon.classList[3];
  if (list === "fa-volume-down") {
    speakerIcon.classList.remove("fa-volume-down");
    speakerIcon.classList.add("fa-volume-up");
    current_track.volume = 1.0;
    volume_slider.value = current_track.volume * 100;
  } else {
    if (list === "fa-volume-up") {
      speakerIcon.classList.remove("fa-volume-up");
      speakerIcon.classList.add("fa-volume-down");
      current_track.volume = 0.5;
      volume_slider.value = current_track.volume * 100;
    } else {
      speakerIcon.classList.remove("fa-volume-xmark");
      speakerIcon.classList.add("fa-volume-down");
      current_track.volume = 0.5;
      volume_slider.value = current_track.volume * 100;
    }
  }
  volumeUpdate();
}

//Music track progress

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(current_track.duration)) {
    seekPosition = current_track.currentTime * (100 / current_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(current_track.currentTime / 60);
    let currentSeconds = Math.floor(
      current_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(current_track.duration / 60);
    let durationSeconds = Math.floor(
      current_track.duration - durationMinutes * 60
    );

    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }

    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    current_time.textContent = currentMinutes + ":" + currentSeconds;

    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

current_track.volume = 0.5;

function volumeUpdate() {
  let percentage = Math.trunc(current_track.volume * 100);
  volumePercentage.textContent = percentage + "%";
  setVolume();
}

//
//For Random Background Color
function random_bg_color() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];
  let a;

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let Color1 = populate("#");
  let Color2 = populate("#");
  var angle = "to right";

  // let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
  // document.body.style.background = gradient;
}
