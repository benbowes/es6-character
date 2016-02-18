/*global window */
'use strict';

// This file is used to complile public/bundle.js which we use to
// test the toy character app via the browser

import Room from './app/Room.js';
import Character from './app/Character.js';
import CharacterControls from './app/CharacterControls.js';

window.room = new Room([
	['a1', 'a2', 'a3', 'a4', 'a5'],
	['b1', 'b2', 'b3', 'b4', 'b5'],
	['c1', 'c2', 'c3', 'c4', 'c5'],
	['d1', 'd2', 'd3', 'd4', 'd5'],
	['e1', 'e2', 'e3', 'e4', 'e5']
]);
window.character = new Character(window.room);
window.characterControls = new CharacterControls(window.character);