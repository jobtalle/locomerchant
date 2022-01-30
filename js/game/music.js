import {Sounds} from "./audio/sounds.js";

export class Music {
    constructor() {
        Sounds.MUSIC_0.play();
        Sounds.MUSIC_1.play();
        Sounds.MUSIC_2.play();
    }

    setVelocity(velocity) {
        Sounds.MUSIC_0.setVolume(Math.min(1, velocity / 20));
        Sounds.MUSIC_1.setVolume(Math.sqrt(Math.max(0, Math.min(1, (velocity - 30) / 30))));
        Sounds.MUSIC_2.setVolume(Math.sqrt(Math.max(0, Math.min(1, (velocity - 50) / 30))));
    }
}