const player = {
	x: 40,
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

let gravity = 0.6;
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

let numPlatforms = 5;

let platforms = [];

const renderCanvas = () => {
	ctx.fillStyle = "lightyellow";
	ctx.fillRect(0, 0, 500, 500);
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
				width: 50,
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
	
	let currentPlatform = -1;

	const platformCheck = (platformElem, platformIndex) => {
		if(platformElem.x-2.5 < player.x && player.x < platformElem.x + platformElem.width + 22.5 &&
		platformElem.y < player.y && player.y < platformElem.y + platformElem.height) {
			currentPlatform = platformIndex;
		}
	}

	platforms.forEach(platformCheck);

	if (currentPlatform > -1){
		player.jump = false;
		player.y = platforms[currentPlatform].y;    
	}

	renderCanvas();
	renderPlayer();
	renderPlatforms();
} 

const retryButton = document.querySelector("#retry");

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.canvas.height = 500;
ctx.canvas.width = 500;
createPlatforms();
document.addEventListener("keyup", keyUp);
document.addEventListener("keydown", keyDown);
//TODO: Animate Retry button
retryButton.addEventListener("click", () => {
	retryButton.style.backgroundColor = "rgba(248, 239, 161, 0.801)";
	gravity = 0;
	player.x_v = 0;
	player.y_v = 0;
	player.y = 200;
	player.x = 40;
	gravity = 0.6;
//TODO: Make Retry Button color reset after 1/2s
//TODO: Give Retry button curved corners or somethinggit
});

setInterval(gameLoop, 20);