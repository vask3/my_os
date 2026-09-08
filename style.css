### 2. Финалният `script.js`
```javascript
// пуска и върти часа горе вдясно
setInterval(function() {
  var t = new Date();
  document.getElementById('clock').textContent = t.toLocaleTimeString();
}, 1000);

// всичко за местенето на прозорците
let layerCounter = 15;

document.querySelectorAll('.window').forEach(function(win) {
  var header = win.querySelector('.win-header');
  if (!header) return;
  
  let мърда ли = false;
  letstartX = 0;
  letstartY = 0;

  // при цъкане прозореца излиза най-отпред
  win.addEventListener('pointerdown', function() {
    layerCounter++;
    win.style.zIndex = layerCounter;
  });

  // улавяне на хедъра
  header.addEventListener('pointerdown', function(e) {
    if (e.target.closest('.win-close')) return;
    мърда ли = true;
    startX = e.clientX - win.offsetLeft;
    startY = e.clientY - win.offsetTop;
    header.setPointerCapture(e.pointerId);
  });

  // местене по екрана
  header.addEventListener('pointermove', function(e) {
    if (мърда ли === true) {
      win.style.left = (e.clientX - startX) + 'px';
      win.style.top = (e.clientY - startY) + 'px';
    }
  });

  // пускане на мишката
  header.addEventListener('pointerup', function() {
    мърда ли = false;
  });
});

// отваря прозорец по неговото ID
function openWin(id) {
  var target = document.getElementById(id);
  if (target) {
    target.style.display = 'block';
    layerCounter++;
    target.style.zIndex = layerCounter;
  }
}

// затваря прозорец по неговото ID
function closeWin(id) {
  var target = document.getElementById(id);
  if (target) {
    target.style.display = 'none';
  }
}

// отваря и затваря старт менюто долу
function toggleMenu() {
  var меню = document.getElementById('start-menu');
  if (меню) {
    меню.classList.toggle('hidden');
  }
}

// логиката на приложението за рисуване (Paint)
const canvas = document.getElementById('canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let drawState = false;

  canvas.addEventListener('mousedown', function() { drawState = true; });
  canvas.addEventListener('mouseup', function() { drawState = false; ctx.beginPath(); });
  canvas.addEventListener('mousemove', function(e) {
    if (drawState === false) return;
    var граници = canvas.getBoundingClientRect();
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById('draw-color').value;
    ctx.lineTo(e.clientX - граници.left, e.clientY - граници.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - граници.left, e.clientY - граници.top);
  });
}

// изтриване на нарисуваното
function clearCanvas() { 
  const cv = document.getElementById('canvas');
  if (cv) {
    const cx = cv.getContext('2d');
    cx.clearRect(0, 0, cv.width, cv.height); 
  }
}

// запазване на бележките
function saveNote() {
  var текст = document.getElementById('note-input').value;
  localStorage.setItem('vasko_dark_notes', текст);
  alert('Notes saved successfully!');
}

// зареждане на бележките от паметта на браузъра
document.addEventListener('DOMContentLoaded', function() {
  var стариДанни = localStorage.getItem('vasko_dark_notes');
  var поле = document.getElementById('note-input');
  if (стариДанни && поле) {
    поле.value = стариДанни;
  }
});

// писане на числа в калкулатора
function calcInput(val) {
  const дисп = document.getElementById('calc-display');
  if (!дисп) return;
  if (дисп.value === '0') {
    дисп.value = val;
  } else {
    дисп.value += val;
  }
}

// чистене на калкулатора
function calcClear() {
  const дисп = document.getElementById('calc-display');
  if (дисп) дисп.value = '0';
}

// изчисляване на равенството
function calcEqual() {
  const дисп = document.getElementById('calc-display');
  if (!дисп) return;
  try {
    дисп.value = eval(дисп.value);
  } catch (err) {
    дисп.value = 'Error';
  }
}

// добавяне на задача към To-Do листа
function addTask() {
  var инпут = document.getElementById('task-in');
  var стойност = инпут.value.trim();
  if (стойност === '') return;

  var лиЕл = document.createElement('li');
  // добавено триене на ред при цъкане на кофата
  |лиЕл.innerHTML = `<span>${стойност}</span> <i class="fa-solid fa-trash task-del" onclick="this.parentElement.remove()"></i>`;
  document.getElementById('task-list').appendChild(лиЕл);
  инпут.value = '';
}

// Помодоро таймер променливи и управление
let pomoTime = 1500;
let pomoInterval = null;

function updatePomoDisplay() {
  let m = Math.floor(pomoTime / 60).toString().padStart(2, '0');
  let s = (pomoTime % 60).toString().padStart(2, '0');
  var екран = document.getElementById('pomo-display');
  if (екран) екран.textContent = m + ':' + s;
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

// управление на конзолата / терминала
function handleTerm(e) {
  if (e.key !== 'Enter') return;
  var вход = document.getElementById('term-in');
  var изход = document.getElementById('term-out');
  var команда = вход.value.trim().toLowerCase();
  
  изход.innerHTML += `> ${вход.value}<br>`;
  
  if (команда === 'help') {
    изход.innerHTML += 'Available commands: help, clear, date, version<br>';
  } else if (команда === 'clear') {
    изход.innerHTML = '';
  } else if (команда === 'date') {
    изход.innerHTML += `${new Date().toLocaleString()}<br>`;
  } else if (команда === 'version') {
    изход.innerHTML += 'VaskoOS Dark Edition v4.0<br>';
  } else {
    изход.innerHTML += `Command not recognized: ${команда}<br>`;
  }
  
  вход.value = '';
  изход.scrollTop = изход.scrollHeight;
}

// drag and drop за тапет на фона
var плот = document.getElementById('desktop');
if (плот) {
  плот.addEventListener('dragover', function(e) {
    e.preventDefault();
  });
  плот.addEventListener('drop', function(e) {
    e.preventDefault();
    var намерениФайлове = e.dataTransfer.files;
    if (намерениФайлове.length > 0 && намерениФайлове[0].type.startsWith('image/')) {
      var reader = new FileReader();
      reader.onload = function(event) {
        document.body.style.backgroundImage = "url('" + event.target.result + "')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
      };
      reader.readAsDataURL(намерениФайлове[0]);
    }
  });
}
