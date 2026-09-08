VaskoOS

Run it

Just open index.html in any modern browser. No build step, no server, no dependencies — everything is inline HTML/CSS/JS.

Features
Real-time clock in the top bar
Windows open from desktop icons or the start menu, drag freely via Pointer Events, and stack in front on focus
Notepad persists text across reloads (localStorage)
Paint: freehand canvas drawing with a color picker
Calculator: basic arithmetic with input validation
Tasks: add/delete a simple to-do list (localStorage)
Pomodoro: start/pause/reset a 25-minute countdown
Weather: simulated conditions (no external API/key)
Terminal: a handful of fake commands (help, date, clear, echo, apps, whoami)
Tech stack

Vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no external libraries or CDNs. Icons are plain text emoji rather than an icon font, so the UI renders identically regardless of network access. State that needs to survive a reload (notes, tasks) is kept in localStorage; everything else (open windows, calculator input, pomodoro state) lives in memory and resets on refresh.

Project structure

Everything lives in one file, index.html, split into three parts:

<style> — desktop background, top bar, taskbar, window chrome, and per-app layout (calculator grid, task list, terminal output, etc.)
HTML body — the desktop icon grid, the start menu, the taskbar, and one .window block per app (About, Notepad, Paint, Calculator, Tasks, Pomodoro, Weather, Terminal)
<script> — window management (open/close/focus/drag via Pointer Events), the taskbar renderer, and one small self-contained block of logic per app
Apps in detail

About — static info panel with the project name and a short description of how to use the desktop.

Notepad — a single textarea. "Save" writes the current text to localStorage under vasko-note and shows a small timestamp confirmation; "Clear" wipes both the textarea and the stored value.

Paint — a <canvas> you can draw on with the mouse or touch (Pointer Events), plus a native color picker input. "Clear" resets the canvas to blank.

Calculator — button-driven input into a display string. Before evaluating, the input is checked against a strict allow-list of digits, + - * / ( ) . and whitespace; anything else shows "greshka" instead of running.

Tasks — add a task with the input field or Enter key; each task renders as a list item with a delete (✕) button. List persists in localStorage under vasko-tasks.

Pomodoro — a 25:00 countdown driven by setInterval. Start/Pause/Reset controls; the timer stops on its own at 00:00.

Weather — picks a random condition (sunny/cloudy/rainy/snowy) from a small local array each time you hit "Refresh." Not connected to any real weather service.

Terminal — a text input that matches against a small command table (help, date, clear, echo, apps, whoami) and echoes output to a scrollable log; unknown commands get a "neznaya komanda" message instead of failing silently.

Roadmap / ideas not yet built
Window resizing and a proper minimize-to-taskbar animation
Snapping windows to screen edges
Real weather via a public API (would need a key, so left out for a no-config Jam submission)
Keyboard shortcuts for opening/closing apps
Saving overall desktop layout (which windows are open, and where) between sessions
FAQ

Why is the weather fake? To keep the project runnable with zero setup — no API keys, no server, works straight from file://.

Why emoji instead of an icon font? So icons render the same everywhere without depending on an external font/CDN being reachable.

Can I add more apps? Yes — each app is just a .window block in the HTML plus a small, self-contained chunk of JS; nothing else needs to change to add a new one.

