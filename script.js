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
    if (e.target.closest('.win-close')) return;
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
  ctx.lineWidth = 4;
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
  localStorage.setItem('vasko_dark_notes', text);
  alert('Notes saved successfully!');
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('vasko_dark_notes');
  if (saved) document.getElementById('note-input').value = saved;
});

// CALCULATOR LOGIC
const calcDisplay = document.getElementById('calc-display');

function calcInput(val) {
  if (calcDisplay.value === '0') calcDisplay.value = val;
  else calcDisplay.value += val;
}

function calcClear() {
  calcDisplay.value = '0';
}

function calcEqual() {
  try {
    calcDisplay.value = eval(calcDisplay.value);
  } catch (e) {
    calcDisplay.value = 'Error';
  }
}

// TASKS LOGIC
function addTask() {
  const input = document.getElementById('task-in');
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.innerHTML = `<span>${text}</span> <i class="fa-solid fa-trash task-del" onclick="this.parentElement.remove()"></i>`;
  document.getElementById('task-list').appendChild(li);
  input.value = '';
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
      alert('Time is up!');
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
    out.innerHTML += 'Available commands: help, clear, date, version<br>';
  } else if (cmd === 'clear') {
    out.innerHTML = '';
  } else if (cmd === 'date') {
    out.innerHTML += `${new Date().toLocaleString()}<br>`;
  } else if (cmd === 'version') {
    out.innerHTML += 'VaskoOS Dark Edition v4.0<br>';
  } else {
    out.innerHTML += `Command not recognized: ${cmd}<br>`;
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
      document.body.style.backgroundPosition = 'center';
    };
    reader.readAsDataURL(file);
  }
});
