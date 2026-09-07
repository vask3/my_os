# VaskoOS

VaskoOS is a simple, lightweight WebOS simulator that runs entirely in the browser using just HTML, CSS, and vanilla JS. I built a clean desktop interface with glassmorphism effects, dynamic window layering, and a couple of basic apps to show how it works.

---

## What it can do

* **Draggable Windows:** You can drag windows around smoothly using standard Pointer Events (works for both mouse and touch screens).
* **Smart Z-Indexing:** Click or drag a window, and it automatically brings itself to the front.
* **Live Clock:** A simple system clock in the top header that updates in real time.
* **Start Menu & Taskbar:** A basic nav bar at the bottom to open and minimize the apps.
* **Responsive Layout:** The UI scales well enough if you test it on smaller monitors or laptops.

---

## Apps Included

### Home
* A basic welcome dashboard.
* Pulls up random coding quotes just for fun.

### Notepad
* A quick text editor for your notes.
* Uses `localStorage`, so your text stays there even if you refresh or close the browser.

### Calculator
* Simple grid calculator that handles basic math (plus, minus, multiply, divide).
* Doesn't crash if you type an invalid expression.

---

## Tech Stack

* **HTML5** for the basic page layout.
* **CSS3** for styling, flexbox/grid alignments, and the blurry glass look (`backdrop-filter`).
* **Vanilla JavaScript (ES6+)** for handling the window dragging, DOM events, and saving notes.

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
