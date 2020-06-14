const player = {
	x: 200,
	y: 200,
	x_v: 0,
	y_v: 0,
	jump: true,
	height: 20,
	width: 20
};

const arrowKeys = {
	right: false,
	left: false,
	jump: false,
}

const gravity = 0.6;
const friction = 0.7;

const keyDown = (key) => {
	if (key.keyCode === 37) {arrowKeys.left = true};
	if (key.keyCode === 39) {arrowKeys.right = true};
	if (key.keyCode === 38) { 
		if(player.jump === false) {
			player.y_v = -10;
		}
	}
	//TODO: Can ternary if be used for statements with only one outcome?
};

const keyUp = (key) => {
	if (key.keyCode === 37) {arrowKeys.left = false};
	if (key.keyCode === 39) {arrowKeys.right = false};
	if (key.keyCode === 38) {
		if (player.y_v < -2) {
			player.y_v = -3;
		}
	}
	//TODO: Can ternary if be used for statements with only one outcome?	
};

let numPlatforms = 2;

let platforms = [];

const renderCanvas = () => {
	ctx.fillStyle = "#F0F8FF";
	ctx.fillRect(0, 0, 270, 270);
};

const renderPlayer = () => {
	ctx.fillStyle = "#F08080";
	ctx.fillRect((player.x)-20, (player.y)-20, player.width, player.height);
};

const createPlatforms = () => {
	for (i=0; i<numPlatforms; i++) {
		platforms.push(
			{
				x: 100 * i,
				y: 200 + (30 * i),
				width: 110,
				height: 15,
			}
		);
	}
}

const renderPlatforms = () => {
	ctx.fillStyle = "#45597E";
	platforms.forEach(platform => ctx.fillRect(platform.x, platform.y, platform.width, platform.height));
}

const gameLoop = () => {
	if(arrowKeys.right) {
		player.x += 2.5;
	};

	if(arrowKeys.left) {
		player.x += -2.5;
	};

	if(player.jump === false) {
		player.x_v *= friction;	
	} else {
		player.y_v += gravity;
	};
	player.jump = true;

	player.y += player.y_v;
	player.x += player.x_v;

	let i = -1;
	if(platforms[0].x < player.x && player.x < platforms[0].x + platforms[0].width &&
	platforms[0].y < player.y && player.y < platforms[0].y + platforms[0].height){
		i = 0;
	}
	if(platforms[1].x < player.x && player.x < platforms[1].x + platforms[1].width &&
	platforms[1].y < player.y && player.y < platforms[1].y + platforms[1].height){
		i = 1;
	}
	if (i > -1){
		player.jump = false;
		player.y = platforms[i].y;    
	}

	renderCanvas();
	renderPlayer();
	renderPlatforms();
} 

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.canvas.height = 270;
ctx.canvas.width = 270;
createPlatforms();
document.addEventListener("keyup", keyUp);
document.addEventListener("keydown", keyDown);
setInterval(gameLoop, 20);