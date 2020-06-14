const player = {
	x: 200,
	y: 200,
	x_v: 0,
	y_v: 0,
	jump: true,
	height: 20,
	width: 20
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

const renderAll = () => {
	renderCanvas();
	renderPlayer();
	renderPlatforms();
} 

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.canvas.height = 270;
ctx.canvas.width = 270;
createPlatforms();
renderAll();