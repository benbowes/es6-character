/*eslint-env node, mocha*/
'use strict';

describe('CharacterTest', () => {

	const assert = require('assert');
	const path = require('path');
	const Room = require(path.join(__dirname, '../../app/Room.js'));
	const Character = require(path.join(__dirname, '../../app/Character.js'));
	const CharacterControls = require(path.join(__dirname, '../../app/CharacterControls.js'));
	let room;
	let character;
	let characterControls;

	beforeEach(() => {
		room = new Room([
			['a1', 'a2', 'a3', 'a4', 'a5'],
			['b1', 'b2', 'b3', 'b4', 'b5'],
			['c1', 'c2', 'c3', 'c4', 'c5'],
			['d1', 'd2', 'd3', 'd4', 'd5'],
			['e1', 'e2', 'e3', 'e4', 'e5']
		]);
		character = new Character(room);
		characterControls = new CharacterControls(character);
	});

	afterEach(() => {
		character = {};
		room = {};
		characterControls = {};
	});

	describe('Test Setup', () => {

		it('Character, CharacterControls and Room should exist', () => {
			assert.equal(typeof(Character), 'function');
			assert.equal(typeof(CharacterControls), 'function');
			assert.equal(typeof(Room), 'function');
		});

		it('Character initialises with default values', () => {
			assert.equal(characterControls.character.getFacing(), undefined);
			assert.equal(characterControls.character.getPosition().x, undefined);
			assert.equal(characterControls.character.getPosition().y, undefined);
			assert.equal(characterControls.character.room.getFloorPlan()[1][1], 'd2');
			assert.equal(characterControls.character.room.getFloorPlan()[2][3], 'c4');
			assert.equal(characterControls.character.room.getFloorPlan()[4][4], 'a5');
		});
	});

	describe('Character is controllable', () => {

		it('Room won\'t init without a floor plan', () => {
			assert.equal(new Room().hasOwnProperty('floorPlan'), false);
		});

		it('Character won\'t init without a room', () => {
			assert.equal(new Character().hasOwnProperty('facing'), false);
		});

		it('CharacterControls won\'t init without a character', () => {
			assert.equal(new CharacterControls().hasOwnProperty('character'), false);
		});

		it('Character can turn LEFT in 90 degree increments, 450 degrees', () => {
			characterControls.addInstruction('PLACE 0,0,NORTH');
			characterControls.addInstruction('LEFT');
			assert.equal(characterControls.character.getFacing(), 'WEST');
			characterControls.addInstruction('LEFT');
			assert.equal(characterControls.character.getFacing(), 'SOUTH');
			characterControls.addInstruction('LEFT');
			assert.equal(characterControls.character.getFacing(), 'EAST');
			characterControls.addInstruction('LEFT');
			assert.equal(characterControls.character.getFacing(), 'NORTH');
			characterControls.addInstruction('LEFT');
			assert.equal(characterControls.character.getFacing(), 'WEST');
		});

		it('Character can turn RIGHT in 90 degree increments, 450 degrees', () => {
			characterControls.addInstruction('PLACE 0,0,NORTH');
			characterControls.addInstruction('RIGHT');
			assert.equal(characterControls.character.getFacing(), 'EAST');
			characterControls.addInstruction('RIGHT');
			assert.equal(characterControls.character.getFacing(), 'SOUTH');
			characterControls.addInstruction('RIGHT');
			assert.equal(characterControls.character.getFacing(), 'WEST');
			characterControls.addInstruction('RIGHT');
			assert.equal(characterControls.character.getFacing(), 'NORTH');
			characterControls.addInstruction('RIGHT');
			assert.equal(characterControls.character.getFacing(), 'EAST');
		});

		it('Character can\'t be placed in an illegal position', () => {
			characterControls.addInstruction('PLACE -6,-8,NORTH');
			characterControls.addInstruction('MOVE');
			assert.equal(characterControls.character.getPosition().x, undefined);
			assert.equal(characterControls.character.getPosition().y, undefined);
		});

		it('Character won\'t move before a PLACE command is called', () => {
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('LEFT');
			characterControls.addInstruction('RIGHT');
			characterControls.addInstruction('MOVE');
			assert.equal(characterControls.character.getPosition().x, undefined);
			assert.equal(characterControls.character.getPosition().y, undefined);
			assert.equal(characterControls.character.getFacing(), 'NORTH');

			characterControls.addInstruction('PLACE 0,0,NORTH');
			characterControls.addInstruction('MOVE');
			assert.equal(characterControls.character.getPosition().x, 0);
			assert.equal(characterControls.character.getPosition().y, 1);
			assert.equal(characterControls.character.getFacing(), 'NORTH');
		});

		it('Calling RESET will reset the character back to initial position and facing', () => {
			characterControls.addInstruction('PLACE 0,0,NORTH');
			characterControls.addInstruction('MOVE');
			assert.equal(characterControls.character.getPosition().x, 0);
			assert.equal(characterControls.character.getPosition().y, 1);
			characterControls.addInstruction('RESET');
			assert.equal(characterControls.addInstruction('REPORT'), 'undefined,undefined,undefined');
		});

	});

	describe('Character Tests', () => {

		it('Character test 1', () => {
			characterControls.addInstruction('PLACE 0,0,NORTH');
			characterControls.addInstruction('MOVE');
			assert.equal(characterControls.addInstruction('REPORT'), '0,1,NORTH');
		});

		it('Character test 2', () => {
			characterControls.addInstruction('PLACE 0,0,NORTH');
			characterControls.addInstruction('LEFT');
			assert.equal(characterControls.addInstruction('REPORT'), '0,0,WEST');
		});

		it('Character test 3', () => {
			characterControls.addInstruction('PLACE 1,2,EAST');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('LEFT');
			characterControls.addInstruction('MOVE');
			assert.equal(characterControls.addInstruction('REPORT'), '3,3,NORTH');
		});

		it('Character test 4', () => {
			characterControls.addInstruction('PLACE 0,0,NORTH');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			assert.equal(characterControls.addInstruction('REPORT'), '0,4,NORTH');
		});

		it('Character test 5', () => {
			characterControls.addInstruction('PLACE 0,0,WEST');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			assert.equal(characterControls.addInstruction('REPORT'), '0,0,WEST');
		});

		it('Character test 6', () => {
			characterControls.addInstruction('PLACE 0,0,EAST');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			assert.equal(characterControls.addInstruction('REPORT'), '4,0,EAST');
		});

		it('Character test 7', () => {
			characterControls.addInstruction('PLACE 0,0,SOUTH');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('LEFT');
			characterControls.addInstruction('MOVE');
			characterControls.addInstruction('MOVE');
			assert.equal(characterControls.addInstruction('REPORT'), '2,0,EAST');
		});

	});
});
