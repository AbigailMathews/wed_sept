/**
	This file takes a string, breaks it into component words and characters, and
	bounces them off the edges of the browser window.  We begin with the first
	letter.  When it hits the right edge, the next element "splits" off from it,
	and so on.  The new element is given a random color and a unique rate of motion.
*/

var elem = null;
// index of text item
var idx = 0;
// How many pixels do we move element each frame?
var motionUnit = 1;
var textString = 'Website Under Construction';
// Decompose textString into an array of individual characters and words.
var textArray = textString.split(" ");
var textElements = [];
for (var i = 0; i < textArray.length; i++) {
	textElements = textElements.concat(textArray[i].split(""));
	textElements.push(textArray[i]);
}
var rateArray = randomRates();
// The following two variables will be modified when the screen is resized.
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
// 16 basic HTML colors minus white (which would cause text to disappear)
var BASIC_COLORS = ['yellow','fuchsia','red','silver','gray',
'olive','purple','maroon','aqua','lime','teal','green','blue','navy','black'];

// Make a <span> element containing a string.
function createTextItem(idx) {
	var r = document.createElement("span");
	var t = document.createTextNode(textElements[idx]);
	r.appendChild(t);
	document.body.appendChild(r);
	return r;
}

// This function starts the process when page is loaded.
function init () {
	elem = createTextItem(idx);
	++idx;
	move(elem, rateArray[0], 1, -1);
}

// Return a color randomly selected from an array of colors.
function getColor () {
	return BASIC_COLORS[(Math.floor(Math.random() * 15))];
}

// When window is resized, change screen height and width variables.
// If right edge is moved, lots of creation events may be triggered.
document.body.onresize = function() {
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;
}

// Elements will have rates of 1px/ms to number of elements.  Arrange this list
// randomly.  Every item will have a different speed, ensuring they
// won't clump.
function randomRates() {
	var seedArray = [];
	// Create the array to rearrange
	for (var i = 0; i < textElements.length; i++) {
		seedArray[i] = i + 1;
	}
	var result = [];
	// Feed elements of seedArray into result array by random index.
	while (seedArray.length > 0) {
		var randomIdx = (Math.floor(Math.random() * seedArray.length));
		result.push(seedArray[randomIdx]);
		// Remove value at used index from seedArray.
		seedArray.splice(randomIdx, 1);
	}
	return result;
}

function move(elem, rate, xDir, yDir) {
	var textBounds = elem.getBoundingClientRect();
	var textLeft = textBounds.left;
	var textBottom = screenHeight - textBounds.bottom;
	var textWidth = elem.clientWidth;
	var textHeight = elem.clientHeight;
	function frame() {
		textLeft += xDir * motionUnit;
		textBottom += yDir * motionUnit;
		elem.style.left = textLeft + 'px';
		elem.style.bottom = textBottom + 'px';
		// Collision with right edge creates a new element which moves in an opposite
		// vertical direction to its "parent".  The horizontal direction of parent
		// and "child" are reversed.
		if (textLeft >= (screenWidth - textWidth)) {
			xDir = -1;
			if (idx < textElements.length) {
				var me = createTextItem(idx);
				// New element needs to be right-aligned with the screen edge.
				me.style.left = screenWidth - me.clientWidth + 'px';
				me.style.bottom = elem.style.bottom;
				me.style.margin = '0';
				// Random color for new element
				me.style.color = getColor();
				var myRate = rateArray[idx];
				++idx;
				move(me, myRate, xDir, yDir * -1);
			}
		}
		// Collision with left edge
		if (textLeft <= 0) {
			xDir = 1;
		}
		// Collision with top
		if (textBottom >= (screenHeight - textHeight)) {
			yDir = -1;
		}
		// Collision with bottom
		if (textBottom <= 0) {
			yDir = 1;
		}
	}
	
	setInterval(frame, rate);
}

window.onload = init;