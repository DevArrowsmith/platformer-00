//Canvas Settings /////////////////////////////////////

const canvasParams = {
	fillColor: "lightYellow",
	origin_x: 0,
	origin_y: 0,
	height: 500,
	width: 500,
}

const renderCanvas = () => {
	ctx.fillStyle = `${canvasParams.fillColor}`;
	ctx.fillRect(canvasParams.origin_x, canvasParams.origin_y, canvasParams.height, canvasParams.width);
};

//Physical Parameters & Constants ///////////////////////

let gravity = 0.6;
const friction = 0.7;


// Player Settings ////////////////////////////

const player = {
	x: 25,
	y: 10,
	velocity_x: 0,
	velocity_y: 0,
	jump: true,
	height: 20,
	width: 20
};

const renderPlayer = () => {
	ctx.fillStyle = "#F08080";
	ctx.fillRect((player.x)-20, (player.y)-20, player.width, player.height);
};

const setPlayerDefault = () => {
	player.x = 25,
	player.y = 10,
	player.velocity_x = 0,
	player.velocity_y = 0,
	player.jump = true,
	player.height = 20,
	player.width = 20
};

//Control Settings //////////////////////////////////////////

const arrowKeys = {
	right: false,
	left: false,
	jump: false,
}


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

/*TO ADD: 
Control diagram somewhere on screen. erhaps under the canvas?
Event listeners to change button highlight when they're held down
*/

const retryButton = document.querySelector("#retry");
const newLevelButton = document.querySelector("#new-level");

const buttonTextFlash = (buttonName) => {
	buttonName.style.color = "#E0E0E0";
	buttonName.style.transition = "color 0.2s linear";
	
	setTimeout(() => {
		buttonName.style.color = "unset";
		buttonName.style.transition = "color 0.2s linear";
	}, 300);
};

//Platform & Dodger Settings /////////////////////////////////////

let numPlatforms = 5;
let currentPlatformY = 250;
let platforms = [];

let dodgerSpeed = 0.1;
let dodgers = [];

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

const dodgerController = (dodgerElem) => {
	if(dodgerElem.y > dodgerElem.origin_y) {
		dodgerElem.velocity_y -= dodgerSpeed
	} else {
		dodgerElem.velocity_y += dodgerSpeed
	};

	dodgerElem.y += dodgerElem.velocity_y;
};


// Fireworks Settings ///////////////////////////////////////////////

const numFireworks = 25;
const fireworks = [];

const renderFireworks = () => {
	fireworks.forEach(firework => {
		ctx.fillStyle = firework.color;
		ctx.fillRect(firework.x, firework.y, firework.width,firework.height);
	});
};

const fireworkColorGenerator = () => {
	const figures = '0123456789ABCDEF';
	let randomFireworkColor = '#';
	for (i = 0; i < 6; i++) {
	  randomFireworkColor += figures[Math.floor(Math.random() * 16)];
	}
	return randomFireworkColor;
};

const createFireworks = () => {
	for (let i=0; i<numFireworks; i++) {
		fireworks.push(
			{
			x: 245,
			y: 245,
			width: 10,
			height: 10,
			velocity_x: -12 + Math.floor(Math.random() * 24),
			velocity_y: Math.floor(Math.random() * -20),
			color: fireworkColorGenerator(),
			}
		)
	};
};


// Goal Settings ///////////////////////////////////////////////////////

const goalParams = {};

const renderGoal = (finalPlatformY) => {
	goalParams.top = finalPlatformY - 130;
	goalParams.bottom = finalPlatformY - 50;
	ctx.fillStyle = "#80e080";
	ctx.fillRect(490, (finalPlatformY - 50), 10, 15);
	ctx.fillRect(490, (finalPlatformY - 130), 10, 15);
}

// Level Generator Settings //////////////////////////////////////////////

const generateNewLevel = () => {
	platforms = [];
	dodgers = [];
	gravity = 0;
	setPlayerDefault();
	gravity = 0.6;
	createPlatforms();
};

//Win Settings ////////////////////////////////////////////////////////////

const winCheck = () => {
	if (player.x > canvasParams.width + 20 && player.y > goalParams.top - 30 && player.y < goalParams.bottom + 30) {
	createFireworks();
	generateNewLevel()
	}
};

// Game Loop ///////////////////////////////////////////////////////////////

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


	dodgers.forEach(dodgerController);
	
	let currentPlatform = -1;

	const platformCheck = (platformElem, platformIndex) => {
		if(platformElem.x-2.5 < player.x && player.x < platformElem.x + platformElem.width + 22.5 &&
		platformElem.y < player.y && player.y < platformElem.y + platformElem.height) {
			currentPlatform = platformIndex;
		}
	};

	platforms.forEach(platformCheck);

	if (currentPlatform > -1){
		player.jump = false;
		player.y = platforms[currentPlatform].y;    
	}

	let currentDodger = -1;

	const dodgerCheck = (dodgerElem, dodgerIndex) => {
		if(  player.x > dodgerElem.x && player.x < dodgerElem.x + 35 &&
		player.y > dodgerElem.y && player.y < dodgerElem.y + 30) {
			currentDodger = dodgerIndex;
		}
	}

	dodgers.forEach(dodgerCheck);

	if (currentDodger > -1) {
		setPlayerDefault();
	};

	const fallCheck = () => {
		if (player.y > canvasParams.height + 20 || player.x < canvasParams.origin_x || (player.x > canvasParams.width + 20 && player.y < goalParams.top - 30) || (player.x >canvasParams.width + 20 && player.y > goalParams.bottom + 30)) { // TODO: Need to add a clause for falls off the right of the screen and not within the goal markers.
			setPlayerDefault();
		}
	};



	const fireworksController = fireworkElem => {
		fireworkElem.velocity_y += gravity;
		fireworkElem.y += fireworkElem.velocity_y;
		fireworkElem.x += fireworkElem.velocity_x;
		fireworkElem.color = fireworkColorGenerator()
	};

	fireworks.forEach(fireworksController);

	fallCheck();
	winCheck();
	renderCanvas();
	renderPlayer();
	renderPlatforms();
	renderDodgers();
	renderGoal(currentPlatformY);
	renderFireworks();
} 

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.canvas.height = canvasParams.height;
ctx.canvas.width = canvasParams.width;
createPlatforms();
document.addEventListener("keyup", keyUp);
document.addEventListener("keydown", keyDown);
retryButton.addEventListener("click", () => {
	setPlayerDefault();
	buttonTextFlash(retryButton);
});
newLevelButton.addEventListener("click", () => {
	generateNewLevel()
	buttonTextFlash(newLevelButton);
});

setInterval(gameLoop, 20);

/*
TODO:
1. Add visible controls to the game screen. Could be a simnplelist of controls with instructions (probably best).
2. Also state the goal. Jump between the green markers to win!
3. Media Queries. Make the game work on all device sizes. Will we need to add mobile controls? Yes. How? Work it out.
*/