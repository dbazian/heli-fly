console.log('Loaded game.js');

const Game = function ({
	width,
	height,
	background,
	heliSprite,
	obstacleSprite,
	gameover,
	crashHeight,
}) {
	this.state = {
		stage: 'live',
	};
	this.background = new RepetitiveSprite({
		sprite: background,
		initY: height - background.height,
		velocity: -1,
	});
	this.heli = new Heli({
		sprite: heliSprite,
		initHeight: 0,
		gravity: 0.1,
	});
	this.update = () => {
		this.background.update();
		if (this.heli.height < crashHeight) this.heli.update();
		else {
			this.state.stage = 'game-over';
			this.background.velocity = 0;
		}
	};
	this.render = () => {
		this.background.render();
		if (this.state.stage == 'game-over') {
			push();
			imageMode(CENTER);
			image(gameover, width / 2, height / 2);
			pop();
			textSize(32);
			text('Reload to reset game.', height / 2, width / 2);
		} else {
			this.heli.render();
		}
	};
};
