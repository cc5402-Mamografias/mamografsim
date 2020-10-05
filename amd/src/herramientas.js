// Abstract Herramienta
class AbstractTool() {
	constructor() {
		if (this.constructor === AbstractTool){
			throw new TypeError("Cannot construct abstract class");
		}
		if (this.update === AbstractTool.prototype.update) {
			throw new TypeError("Please implement abstract method update");
		}
		if (this.draw === AbstractTool.prototype.draw) {
			throw new TypeError("Please implement abstract method draw");
		}
	}

	update(State) {
		throw new TypeError("Do not call abstract method update from child");
	}

	draw() {
		throw new TypeError("Do not call abstract method draw from child");
	}
}

