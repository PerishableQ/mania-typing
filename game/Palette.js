import { generateAlphabet, randomIntFromInterval } from "./utils.js";
import { canvasHeight, ctx, gameStats, paletteHeight, paletteWidth } from "./constants.js";
import { GameObject } from "./GameObject.js";

export class Palette extends GameObject {
	constructor(ctx, x, y, letter) {
		super(ctx, x, y);

		this.width = paletteWidth;
		this.height = paletteHeight;
		this.letter = letter;
	}

	draw() {
		ctx.fillStyle = "#03045e";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.font = "10px Georgia";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "#f1c0e8";
		ctx.fillText(`${this.letter}`, this.x + this.width / 2, this.y + this.height / 2);
	}

	update(secondsPassed) {
		if (this.y + this.height > canvasHeight) {
			this.isCollided = true;
		}

		this.y += gameStats.movingSpeed * (secondsPassed || 0.0167);
	}
}
