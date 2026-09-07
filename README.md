# VaskoOS

VaskoOS is a simple, lightweight WebOS simulator that runs entirely in the browser using just HTML, CSS, and vanilla JS. I built a clean desktop interface with glassmorphism effects, dynamic window layering, and a bunch of basic apps to show how it works.

---

## What it can do

* **Draggable Windows:** You can drag windows around smoothly using standard Pointer Events (works for both mouse and touch screens).
* **Smart Z-Indexing:** Click or drag a window, and it automatically brings itself to the front.
* **Live Clock:** A simple system clock in the top header that updates in real time.
* **Start Menu & Taskbar:** A basic nav bar at the bottom to open and minimize the apps.
* **Custom Wallpapers:** You can drag and drop any image file directly onto the background to change the wallpaper.
* **Responsive Layout:** The UI scales well enough if you test it on smaller monitors or laptops.

---

## Apps Included

### About
* A basic welcome dashboard explaining the core concept of VaskoOS.

### Notepad
* A quick text editor for your notes.
* Uses `localStorage`, so your text stays there even if you refresh or close the browser.

### Canvas Paint
* A small drawing tool with a color picker where you can sketch things and clear the canvas easily.

### Calculator
* Simple grid calculator that handles basic math (plus, minus, multiply, divide).
* Doesn't crash if you type an invalid expression.

### Task Manager
* A simple to-do list application where you can type in tasks, add them, and manage your daily goals.

### Pomodoro Timer
* A focus timer preset to 25 minutes with Start and Reset controls to track productivity.

### Weather
* A mini widget displaying the current forecast, temperature, and atmospheric conditions.

### Terminal
* VaskoOS Terminal (v4.0 Dark Edition) that lets you type in basic commands via a text prompt.

---

## Tech Stack

* **HTML5** for the basic page layout.
* **CSS3** for styling, flexbox/grid alignments, and the blurry glass look (`backdrop-filter`).
* **Vanilla JavaScript (ES6+)** for handling the window dragging, DOM events, and app logic.

---

## How to Run It

### Prerequisites
You don't need to install anything, configure local servers, or download extra frameworks.

### Setup Steps
1. Clone or download this repo to your computer:
   ```bash
   git clone https://github.com
   ```
2. Open the project folder and double-click the `index.html` file to launch it directly in your web browser.
