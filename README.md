# Install the dependencies
Run the following command within this folder to install a node server, Mocha, and browserify. All items install locally (not globally).

```
npm install
```

# Testing the character
There are two ways to test the functionality of the character. Via the terminal with Mocha, or in your browser via your browser's console.

## Test in terminal via Mocha
Type the following command into your terminal.

```
npm test
```

## Test in your browser's console
You can test in your browser's console by typing in the following command and open the inspector (Refresh the window).

```
npm start
```

Testing in the browser console can be done using the following commands:

```
characterControls.addInstruction('PLACE 0,0,NORTH');

characterControls.addInstruction('MOVE');

characterControls.addInstruction('LEFT');

characterControls.addInstruction('RIGHT');

characterControls.addInstruction('REPORT'); // X,Y,F

characterControls.addInstruction('RESET'); // Resets character back to initial state
```
