
const audio = document.getElementById('audio');
const background = document.querySelector('.background');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const overlay = document.getElementById('overlay');
const mainCard = document.querySelector('main.card');
const musicPlayer = document.querySelector('.music-player');
const discordbutton = document.querySelectorAll('discordbt')
if (!(audio instanceof HTMLMediaElement)) {
  console.error("audio 不是 HTMLMediaElement");
}

// 媒體元素來源分析器
const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();

source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// 滑鼠視差參數
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  mouseX = (e.clientX - centerX) * 0.01;
  mouseY = (e.clientY - centerY) * 0.01;
});

// 背景動畫
function animateBackground() {
  requestAnimationFrame(animateBackground);

  analyser.getByteFrequencyData(dataArray);
  let sum = 0;
  for (let i = 0; i < bufferLength; i++) {
    sum += dataArray[i];
  }
  const average = sum / bufferLength;
  const brightness = 0.1 + (average / 64) * 0.7;

  background.style.filter = `blur(5px) brightness(${brightness})`;
  background.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
}
animateBackground();

// 點擊遮罩啟動音樂
overlay.addEventListener('click', () => {
  audioCtx.resume().then(() => {
    audio.play();

    // 淡出效果class
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

// 🪄 歌單（你可以自由加歌）
const playlist = [
  {
    title: "Ryu☆ - I'm so Happy",
    src: "sounds/iamsohappy.mp3"
  },
  {
    title: "StoryFell - Vehement",
    src: "sounds/Vehement.mp3"
  },
  {
    title: "wotaku - snooze feat. SHIKI",
    src: "sounds/snooze.mp3"
  },
  // 👇 想再加歌，只要加物件進來就好
  // {
  //   title: "新歌名",
  //   src: "sounds/xxx.mp3"
  // }
];

let currentTrack = 0;

// 🎶 播放當前歌曲
function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  trackTitle.textContent = track.title;
  audio.play();
  playBtn.textContent = '⏸️';
}

loadTrack(currentTrack);

// ▶️/⏸️ 播放/暫停
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
});

// ⏭️ 下一首
nextBtn.addEventListener('click', () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
});

// ⏮️ 上一首
prevBtn.addEventListener('click', () => {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
});

// 🪄 自動播下一首
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
