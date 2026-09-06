// CLOCK
setInterval(() => {
  document.getElementById('clock').textContent = new Date().toLocaleTimeString();
}, 1000);

// WINDOW MANAGEMENT
let zIndexCounter = 10;

document.querySelectorAll('.window').forEach(win => {
  const header = win.querySelector('.win-header');
  let isDragging = false, offsetEx = 0, offsetEy = 0;

  win.addEventListener('pointerdown', () => {
    zIndexCounter++;
    win.style.zIndex = zIndexCounter;
  });

  header.addEventListener('pointerdown', (e) => {
    if (e.target.classList.contains('win-close')) return;
    isDragging = true;
    offsetEx = e.clientX - win.offsetLeft;
    offsetEy = e.clientY - win.offsetTop;
    header.setPointerCapture(e.pointerId);
  });

  header.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    win.style.left = (e.clientX - offsetEx) + 'px';
    win.style.top = (e.clientY - offsetEy) + 'px';
  });

  header.addEventListener('pointerup', () => isDragging = false);
});

function openWin(id) {
  const win = document.getElementById(id);
  win.style.display = 'block';
  zIndexCounter++;
  win.style.zIndex = zIndexCounter;
}

function closeWin(id) {
  document.getElementById(id).style.display = 'none';
}

function toggleMenu() {
  const menu = document.getElementById('start-menu');
  menu.classList.toggle('hidden');
}

// DRAWING CANVAS LOGIC
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.strokeStyle = document.getElementById('draw-color').value;
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
});

function clearCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height); }

// NOTES PERSISTENCE
function saveNote() {
  const text = document.getElementById('note-input').value;
  localStorage.setItem('vasko_clean_notes', text);
  alert('Запазено успешно!');
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('vasko_clean_notes');
  if (saved) document.getElementById('note-input').value = saved;
});

// AMBIENT MUSIC SYNTHESIZER (Web Audio API)
let audioCtx, noiseNode;

function playAmbient(type) {
  stopAmbient();
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const bufferSize = audioCtx.sampleRate * 2;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  noiseNode = audioCtx.createBufferSource();
  noiseNode.buffer = buffer;
  noiseNode.loop = true;

  const filter = audioCtx.createBiquadFilter();
  filter.type = type === 'rain' ? 'lowpass' : 'bandpass';
  filter.frequency.value = type === 'rain' ? 800 : 400;

  const gain = audioCtx.createGain();
  gain.gain.value = 0.15;

  noiseNode.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  noiseNode.start();
}

function stopAmbient() {
  if (noiseNode) {
    noiseNode.stop();
    noiseNode.disconnect();
  }
}

// POMODORO TIMER
let pomoTime = 1500, pomoInterval = null;

function updatePomoDisplay() {
  const m = Math.floor(pomoTime / 60).toString().padStart(2, '0');
  const s = (pomoTime % 60).toString().padStart(2, '0');
  document.getElementById('pomo-display').textContent = `${m}:${s}`;
}

function startPomo() {
  if (pomoInterval) return;
  pomoInterval = setInterval(() => {
    if (pomoTime > 0) {
      pomoTime--;
      updatePomoDisplay();
    } else {
      clearInterval(pomoInterval);
      alert('Времето за фокус изтече! Вземете си почивка.');
    }
  }, 1000);
}

function resetPomo() {
  clearInterval(pomoInterval);
  pomoInterval = null;
  pomoTime = 1500;
  updatePomoDisplay();
}

// TERMINAL LOGIC
function handleTerm(e) {
  if (e.key !== 'Enter') return;
  const input = document.getElementById('term-in');
  const out = document.getElementById('term-out');
  const cmd = input.value.trim().toLowerCase();
  
  out.innerHTML += `> ${input.value}<br>`;
  
  if (cmd === 'help') {
    out.innerHTML += 'Налични команди: help, clear, date, version<br>';
  } else if (cmd === 'clear') {
    out.innerHTML = '';
  } else if (cmd === 'date') {
    out.innerHTML += `${new Date().toLocaleString()}<br>`;
  } else if (cmd === 'version') {
    out.innerHTML += 'VaskoOS Clean Edition v2.5<br>';
  } else {
    out.innerHTML += `Непозната команда: ${cmd}<br>`;
  }
  
  input.value = '';
  out.scrollTop = out.scrollHeight;
}

// DRAG AND DROP WALLPAPER
const desktop = document.getElementById('desktop');
desktop.addEventListener('dragover', (e) => e.preventDefault());
desktop.addEventListener('drop', (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (event) => {
      document.body.style.backgroundImage = `url('${event.target.result}')`;
      document.body.style.backgroundSize = 'cover';
    };
    reader.readAsDataURL(file);
  }
});
