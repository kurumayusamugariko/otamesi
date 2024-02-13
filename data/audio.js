const audio = {
	Map: new Howl({
		src: "./public/metamon/audio/metametamonmon.m4a",
		html5: true,
		volume: 0.5
	}),
	initBattle: new Howl({
		src: "./public/metamon/audio/initBattle.wav",
		html5: true,
		volume: 0.1
	}),
	Battle: new Howl({
		src: "./public/metamon/audio/battle.mp3",
		html5: true,
		volume: 0.1	
	}),
};