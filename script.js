console.log("Music App Loaded");
let songIndex = 0;
let audioElement = new Audio("Jo Tum Mere Ho.m4a");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let song = Array.from(document.getElementsByClassName("song"));
let Song = [
  {
    songName: "Jo Tum Mere Ho",
    artist: "Anuv Jain",
    filePath: "Jo Tum Mere Ho.m4a",
    coverPath: "Jo Tum Mere Ho.png",
  },
  {
    songName: "Dil Hi Toh Hai",
    artist: "Arijit Singh",
    filePath: "Dil Hi Toh Hai.m4a",
    coverPath: "dil hi toh hai.png",
  },
  {
    songName: "Yeh Dooriyaan",
    artist: "Arijit Singh",
    filePath: "Yeh Dooriyan.m4a",
    coverPath: "yeh dooriyaan.png",
  },
  {
    songName: "Is This Love",
    artist: "Mohit Chauhan",
    filePath: "Is This Love.m4a",
    coverPath: "Is this love.png",
  },
  {
    songName: "Yeh Fitoor Mera",
    artist: "Arijit Singh",
    filePath: "Yeh Fitoor Mera.m4a",
    coverPath: "yeh fitoor mera.png",
  },
  {
    songName: "Out Of Time",
    artist: "The Weeknd",
    filePath: "Out Of Time.m4a",
    coverPath: "out of time.png",
  },
  {
    songName: "Sajni",
    artist: "The Jal Band",
    filePath: "Sajni.m4a",
    coverPath: "sajni.png",
  },
  {
    songName: "Sawaar Loon",
    artist: "Monali Thakur",
    filePath: "Sawaar Loon.m4a",
    coverPath: "Sawaar Loon.png",
  },
  {
    songName: "Satranga",
    artist: "Arijit Singh",
    filePath: "Satranga.m4a",
    coverPath: "satranga.png",
  },
];

song.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = Song[i].coverPath;
  element.getElementsByClassName("title")[0].innerText = Song[i].songName;
  element.getElementsByClassName("artist")[0].innerText = Song[i].artist;
});

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
  }
});

audioElement.addEventListener("timeupdate", () => {
  //update seekbar
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100,
  );
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

Array.from(document.getElementsByClassName("song")).forEach((element) => {
  element.addEventListener("click", (e) => {
    songIndex = parseInt(e.target.id);
    audioElement.src = Song[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  });
});

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }

  audioElement.src = Song[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }

  audioElement.src = Song[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

const searchInput = document.querySelector(".search input");
const songCards = document.querySelectorAll(".song");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  songCards.forEach((card) => {
    const title = card.querySelector(".title").innerText.toLowerCase();
    const artist = card.querySelector(".artist").innerText.toLowerCase();

    if (title.includes(value) || artist.includes(value)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});
