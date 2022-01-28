import { generateGameStartUniqueLetters, randomIntFromInterval } from "./utils.js";
import { Palette } from "./Palette.js";

export const canvas = document.querySelector(".game-window__area");
export const ctx = canvas.getContext("2d");
export const fpsPlaceholder = document.querySelector(".game-stats__fps");
export const scorePlaceholder = document.querySelector(".game-stats__score");
export const accuracyPlaceholder = document.querySelector(".game-stats__accuracy");
export const gameSpeedPlaceholder = document.querySelector(".game-stats__game-speed");
export const gameSpeedInput = document.querySelector(".game-controls__range-input");

export const canvasWidth = canvas.width;
export const canvasHeight = canvas.height;
export const paletteWidth = canvasWidth / 4 - 9;
export const paletteHeight = canvasHeight / 10;

export const gameStats = {
	movingSpeed: 40, // pixels per second
	score: 0,
	accuracy: 100
};
export const letters = generateGameStartUniqueLetters();
export const lettersStack = [];
export const keysStack = [];

export const palettes = [
	new Palette(ctx, 0, randomIntFromInterval(0, -100), letters[0]),
	new Palette(ctx, paletteWidth + 12, randomIntFromInterval(-100, -200), letters[1]),
	new Palette(ctx, paletteWidth * 2 + 24, randomIntFromInterval(-200, -300), letters[2]),
	new Palette(ctx, paletteWidth * 3 + 36, randomIntFromInterval(-100, -300), letters[3])
];
