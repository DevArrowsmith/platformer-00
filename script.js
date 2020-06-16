const player = {
	x: 25,
	y: 100,
	velocity_x: 0,
	velocity_y: 0,
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
let dodgerSpeed = 0.1;

const keyDown = (key) => {
	if (key.keyCode === 37) {arrowKeys.left = true};
	if (key.keyCode === 39) {arrowKeys.right = true};
	if (key.keyCode === 38) { 
		if(player.jump === false) {
			player.velocity_y = -10;
		}
	}
};

const keyUp = (key) => {
	if (key.keyCode === 37) {arrowKeys.left = false};
	if (key.keyCode === 39) {arrowKeys.right = false};
	if (key.keyCode === 38) {
		if (player.velocity_y < -2) {
			player.velocity_y = -3;
		}
	}
};

let numPlatforms = 5;

let platforms = [];
let dodgers = [];

const renderCanvas = () => {
	ctx.fillStyle = "lightyellow";
	ctx.fillRect(0, 0, 500, 500);
};

const renderPlayer = () => {
	ctx.fillStyle = "#F08080";
	ctx.fillRect((player.x)-20, (player.y)-20, player.width, player.height);
};

/*
const renderDodgerEnemy = (originX, originY) => {
	ctx.fillStyle = "#000000";
	ctx.fillRect(originX, originY, 15, 15);
};

renderDodgerEnemy(100, 100);
*/

let currentPlatformY = 250;

const createPlatforms = () => {
	for (i=0; i<numPlatforms; i++) {
		currentPlatformY += ((Math.floor(Math.random() * 150)) - 75);
		if (currentPlatformY < 485 && currentPlatformY > 100) { 
			platforms.push(
				{
					x: 100 * i,
					y: currentPlatformY,
					width: 50,
					height: 15,
				}
			);
			if ((Math.floor(Math.random() * 2) > 0) && platforms.length > 1) {
				dodgers.push(
					{
						x: (100 * i) + (platforms[i].width / 3),
						y: currentPlatformY + 25,
						origin_y: currentPlatformY,
						velocity_x: 0,
						velocity_y: 0,
						width: 15,
						height: 15,
					}
				)
			};
		} else {
			currentPlatformY = 425;
			platforms.push(
				{
					x: 100 * i,
					y: currentPlatformY,
					width: 50,
					height: 15,
				}
			);
		};		
	}
};



const renderPlatforms = () => {
	ctx.fillStyle = "#45597E";
	platforms.forEach(platform => ctx.fillRect(platform.x, platform.y, platform.width, platform.height));
}

const renderDodgers = () => {
	ctx.fillStyle = "#000000";
	dodgers.forEach(dodger => ctx.fillRect(dodger.x, dodger.y, dodger.width, dodger.height));
}

const gameLoop = () => {
	if(arrowKeys.right) {
		player.x += 2.5;
	};

	if(arrowKeys.left) {
		player.x += -2.5;
	};

	if(player.jump === false) {
		player.velocity_x *= friction;	
	} else {
		if (player.velocity_y < 10) {
			player.velocity_y += gravity
		} else {
			player.velocity_y = 10
		};
	};
	player.jump = true;

	player.y += player.velocity_y;
	player.x += player.velocity_x;

	const dodgerController = (dodgerElem) => {
		if(dodgerElem.y > dodgerElem.origin_y) {
			dodgerElem.velocity_y -= dodgerSpeed
		} else {
			dodgerElem.velocity_y += dodgerSpeed
		};

		dodgerElem.y += dodgerElem.velocity_y;
	};

	dodgers.forEach(dodgerController);

		//origin_y: A property of each dodger object that is equal to the y position of the platform it orbits.
		// The dodgers start off at origin + 25.
		// Let's give them an initial upwards velocity too (negative x; TODO:).
		// We can then use the player jump aspect of the game loop (line 130) as a model of the loop to define velocity.



	
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
	renderDodgers();
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
	platforms = [];
	gravity = 0;
	player.velocity_x = 0;
	player.velocity_y = 0;
	player.y = 200;
	player.x = 40;
	gravity = 0.6;
	createPlatforms();

//TODO: Make Retry Button color reset after 1/2s
//TODO: Give Retry button curved corners or somethinggit
});

setInterval(gameLoop, 20);