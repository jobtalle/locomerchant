import {Sounds} from "./audio/sounds.js";

export class Music {
    constructor() {
        Sounds.MUSIC_0.play();
        Sounds.MUSIC_1.play();
        Sounds.MUSIC_2.play();

        this.mute = 1;

        window.addEventListener("keydown", event => {
            if (event.key === "m") {
                this.mute = 1 - this.mute;
            }
        })
    }

    setVelocity(velocity) {
        Sounds.MUSIC_0.setVolume(this.mute * Math.min(1, velocity / 20));
        Sounds.MUSIC_1.setVolume(this.mute * Math.sqrt(Math.max(0, Math.min(1, (velocity - 30) / 30))));
        Sounds.MUSIC_2.setVolume(this.mute * Math.sqrt(Math.max(0, Math.min(1, (velocity - 50) / 30))));
    }
}