export class GameObject {
	constructor(ctx, x, y) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;

		this.isCollided = false;
	}
}
