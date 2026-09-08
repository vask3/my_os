# What is VaskoOS?
VaskoOS is a small fun web simulation of an operating system that fits into just a single file!

## How to run it?
Very easy - just open index.html in any modern browser.

No installations or headaches.
You do not need a local server.
No external libraries or dependencies.
Everything is crammed inside pure HTML CSS and JavaScript.

## What features does it have (Core Functions)?
* **Real-time clock:** It sits right at the top bar.
* **Window manager:** You can open things from the desktop or the start menu drag windows around with your mouse or finger and focus them so they come to the front.
* **Notepad:** You write something and it saves automatically even after restart (thanks to localStorage).
* **Paint:** You can doodle freely and it even has a color palette.
* **Calculator:** Standard math with a bit of protection so it doesn't crash if you type something unexpected.
* **Tasks:** Classic to-do list - add delete everything stays saved.
* **Pomodoro timer:** 25 minutes for focus with start pause and reset buttons.
* **Weather simulation:** It randomly picks what the weather is (sunny rainy etc.) locally without calling external sites.
* **Terminal:** A console for old-school folks where you can type commands like help date whoami and others.

## What technologies is it made with?
Just pure Vanilla HTML CSS and JavaScript. No heavy frameworks (like React or Vue) no build tools. The icons are just text so everything looks the same everywhere even if you don't have internet.

## Project Structure
Like I said everything is in a single file (index.html) which is split into three main parts:

1. **The Style (CSS):** For background bars windows and the design of the apps themselves.
2. **The HTML body:** Desktop icons start menu taskbar and the windows themselves.
3. **The Script (JS):** Window movement opening/closing and the logic for each individual app.

## What else do I plan to add (The Roadmap):
* Make windows resizable and add smoother minimize to bottom animations.
* Snap windows to screen edges.
* Real weather forecast via a public API.
* Shortcuts for easier app launching.
* Saving the entire desktop state between sessions.

## Frequently Asked Questions (FAQ)
* **Why is the weather simulated?** So the project can start instantly everywhere without messing with API keys or internet connection.
* **Why are icons text instead of images?** To avoid any trouble loading from external servers.
* **Can I add more apps?** Yes it is super easy each app is just an isolated piece of code.
