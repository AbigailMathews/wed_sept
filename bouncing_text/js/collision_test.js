// Algorithms to determine whether two rectangles touch or overlap

// rectangles
var rect1 = { top: 20, right: 30, bottom: 10, left: 10 }; // (0, 0) is top left corner
var rect2 = { top: 15, right: 35, bottom: 5, left: 20};

detectCollision = function(a, b) {
	return ((Math.max(a.right, b.right) - Math.min(a.left, b.left)) <= ((a.right - a.left) + (b.right - b.left)))
	&&
	((Math.max(a.top, b.top) - Math.min(a.bottom, b.bottom) <= ((a.top - a.bottom) + (b.top - b.bottom))));
};

console.log(detectCollision(rect1, rect2));
console.log(detectCollision(rect2, rect1));
console.log(detectCollision(rect1, rect1));

var rect3 = { x: 10, y: 20, width: 20, height: 10};
var rect4 = { x: 5, y: 25, width: 10, height: 10};
var rect5 = { x: 10, y: 31, width: 20, height: 10};

detectCollision2 = function(a, b) {
	return (a.width + b.width) >= (a.x < b.x ? (b.x - a.x + b.width) : (a.x - b.x + a.width)) &&
	(a.height + b.height) >= (a.y < b.y ? (b.y - a.y + a.height) : (a.y - b.y + b.height));
};

console.log(detectCollision2(rect3, rect4));
console.log(detectCollision2(rect4, rect3));
console.log(detectCollision2(rect3, rect5));
