# Pac-Man (pacman-parvej)

Small Pac-Man style demo built with Phaser 3 and TypeScript. Runs with Vite.

## Features
- Simple maze rendering from a `MAZE` array
- Pac-Man as a circle controlled by cursor keys
- Pellets that disappear when collected

## Prerequisites
- Node.js (16+ recommended)
- npm or yarn

## Install
```bash
npm install
```

## Run (development)
```bash
npm run dev
```
Open http://localhost:5173 (or the port Vite reports).

## Build
```bash
npm run build
```

## Project layout
- [index.html](index.html) — entry HTML
- [src/main.ts](src/main.ts) — game implementation
- [todo.txt](todo.txt) — helpful commands (create/push repo)
- [.gitignore](.gitignore)

## Push to GitHub
See `todo.txt` for safe, copyable commands. Recommended: use the `gh` CLI:

```bash
gh repo create bparvej/pacman-parvej --public --source . --push
```

## Contributing
Open an issue or PR with improvements. Suggestions: add ghosts, scoring, sounds, or levels.

## Author
bparvej
