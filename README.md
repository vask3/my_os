# VaskoOS 

Instead of sharing a boring, standard personal portfolio link with people on the internet, I built **VaskoOS** — a fully interactive web-based operating system simulator where people can explore my work, test apps, and see what I'm about.

The whole thing runs completely client-side using pure **HTML5**, **CSS3**, and **Vanilla JavaScript**. No heavy frameworks, no NPM install headaches, and no complex backend configurations. It features a dark neon glassmorphism UI layout, custom app workflows, and dynamic window stacking.

---

##  Core OS Architecture & Features

* **Advanced Pointer Window Dragging:** Unlike standard mouse listeners, the window system hooks into native `Pointer Events` (`pointerdown`, `pointermove`, `pointerup`). This ensures smooth dragging functionality across mouse setups on PCs and touch gestures on mobile devices or tablets. It also uses `setPointerCapture` to lock focus so windows don't lag or snap away if you drag too fast.
* **Dynamic Depth Management (Z-Index Engine):** The script tracks active windows using a global layering counter. Clicking anywhere inside an app or initiating a drag sequence instantly bumps that specific window's `zIndex` property to the top, so active projects never get lost underneath other open tabs.
* **On-the-Fly Wallpaper Changing:** The desktop background has custom event listeners for drag-and-drop actions (`dragover` and `drop`). You can pull any image file directly from your computer files, drop it onto the workspace, and the `FileReader API` instantly encodes it into a local string to update the CSS background style.
* **Live Global Clock:** A JavaScript timer runs non-stop on a 1-second interval sequence, pulling the local `Date()` metrics and piping them smoothly into the top navigation header bar.
* **Start Menu Layout & Hidden App Logic:** The layout wraps everything in separate viewport wrappers. The bottom taskbar holds a core toggle switch that applies `.hidden` utility states to show or hide the global app list menu panel.

---

##  Deep Dive Into the Apps (What's Inside)

### 1. About Module 
* The primary dashboard landing window explaining the core goal of the project.
* Holds tips on how to interact with the system and unlock features.

### 2. Notepad (With Local Persistence) 
* A text container view where you can write out random thoughts, ideas, or to-do targets.
* Connected straight to the browser's `localStorage` engine under a unique data key. Even if you completely exit the page, reboot your machine, or refresh your browser tab, your data automatically hydrates back into the DOM upon the `DOMContentLoaded` event lifecycle.

### 3. Canvas Paint 
* A digital sketch pad utilizing the HTML5 `<canvas>` element block and 2D rendering context (`getContext('2d')`).
* Tracks mouse vector lines by chaining `lineTo()` and `stroke()` events together with a rounded line cap. Features a modular native color picker block and a fast wipe trigger function that fires `clearRect()` across the entire grid surface.

### 4. Exception-Safe Calculator 
* A classic grid math module capable of chaining base operations like addition, subtraction, division, and multiplication.
* It parses multi-string values and safely routes them through an input scanner. The calculation logic is wrapped inside a strict `try...catch` wrapper utilizing JavaScript's math evaluator—meaning that feeding the system broken or invalid syntax equations will just safely print an `Error` log string instead of throwing a script crash.

### 5. Task Manager 
* A fully dynamic to-do script designed to clear off project sub-tasks.
* It intercepts the text values from an input selector node, constructs an HTML `<li>` element layout on the fly, and uses `appendChild()` to inject it straight into the live list view. Finished elements can be dropped via inline `parentElement.remove()` handlers attached to individual trash font icons.

### 6. Pomodoro Timer 
* A focus sprint utility clock hardcoded to track standard 25-minute productivity windows (1500 seconds countdown intervals).
* Employs clean state-checking closures; it protects against double-clicking bugs by locking the countdown sequence if an active thread interval loop is already ticking down in the workspace background.

### 7. Forecast Widget 
* A standalone graphical interface display that serves as a mini local forecast app dashboard.
* Keeps the layout modular by isolating temperature elements and weather state descriptions for a neat desktop aesthetic.

### 8. CLI Terminal Simulation 
* A custom shell program focused on processing raw keyboard command codes.
* Listens specifically for `onkeydown` triggers matching the `Enter` action key code. The script scans string queries and matches them against conditional statements to execute commands like:
  * `help` — Prints a list of every active program call line.
  * `clear` — Empties the container's inner HTML stack.
  * `date` — Grabs and returns a fresh local time data string.
  * `version` — Logs out the active operating system build details.

---

##  The Technology Blueprint

* **Semantic HTML5:** Structuring clean component frames, absolute layout layers, and individual template wrappers for all workspace utilities.
* **Modern CSS3:** Heavy implementation of Flexbox lines and explicit CSS Grid template fractions for layout alignment. Uses advanced `backdrop-filter: blur(25px)` rules combined with translucent background opacities to render the frosty glass appearance.
* **Pure JavaScript Engine:** No third-party build packages, zero bulky modules, and no external frameworks. Handles raw DOM node creation, memory streams, dragging logic, and arithmetic parsers fully client-side.

---

##  Running the OS on Your Machine

### Prerequisites
You don't need any complex code setups, local servers, or development environments to preview this workspace.

### Steps to Run
1. Download a copy of these repository files straight onto your local hard drive:
   ```bash
   git clone https://github.com
   ```
2. Navigate into the main repository directory folder.
3. Locate the `index.html` file and double-click it (or drag it inside any open browser tab) to spin up the entire system instantly.
