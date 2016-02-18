export default class CharacterControls {

	constructor(characterInstance) {
		if (characterInstance === undefined) { // CharacterControls Class must be initialized with a characterInstance
			return false;
		}
		this.character = characterInstance;
		return this;
	}

	addInstruction(instructionString) {
		const instructions = instructionString.split(' ');
		const instructionFunc = instructions[0];
		const instructionArgs = instructions[1];

		if (!instructionArgs) {
			return this[instructionFunc]();
		} else {
			return this[instructionFunc](instructionArgs.split(','));
		}
	}

	PLACE(...instructionArgsArray) {
		const instructionParams = instructionArgsArray[0];
		const x = Number(instructionParams[0]);
		const y = Number(instructionParams[1]);
		const facing = instructionParams[2];
		this.character.setFacing(facing);
		this.character.setPosition(x, y);
		return this.REPORT();
	}

	MOVE() {
		this.character.move();
		return this.REPORT();
	}

	LEFT() {
		this.character.rotate('LEFT');
		return this.REPORT();
	}

	RIGHT() {
		this.character.rotate('RIGHT');
		return this.REPORT();
	}

	REPORT() {
		const pos = this.character.getPosition();
		const facing = this.character.getFacing();
		return pos.x + ',' + pos.y + ',' + facing; // X,Y,F
	}

	RESET() {
		this.character.setFacing(undefined, true); // true = overide to allow for an illegal facing
		this.character.setPosition(undefined, undefined, true); // true = overide to allow for an illegal position
		return this.REPORT();
	}

}
