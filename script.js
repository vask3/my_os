// върти часовника на всеки секунда
setInterval(function() {
  var dataVreme = new Date();
  document.getElementById('clock').textContent = dataVreme.toLocaleTimeString();
}, 1000);

// управление на прозорците и местенето им
let zIndexCounter = 10;

document.querySelectorAll('.window').forEach(function(win) {
  var header = win.querySelector('.win-header');
  if (!header) return;
  
  let влачене = false;
  let offsetX = 0;
  let offsetY = 0;

  // цъкане върху самия прозорец го вдига най-отгоре
  win.addEventListener('pointerdown', function() {
    zIndexCounter = zIndexCounter + 1;
    win.style.zIndex = zIndexCounter;
  });

  // започване на местенето от хедъра
  header.addEventListener('pointerdown', function(e) {
    if (e.target.closest('.win-close')) return;
    влачене = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    header.setPointerCapture(e.pointerId);
  });

  // мърдане по екрана
  header.addEventListener('pointermove', function(e) {
    if (влачене === true) {
      win.style.left = (e.clientX - offsetX) + 'px';
      win.style.top = (e.clientY - offsetY) + 'px';
    }
  });

  // пускане на мишката спира местенето
  header.addEventListener('pointerup', function() {
    влачене = false;
  });
});

// отваряне на приложение по ID
function openWin(id) {
  var tTarget = document.getElementById(id);
  if (tTarget) {
    tTarget.style.display = 'block';
    zIndexCounter++;
    tTarget.style.zIndex = zIndexCounter;
  }
}

// затваряне на приложение
function closeWin(id) {
  var tTarget = document.getElementById(id);
  if (tTarget) {
    tTarget.style.display = 'none';
  }
}

// пускане и скриване на старт менюто
function toggleMenu() {
  var elementMenu = document.getElementById('start-menu');
  if (elementMenu) {
    elementMenu.classList.toggle('hidden');
  }
}

// логика за чертане в пейнт приложението
const canvas = document.getElementById('canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let рисуваЛи = false;

  canvas.addEventListener('mousedown', function() { рисуваЛи = true; });
  canvas.addEventListener('mouseup', function() { рисуваЛи = false; ctx.beginPath(); });
  canvas.addEventListener('mousemove', function(e) {
    if (!рисуваЛи) return;
    var позиция = canvas.getBoundingClientRect();
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById('draw-color').value;
    ctx.lineTo(e.clientX - позиция.left, e.clientY - позиция.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - позиция.left, e.clientY - позиция.top);
  });
}

// чистене на платното
function clearCanvas() { 
  const cv = document.getElementById('canvas');
  if (cv) {
    const cx = cv.getContext('2d');
    cx.clearRect(0, 0, cv.width, cv.height); 
  }
}

// запис на бележките в паметта на браузъра
function saveNote() {
  var съдържание = document.getElementById('note-input').value;
  localStorage.setItem('vasko_dark_notes', съдържание);
  alert('Notes saved successfully!');
}

// зареждане на старите бележки при пускане на сайта
document.addEventListener('DOMContentLoaded', function() {
  var стадиданни = localStorage.getItem('vasko_dark_notes');
  var текстоваКутия = document.getElementById('note-input');
  if (стадиданни && текстоваКутия) {
    текстоваКутия.value = стадиданни;
  }
});

// калкулатор въвеждане на числа
function calcInput(val) {
  const екран = document.getElementById('calc-display');
  if (!екран) return;
  if (екран.value === '0') {
    екран.value = val;
  } else {
    екран.value += val;
  }
}

// чистене на калкулатора
function calcClear() {
  const екран = document.getElementById('calc-display');
  if (екран) екран.value = '0';
}

// смятане на резултата
function calcEqual() {
  const екран = document.getElementById('calc-display');
  if (!екран) return;
  try {
    екран.value = eval(екран.value);
  } catch (err) {
    екран.value = 'Error';
  }
}

// добавяне на задача към списъка
function addTask() {
  var кутияЗаВъвеждане = document.getElementById('task-in');
  var текстЗадачa = кутияЗаВъвеждане.value.trim();
  if (текстЗадачa === '') return;

  var новРед = document.createElement('li');
  новРед.innerHTML = `<span>${текстЗадачa}</span> <i class="fa-solid fa-trash task-del" onclick="this.parentElement.remove()"></i>`;
  document.getElementById('task-list').appendChild(новРед);
  кутияЗаВъвеждане.value = '';
}

// помодоро таймер настройки
let pomoTime = 1500;
let pomoInterval = null;

function updatePomoDisplay() {
  let мин = Math.floor(pomoTime / 60).toString().padStart(2, '0');
  let сек = (pomoTime % 60).toString().padStart(2, '0');
  var дисплей = document.getElementById('pomo-display');
  if (дисплей) дисплей.textContent = мин + ':' + сек;
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

// терминални команди
function handleTerm(e) {
  if (e.key !== 'Enter') return;
  var inputEl = document.getElementById('term-in');
  var изходЕл = document.getElementById('term-out');
  var чистаКоманда = inputEl.value.trim().toLowerCase();
  
  изходЕл.innerHTML += `> ${inputEl.value}<br>`;
  
  if (чистаКоманда === 'help') {
    изходЕл.innerHTML += 'Available commands: help, clear, date, version<br>';
  } else if (чистаКоманда === 'clear') {
    изходЕл.innerHTML = '';
  } else if (чистаКоманда === 'date') {
    изходЕл.innerHTML += `${new Date().toLocaleString()}<br>`;
  } else if (чистаКоманда === 'version') {
    изходЕл.innerHTML += 'VaskoOS Dark Edition v4.0<br>';
  } else {
    изходЕл.innerHTML += `Command not recognized: ${чистаКоманда}<br>`;
  }
  
  inputEl.value = '';
  изходЕл.scrollTop = изходЕл.scrollHeight;
}

// влачене на картинка за смяна на тапет
var десктопЕлемент = document.getElementById('desktop');
if (десктопЕлемент) {
  десктопЕлемент.addEventListener('dragover', function(e) {
    e.preventDefault();
  });
  десктопЕлемент.addEventListener('drop', function(e) {
    e.preventDefault();
    var файлове = e.dataTransfer.files;
    if (файлове && файлове[0] && файлове[0].type.startsWith('image/')) {
      var четец = new FileReader();
      четец.onload = function(event) {
        document.body.style.backgroundImage = "url('" + event.target.result + "')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
      };
      четец.readAsDataURL(файлове[0]);
    }
  });
}
