export default class Room {

	constructor(newFloorplanArray) {
		if (newFloorplanArray === undefined) {
			return false;
		}
		this.floorPlan = newFloorplanArray.reverse(); // Flip it. Just cause I want to increment++ north;
		return this;
	}

	getFloorPlan() {
		return this.floorPlan; // return the whole floor plan array
	}

	getTileValue(x, y) {
		try {
			return this.floorPlan[x][y];
		} catch (err) {
			return false;
		}
	}

	getNorthOffset(x, y) {
		return {
			x: x,
			y: (y + 1)
		};
	}

	getEastOffset(x, y) {
		return {
			x: (x + 1),
			y: y
		};
	}

	getSouthOffset(x, y) {
		return {
			x: x,
			y: (y - 1)
		};
	}

	getWestOffset(x, y) {
		return {
			x: (x - 1),
			y: y
		};
	}

}
