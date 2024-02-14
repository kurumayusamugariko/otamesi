const audio = {
	Map: new Howl({
		src: "./public/metamon/audio/metametamonmon.m4a",
		html5: true,
		volume: 0.5,
		loop: true,
	}),
	initBattle: new Howl({
		src: "./public/metamon/audio/initBattle.wav",
		html5: true,
		volume: 0.1
	}),
	Battle: new Howl({
		src: "./public/metamon/audio/battle.mp3",
		html5: true,
		volume: 0.1,
		loop: true,
	}),
	tackleHit: new Howl({
		src: "./public/metamon/audio/tackleHit.wav",
		html5: true,
		volume: 0.1	
	}),
	fireballHit: new Howl({
		src: "./public/metamon/audio/fireballHit.wav",
		html5: true,
		volume: 0.1	
	}),
	initFireball: new Howl({
		src: "./public/metamon/audio/initFireball.wav",
		html5: true,
		volume: 0.1	
	}),
	victory: new Howl({
		src: "./public/metamon/audio/victory.wav",
		html5: true,
		volume: 0.3
	}),
};