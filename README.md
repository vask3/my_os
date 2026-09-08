# VaskoOS

VaskoOS is a lightweight, interactive web-based operating system simulation contained within a single file.

## Getting Started

To run the project, simply open index.html in any modern web browser. 
* No build steps required
* No local server needed
* No external dependencies

Everything is contained inline within a single structure of HTML, CSS, and JavaScript.

---

## Core Features

* Real-time Clock: Integrated directly into the top bar.
* Window Management: Launch windows from desktop icons or the start menu. Drag them freely using Pointer Events, and focus them dynamically to bring them to the front.
* Notepad: Text persists across page reloads using localStorage.
* Paint: A freehand canvas drawing application utilizing Pointer Events for mouse or touch input, complete with a native color picker.
* Calculator: Basic arithmetic operations featuring strict input validation.
* Tasks: A simple to-do list where you can add or delete tasks, persisting via localStorage.
* Pomodoro Timer: A 25-minute countdown clock with start, pause, and reset functionality.
* Weather Simulation: Simulated conditions generated locally without relying on external API calls or access keys.
* Terminal: A text-based command line interface supporting specific commands (help, date, clear, echo, apps, whoami).

---

## Tech Stack

The project is built entirely with Vanilla HTML, CSS, and JavaScript.
* No frameworks
* No build tools
* No external libraries or CDNs

Icons are rendered using plain text characters, ensuring the UI remains consistent regardless of network access. Persistent application states (Notepad, Tasks) rely on localStorage, while temporary data (open windows, calculator input, pomodoro state) live in memory and reset upon page refresh.

---

## Project Structure

Everything lives in a single file, index.html, which is split into three main parts:
1. style tag: Handles the desktop background, top bar, taskbar, window chrome, and per-app layouts (e.g., calculator grid, task list, terminal output).
2. HTML body: Contains the desktop icon grid, the start menu, the taskbar, and individual window blocks for each application.
3. script tag: Manages system-level features (opening, closing, focusing, and dragging windows via Pointer Events), the taskbar renderer, and isolated blocks of logic for each application.

---

## Applications in Detail

* About: A static information panel providing the project name and a brief guide on how to interact with the desktop environment.
* Notepad: A single textarea element. Clicking "Save" writes the current text to localStorage under the key "vasko-note" along with a timestamp confirmation. Clicking "Clear" wipes both the UI textarea and the stored key.
* Paint: A canvas element supporting freehand drawing via Pointer Events (mouse and touch input) along with a native color picker. The "Clear" button resets the canvas to blank.
* Calculator: Button-driven input parsed into a display string. Before evaluation, the input is cross-referenced against a strict allow-list of characters (digits, +, -, *, /, (, ), ., and whitespace). Invalid inputs yield a "greshka" output instead of processing.
* Tasks: Add entries using the input field or by pressing the Enter key. Each task features a delete button (X). The task list persists in localStorage under the key "vasko-tasks".
* Pomodoro: A 25:00 countdown timer driven by setInterval. Features Start, Pause, and Reset controls, and stops automatically upon reaching 00:00.
* Weather: Picks a random condition (sunny, cloudy, rainy, snowy) from a local array whenever you click "Refresh". It is not connected to a live weather service.
* Terminal: A text input matching commands against a local lookup table. Valid commands display their respective outputs, while unknown inputs return a "neznaya komanda" message instead of failing silently.

---

## Roadmap

* Add window resizing options and smooth minimize-to-taskbar animations.
* Implement window snapping to screen edges.
* Integrate real-world weather tracking via a public API.
* Introduce keyboard shortcuts for launching and closing specific applications.
* Save the overall desktop state (window locations and open statuses) between sessions.

---

## FAQ

**Q: Why is the weather simulated?**  
A: To keep the project runnable with zero setup—no API keys or servers are required, allowing it to work natively via the file:// protocol.

**Q: Why use text characters for icons instead of an icon font?**  
A: To ensure icons render identically across all environments without relying on external network requests or CDN availability.

**Q: Can I add more applications?**  
A: Yes. Each application requires only a single window block in the HTML and a self-contained block of JavaScript logic. No global state adjustments are necessary.
