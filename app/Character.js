export default class Character {

	constructor(room) {
		if (room === undefined) {
			return false;
		}
		this.room = room;
		this.position = {
			x: undefined,
			y: undefined
		};
		this.facing = undefined;
		this.possibleDirections = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
		return this;
	}

	setPosition(x, y, allowIllegalPosition) {
		const pos = this.room.getTileValue(x, y);
		if (pos !== false && pos !== undefined) {
			this.position = {
				x: x,
				y: y
			};
			return this.position;
		} else if (allowIllegalPosition === true) {
			this.position = {
				x: x,
				y: y
			};
			return this.position;
		} else {
			return false;
		}
	}

	getPosition() {
		return {
			x: this.position.x,
			y: this.position.y
		};
	}

	setFacing(direction, allowIllegalDirection) {
		if (this.possibleDirections.indexOf(direction) > -1) {
			this.facing = direction;
		} else if (allowIllegalDirection === true) {
			this.facing = direction;
		}
		return this.facing;
	}

	getFacing() {
		return this.facing;
	}

	rotate(direction) {
		let directionIndex = this.possibleDirections.indexOf(this.facing);
		switch (direction) {
			case 'LEFT':
				directionIndex--;
				break;
			case 'RIGHT':
				directionIndex++;
				break;
		}

		// ensure currDirIndex value wraps around to stay in bounds of array
		if (directionIndex > this.possibleDirections.length - 1) {
			directionIndex = 0;
		}
		if (directionIndex < 0) {
			directionIndex = this.possibleDirections.length - 1;
		}

		this.setFacing(this.possibleDirections[directionIndex]);
		return this.facing;
	}

	move() {
		let pos;

		if (this.facing === undefined) { //Character.move requires Character.facing to be set
			return false;
		}

		// Get the next position of the character based on which way the character is facing
		switch (this.facing) {
			case 'NORTH':
				pos = this.room.getNorthOffset(this.position.x, this.position.y);
				break;
			case 'EAST':
				pos = this.room.getEastOffset(this.position.x, this.position.y);
				break;
			case 'SOUTH':
				pos = this.room.getSouthOffset(this.position.x, this.position.y);
				break;
			case 'WEST':
				pos = this.room.getWestOffset(this.position.x, this.position.y);
				break;
		}
		// if the position is valid it will return {x:x, y:y}, or will return false
		return this.setPosition(pos.x, pos.y);
	}
}
