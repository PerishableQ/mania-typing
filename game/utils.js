import { fps, secondsPassed } from "../game.js";
import {
	accuracyPlaceholder,
	canvas,
	keysStack,
	ctx,
	fpsPlaceholder,
	gameStats,
	letters,
	lettersStack,
	palettes,
	scorePlaceholder,
	gameSpeedInput,
	gameSpeedPlaceholder
} from "./constants.js";
import { Palette } from "./Palette.js";

export function randomIntFromInterval(max, min = 2) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateAlphabet() {
	const alpha = Array.from(Array(26)).map((e, i) => i + 65);
	const alphabet = alpha.map(x => String.fromCharCode(x));
	return alphabet;
}

export function handlePaletteUpdate() {
	for (let i = 0; i < palettes.length; i++) {
		palettes[i].update(secondsPassed);
	}
}

export function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function calculateNewPalettePositionY() {
	const highestPalettePositionY = palettes.map(palette => palette.y).sort((a, b) => a - b)[0];
	return highestPalettePositionY - randomIntFromInterval(60, 40);
}

export function handleGameSpeed() {
	// if (gameStats.score >= 1000) {
	// 	gameStats.movingSpeed = 60;
	// }
	// if (gameStats.score >= 3000) {
	// 	gameStats.movingSpeed = 80;
	// }
	if (gameStats.score >= 5000) {
		gameStats.movingSpeed = 100;
	}
}

export function handleGameStats() {
	fpsPlaceholder.textContent = `${fps} FPS`;
	scorePlaceholder.textContent = `Score: ${gameStats.score}`;
	accuracyPlaceholder.textContent = `Accuracy: ${gameStats.accuracy}%`;
	gameSpeedPlaceholder.textContent = `Game Speed: ${gameSpeedInput.value}`;
}

export function handlePalettesDraw() {
	for (let i = 0; i < palettes.length; i++) {
		palettes[i].draw();

		if (palettes[i].isCollided) {
			generateUniqueLetter(i);
			const palette = new Palette(
				ctx,
				palettes[i].x,
				calculateNewPalettePositionY(),
				letters[i]
			);
			palettes[i] = palette;
		}
	}
}

export function generateGameStartUniqueLetters(length = 4) {
	const letters = [];
	while (letters.length < length) {
		const letter = generateAlphabet()[randomIntFromInterval(25)];

		if (!letters.includes(letter)) {
			letters.push(letter);
		}
	}

	return letters;
}

export function generateUniqueLetter(i) {
	const randomLetter = generateAlphabet()[randomIntFromInterval(25)];

	while (!letters.includes(randomLetter)) {
		letters[i] = randomLetter;
	}
	lettersStack.push(randomLetter);
}

export function calculateAccuracy() {
	const errorRate =
		(Math.abs(keysStack.length - lettersStack.length) / lettersStack.length) * 100 || 0;

	gameStats.accuracy = (100 - errorRate).toFixed(2);

	if (gameStats.accuracy <= 0) {
		gameStats.accuracy = 0;
	}
}

export function keyDownHandler(event) {
	const currentKeyPressed = String.fromCharCode(event.keyCode);
	const errorRate =
		(Math.abs(keysStack.length - lettersStack.length) / lettersStack.length) * 100 || 0;

	keysStack.push(currentKeyPressed);
	gameStats.accuracy = (100 - errorRate).toFixed(2); // 100% - errorRate %

	if (gameStats.accuracy <= 0) {
		gameStats.accuracy = 0;
	}

	palettes.some((palette, ind) => {
		if (palette.letter === currentKeyPressed) {
			palettes[ind].isCollided = true;
			gameStats.score += 20;

			return true;
		}
	});
}
