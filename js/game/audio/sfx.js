export class SFX {
    constructor(sources) {
        this.howls = [];

        for (const source of sources)
            this.howls.push(new Howl({src: source}));
    }

    play() {
        this.howls[Math.floor(Math.random() * this.howls.length)].play();
    }
}