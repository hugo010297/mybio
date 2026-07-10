
const audio = document.getElementById('audio');
const background = document.querySelector('.background');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const overlay = document.getElementById('overlay');
const mainCard = document.querySelector('main.card');
const musicPlayer = document.querySelector('.music-player');
const discordbutton = document.querySelectorAll('discordbt')
if (!(audio instanceof HTMLMediaElement)) {
  console.error("audio not HTMLMediaElement");
}

// media analyzerat here
const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();

source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  mouseX = (e.clientX - centerX) * 0.01;
  mouseY = (e.clientY - centerY) * 0.01;
});

//BGanimation
function animateBackground() {
  requestAnimationFrame(animateBackground);

  analyser.getByteFrequencyData(dataArray);
  let sum = 0;
  for (let i = 0; i < bufferLength; i++) {
    sum += dataArray[i];
  }
  const average = sum / bufferLength;
  const brightness = 0.1 + (average / 64) * 0.7;

  background.style.filter = `blur(3px) brightness(${brightness})`;
  background.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
}
animateBackground();

// overlay music check
overlay.addEventListener('click', () => {
  audioCtx.resume().then(() => {
    audio.play();

    // i am fade
    overlay.classList.add('fade-out');

    setTimeout(() => {
      overlay.style.display = 'none';
      mainCard.style.display = 'block';
      background.style.display = 'block';
      musicPlayer.style.display = 'block';
    }, 1000); // CSS transition
  });
});


const trackTitle = document.getElementById('track-title');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// PLAYLIST OH MY GOD
const playlist = [
  {
    title: "Vs Yukaze ;D",
    src: "sounds/Vs_Frisk.mp3"
  },
  {
    title: "StoryFell - Vehement",
    src: "sounds/Vehement.mp3"
  },
  {
    title: "wotaku - snooze feat. SHIKI",
    src: "sounds/snooze.mp3"
  },
  {
    title: "PSYQUI - C & B (feat. Such)",
    src: "sounds/CandB.mp3"
  },
  {
    title: "vally.exe - String_Theory",
    src: "sounds/String_Theory.mp3"
  },
  {
    title: "Mili - Iron Lotus",
    src: "sounds/Iron_Lotus.mp3"
  },
  {
    title: "Kibo - Strength of will",
    src: "sounds/StrenghtofWill.mp3"
  },
  {
    title: "Ryu☆ - I'm so Happy",
    src: "sounds/iamsohappy.mp3"
  },
  // 
  // {
  //   title: "new song",
  //   src: "sounds/xxx.mp3"
  // },
];

let currentTrack = 0;

// track play
function loadTrack(index) {
  const track = playlist[index];

  const wasPlaying = !audio.paused;  

  audio.src = track.src;
  trackTitle.textContent = track.title;

  if (wasPlaying) {
    audio.play(); 
    playBtn.textContent = '⏸️';
  }
}

loadTrack(currentTrack);

// ▶️/⏸️ 
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
});

// ⏭️ 
nextBtn.addEventListener('click', () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
});

// ⏮️ 
prevBtn.addEventListener('click', () => {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
});

// auto looper
audio.addEventListener('ended', () => {
  nextBtn.click();
});

function dtd()
{
    window.open("https://discord.com/channels/@me", "_blank");
;
}

function openInNewTab(url) {
  window.open(url, '_blank');
}
