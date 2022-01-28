import { gameStats, gameSpeedInput } from "./game/constants.js";
import {
	clearCanvas,
	handleGameSpeed,
	handleGameStats,
	handlePalettesDraw,
	handlePaletteUpdate,
	keyDownHandler
} from "./game/utils.js";

export let secondsPassed, oldTimeStamp, fps;

window.onload = init;

function init() {
	window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {
	secondsPassed = (timeStamp - oldTimeStamp) / 1000;
	oldTimeStamp = timeStamp;
	fps = Math.round(1 / secondsPassed);

	handlePaletteUpdate();
	clearCanvas();
	handleGameSpeed();
	handleGameStats();
	handlePalettesDraw();

	gameStats.movingSpeed = gameSpeedInput.value;

	window.requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", keyDownHandler);
