export class Loop {
    constructor(source) {
        this.howl = new Howl({
            src: [source],
            html5: true,
            loop: true,
            volume: 0
        });
    }

    play() {
        this.howl.play();
    }

    stop() {
        this.howl.stop();
    }

    setVolume(volume) {
        this.howl.volume(volume);
    }
}