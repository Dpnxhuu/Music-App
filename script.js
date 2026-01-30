console.log("Music App Loaded");

// --- 1. Variables & Initialization ---
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName"); // Ensure ye ID HTML mein ho
let songCards = Array.from(document.getElementsByClassName("song"));

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

// --- 2. Populate HTML with Song Data ---
songCards.forEach((element, i) => {
  // Check if song exists in array to avoid errors
  if (Song[i]) {
    element.getElementsByTagName("img")[0].src = Song[i].coverPath;
    element.getElementsByClassName("title")[0].innerText = Song[i].songName;
    element.getElementsByClassName("artist")[0].innerText = Song[i].artist;
    
    // Add Click Listener directly here (Better than finding ID)
    element.addEventListener("click", () => {
      songIndex = i;
      playMusic();
    });
  }
});

// --- 3. Central Play Logic (sabse important function) ---
const playMusic = () => {
  audioElement.src = Song[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  
  // Icons Update
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  
  // Master Play UI Update (Name change karna)
  if(masterSongName) {
      masterSongName.innerText = Song[songIndex].songName;
  }
};

// --- 4. Event Listeners ---

// Handle Master Play/Pause Click
masterPlay.addEventListener("click", () => {
  if (!audioElement.src) {
      audioElement.src = Song[0].filePath; 
      songIndex = 0;
  }
  else if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
  }
});

// Update Seekbar
audioElement.addEventListener("timeupdate", () => {
  if(audioElement.duration) {
    let progress = parseInt(
      (audioElement.currentTime / audioElement.duration) * 100
    );
    myProgressBar.value = progress;
  }
});

// Seekbar Drag Functionality
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// Handle Next Button
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= Song.length - 1) {
    songIndex = 0; // Loop back to start
  } else {
    songIndex += 1;
  }
  playMusic();
});

// Handle Previous Button
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = Song.length - 1; // Go to last song
  } else {
    songIndex -= 1;
  }
  playMusic();
});

// Auto-Play Next Song when current ends
audioElement.addEventListener("ended", () => {
  if (songIndex >= Song.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  playMusic();
});

// Search Functionality
const searchInput = document.querySelector(".search input");
if(searchInput) {
    searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase();
      songCards.forEach((card, index) => {
        // Sirf unhe check kare jo Song array me hain
        if(Song[index]) {
            const title = Song[index].songName.toLowerCase();
            const artist = Song[index].artist.toLowerCase();
    
            if (title.includes(value) || artist.includes(value)) {
              card.style.display = "flex";
            } else {
              card.style.display = "none";
            }
        }
      });
    });
}