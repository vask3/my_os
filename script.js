// chasovnik deto baci non stop
setInterval(function() {
  var t = new Date();
  document.getElementById('clock').textContent = t.toLocaleTimeString();
}, 1000);

// PROZORCI LOGIKA & DRAG
let zIndexCounter = 10;

document.querySelectorAll('.window').forEach(function(win) {
  var header = win.querySelector('.win-header');
  let isDragging = false;
  let ox = 0;
  let oy = 0;

  win.addEventListener('pointerdown', () => {
    zIndexCounter = zIndexCounter + 1;
    win.style.zIndex = zIndexCounter;
  });

  header.addEventListener('pointerdown', function(e) {
    if (e.target.closest('.win-close')) return;
    isDragging = true;
    ox = e.clientX - win.offsetLeft;
    oy = e.clientY - win.offsetTop;
    header.setPointerCapture(e.pointerId);
  });

  header.addEventListener('pointermove', (e) => {
    if (isDragging == true) {
      win.style.left = (e.clientX - ox) + 'px';
      win.style.top = (e.clientY - oy) + 'px';
    }
  });

  header.addEventListener('pointerup', () => {
    isDragging = false;
  });
});

function openWin(id) {
  var targetWin = document.getElementById(id);
  targetWin.style.display = 'block';
  zIndexCounter++;
  targetWin.style.zIndex = zIndexCounter;
}

function closeWin(id) {
  document.getElementById(id).style.display = 'none';
}

function toggleMenu() {
  var menu = document.getElementById('start-menu');
  menu.classList.toggle('hidden');
}

// DRAWING CANVAS (PAINT)
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', () => { drawing = true; });
canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', function(e) {
  if (!drawing) return;
  var bounds = canvas.getBoundingClientRect();
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.strokeStyle = document.getElementById('draw-color').value;
  ctx.lineTo(e.clientX - bounds.left, e.clientY - bounds.top);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - bounds.left, e.clientY - bounds.top);
});

function clearCanvas() { 
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
}

// ZAPISVANE NA BELEJKI (LOCALSTORAGE)
function saveNote() {
  var noteContent = document.getElementById('note-input').value;
  localStorage.setItem('vasko_dark_notes', noteContent);
  alert('Notes saved successfully!');
}

document.addEventListener('DOMContentLoaded', () => {
  var savedData = localStorage.getItem('vasko_dark_notes');
  if (savedData) {
    document.getElementById('note-input').value = savedData;
  }
});

// CALCULATOR APPA
const calcDisplay = document.getElementById('calc-display');

function calcInput(val) {
  if (calcDisplay.value === '0') {
    calcDisplay.value = val;
  } else {
    calcDisplay.value += val;
  }
}

function calcClear() {
  calcDisplay.value = '0';
}

function calcEqual() {
  try {
    calcDisplay.value = eval(calcDisplay.value);
  } catch (err) {
    calcDisplay.value = 'Error';
  }
}

// TASK LOGIKA (TO-DO LIST)
function addTask() {
  var inputField = document.getElementById('task-in');
  var txt = inputField.value.trim();
  if (txt === '') return;

  var elementLi = document.createElement('li');
  elementLi.innerHTML = `<span>${txt}</span> <i class="fa-solid fa-trash task-del" onclick="this.parentElement.remove()"></i>`;
  document.getElementById('task-list').appendChild(elementLi);
  inputField.value = '';
}

// POMODORO TIMER CHEKROK
let pomoTime = 1500;
let pomoInterval = null;

function updatePomoDisplay() {
  let minutes = Math.floor(pomoTime / 60).toString().padStart(2, '0');
  let seconds = (pomoTime % 60).toString().padStart(2, '0');
  document.getElementById('pomo-display').textContent = minutes + ':' + seconds;
}

function startPomo() {
  if (pomoInterval != null) return;
  pomoInterval = setInterval(function() {
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

// TERMINAL CODES
function handleTerm(e) {
  if (e.key !== 'Enter') return;
  var inputEl = document.getElementById('term-in');
  var outputEl = document.getElementById('term-out');
  var commandClean = inputEl.value.trim().toLowerCase();
  
  outputEl.innerHTML += `> ${inputEl.value}<br>`;
  
  if (commandClean === 'help') {
    outputEl.innerHTML += 'Available commands: help, clear, date, version<br>';
  } else if (commandClean === 'clear') {
    outputEl.innerHTML = '';
  } else if (commandClean === 'date') {
    outputEl.innerHTML += `${new Date().toLocaleString()}<br>`;
  } else if (commandClean === 'version') {
    outputEl.innerHTML += 'VaskoOS Dark Edition v4.0<br>';
  } else {
    outputEl.innerHTML += `Command not recognized: ${commandClean}<br>`;
  }
  
  inputEl.value = '';
  outputEl.scrollTop = outputEl.scrollHeight;
}

// DRPNI I PUSNI ZA FON NA DESKTOPA
var deskElement = document.getElementById('desktop');
deskElement.addEventListener('dragover', function(e) {
  e.preventDefault();
});
deskElement.addEventListener('drop', function(e) {
  e.preventDefault();
  var dropFile = e.dataTransfer.files[0];
  if (dropFile && dropFile.type.startsWith('image/')) {
    var fileReader = new FileReader();
    fileReader.onload = function(event) {
      document.body.style.backgroundImage = "url('" + event.target.result + "')";
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
    };
    fileReader.readAsDataURL(dropFile);
  }
});
