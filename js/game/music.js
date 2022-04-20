import {Loop} from "./audio/loop.js";

export class Music {
    constructor() {
        this.track0 = new Loop("audio/MX_Base_LP.mp3");
        this.track1 = new Loop("audio/MX_Cruising_LP.mp3");
        this.track2 = new Loop("audio/MX_Speeding_LP.mp3");
        this.driving = false;

        this.mute = 1;

        window.addEventListener("keydown", event => {
            if (event.key === "m")
                this.mute = 1 - this.mute;
        })
    }

    setVelocity(velocity) {
        if (velocity !== 0 && !this.driving) {
            this.driving = true;

            this.track0.play();
            this.track1.play();
            this.track2.play();
        }

        if (velocity === 0 && this.driving) {
            this.driving = false;

            this.track0.stop();
            this.track1.stop();
            this.track2.stop();
        }

        if (this.track0) {
            this.track0.setVolume(this.mute * Math.min(1, velocity / 20));
            this.track1.setVolume(this.mute * Math.sqrt(Math.max(0, Math.min(1, (velocity - 30) / 30))));
            this.track2.setVolume(this.mute * Math.sqrt(Math.max(0, Math.min(1, (velocity - 50) / 30))));
        }
    }
}