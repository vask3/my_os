// GLOBAL OS STATE
let soundEnabled = true;
let zIndexCounter = 10;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// CLOCK
setInterval(() => {
  document.getElementById('clock').textContent = new Date().toLocaleTimeString();
}, 1000);

// CUSTOM 8-BIT AUDIO SYNTHESIZER (Web Audio API)
function playAudioTone(freq, type = 'square', duration = 0.1) {
  if (!soundEnabled) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) { console.log(e); }
}

function playFreq(f) { playAudioTone(f, 'triangle', 0.3); }

function toggleSound() {
  soundEnabled = !soundEnabled;
  event.target.textContent = soundEnabled ? '🔊 SFX: ON' : '🔇 SFX: OFF';
}

function toggleCRT() {
  const crt = document.getElementById('crt-overlay');
  crt.classList.toggle('crt-on');
  playAudioTone(400, 'square', 0.05);
}

// DRAGGABLE WINDOW SYSTEM
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
  playAudioTone(600, 'square', 0.08);
}

function closeWin(id) {
  document.getElementById(id).style.display = 'none';
  playAudioTone(200, 'square', 0.08);
}

function toggleMenu() {
  const menu = document.getElementById('start-menu');
  menu.classList.toggle('hidden');
  playAudioTone(500, 'square', 0.05);
}

// PIXEL DRAW CANVAS LOGIC
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  ctx.fillStyle = document.getElementById('draw-color').value;
  ctx.fillRect(Math.floor((e.clientX - rect.left)/10)*10, Math.floor((e.clientY - rect.top)/10)*10, 10, 10);
});

function clearCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height); }

// NOTES PERSISTENCE
function saveNote() {
  const text = document.getElementById('note-input').value;
  localStorage.setItem('vasko_brutal_notes', text);
  playAudioTone(800, 'sine', 0.15);
  alert('Saved to local disk!');
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('vasko_brutal_notes');
  if (saved) document.getElementById('note-input').value = saved;
});

// TERMINAL LOGIC
function handleTerm(e) {
  if (e.key !== 'Enter') return;
  const input = document.getElementById('term-in');
  const out = document.getElementById('term-out');
  const cmd = input.value.trim().toLowerCase();
  
  out.innerHTML += `> ${input.value}<br>`;
  
  if (cmd === 'help') {
    out.innerHTML += 'Commands: help, clear, date, pet, matrix<br>';
  } else if (cmd === 'clear') {
    out.innerHTML = '';
  } else if (cmd === 'date') {
    out.innerHTML += `${new Date().toLocaleString()}<br>`;
  } else if (cmd === 'pet') {
    petMascot();
    out.innerHTML += 'Cat status: Happy!<br>';
  } else if (cmd === 'matrix') {
    out.innerHTML += 'Wake up, Neo...<br>';
  } else {
    out.innerHTML += `Unknown command: ${cmd}<br>`;
  }
  
  input.value = '';
  out.scrollTop = out.scrollHeight;
  playAudioTone(300, 'square', 0.04);
}

// INTERACTIVE DESKTOP PET
function petMascot() {
  const pet = document.getElementById('pet');
  pet.style.transform = 'scale(1.4)';
  playAudioTone(900, 'sine', 0.2);
  setTimeout(() => pet.style.transform = 'scale(1)', 300);
}

// DRAG AND DROP WALLPAPER CUSTOMIZATION
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
      playAudioTone(1000, 'triangle', 0.2);
    };
    reader.readAsDataURL(file);
  }
});
