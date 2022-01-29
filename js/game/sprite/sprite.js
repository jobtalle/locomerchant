export class Sprite {
    constructor(source) {
        this.image = new Image();
        this.loaded = false;

        this.load(source);
    }

    load(source) {
        const xmlHTTP = new XMLHttpRequest();

        xmlHTTP.open('GET', source,true);
        xmlHTTP.responseType = 'arraybuffer';
        xmlHTTP.onload = () => {
            const blob = new Blob([xmlHTTP.response]);

            this.image.src = window.URL.createObjectURL(blob);
        };
        xmlHTTP.onprogress = e => {
            this.loaded = e.loaded === e.total;
        };

        xmlHTTP.send();
    }

    draw(context, x, y) {
        if (this.loaded)
            context.drawImage(this.image, x, y);
    }
}