# Monty Hall Paradox

A small interactive game based on the famous Monty Hall problem, built with **JavaScript, Phaser 3, and Vite**.

## 🎮 Play Online

**[Play the game](https://YOUR-PROJECT.vercel.app)**

*Replace this link with the URL of your deployed game.*

## About

The Monty Hall problem is a probability puzzle inspired by a TV game show. The player chooses one of three doors. Behind one door is a car, while the other two hide goats.

After the initial choice, the host opens another door, revealing a goat. The player can then keep their original choice or switch to the remaining closed door.

**Should you switch?** Play the game to explore the paradox!

## Features

- Three doors with randomly assigned prizes
- Host logic that reveals a goat without revealing the car
- The option to keep or change the initial choice
- Win and lose screens
- Replayable rounds with a new prize location

## Built With

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Phaser 3](https://phaser.io/) — 2D game framework
- [Vite](https://vite.dev/) — development server and build tool

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm

### Installation

Clone the repository:

```bash
git clone YOUR-GITHUB-REPOSITORY-URL
cd YOUR-REPOSITORY-NAME
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

### Production Build

Create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## What I Learned

This project is part of my journey into game development. It helped me explore:

- Phaser scenes and Game Objects
- Handling pointer input and interactive objects
- Managing game states and round transitions
- Separating game logic from visual representation
- Working with sprites, textures, and asset loading

## Future Improvements

- Responsive layout for mobile devices
- Animations and transitions
- Improved visual feedback for player choices
- Game statistics comparing switching and staying strategies

## License

The source code is available for learning and portfolio purposes. Please check the licenses of individual assets before reusing them.

---

*Built as a learning project while exploring 2D game development with Phaser 3.*