import {Scene} from "../scene.js";
import {Layer} from "./layer/layer.js";
import {Sprites} from "../../sprite/sprites.js";

export class Scenery {
    static INITIALIZE_DELTA = 50;

    constructor(width, height, length, background, spawners, catalogue, ambient = null) {
        this.width = width;
        this.height = height;
        this.length = length;
        this.spawners = spawners;
        this.catalogue = catalogue;
        this.background = background;
        this.layersBack = [];
        this.layersFront = [];
        this.moved = 0;
        this.pStation = this.length * .5;
        this.pItemsForSale = this.pStation + 300;
        this.pScale = this.pStation + 2000;
        this.pSign100 = this.pStation - 100 * Scene.PIXELS_PER_METER;
        this.pSign200 = this.pStation - 200 * Scene.PIXELS_PER_METER;
        this.pSign500 = this.pStation - 500 * Scene.PIXELS_PER_METER;
        this.stationWidth = 3000;
        this.stationClearance = 300;
        this.ambient = ambient;
    }

    initialize() {
        const moves = 1000;

        for (let move = 0; move < moves; ++move)
            this.move(Scenery.INITIALIZE_DELTA);

        this.moved = 0;

        this.ambient?.setVolume(1);
        this.ambient?.play();
    }

    move(delta) {
        const previous = this.moved;

        this.moved += delta;

        for (const layer of this.layersBack)
            layer.move(delta);

        for (const layer of this.layersFront)
            layer.move(delta);

        const newLayers = [];

        for (const spawner of this.spawners)
            newLayers.push(...spawner.move(delta, this.width, this.height));

        if (previous < this.pSign500 && this.moved > this.pSign500)
            newLayers.push(new Layer(this.width, this.height - 724, 284, 724,
                Sprites.STATION_SIGN_500, -.2));

        if (previous < this.pSign200 && this.moved > this.pSign200)
            newLayers.push(new Layer(this.width, this.height - 724, 284, 724,
                Sprites.STATION_SIGN_200, -.2));

        if (previous < this.pSign100 && this.moved > this.pSign100)
            newLayers.push(new Layer(this.width, this.height - 724, 284, 724,
                Sprites.STATION_SIGN_100, -.2));

        const exceptions = [];

        if (previous < this.pStation && this.moved > this.pStation) {
            newLayers.push(new Layer(this.width, 0, 1326, 1080, Sprites.STATION_HOUSE, .88));

            for (let i = 0; i < 4; ++i) {
                const d = .96;

                newLayers.push(new Layer(this.width + 756 * i * d, this.height - 1057, 756, 1057, Sprites.STATION_BEAM, d));
            }

            const foreground = new Layer(this.width + 500, this.height - 298, 2378, 298, Sprites.STATION_FOREGROUND, -.1);

            exceptions.push(foreground);
            newLayers.push(foreground);
        }

        if (newLayers.length > 0) {
            for (const layer of newLayers) {
                if (layer.depth >= 0)
                    this.layersBack.push(layer);
                else if (exceptions.indexOf(layer) !== -1 || this.moved < this.pStation - this.stationClearance || this.moved > this.pStation + this.stationWidth)
                    this.layersFront.push(layer);
            }

            this.layersBack.sort((a, b) => a.depth - b.depth);
            this.layersFront.sort((a, b) => b.depth - a.depth);
        }

        return previous < this.pItemsForSale && this.moved > this.pItemsForSale;
    }

    update() {
        for (let layer = this.layersBack.length; layer-- > 0;) {
            if (this.layersBack[layer].x + this.layersBack[layer].width < -Scene.DESTROY_LEFT)
                this.layersBack.splice(layer, 1);
            else
                this.layersBack[layer].update();
        }

        for (let layer = this.layersFront.length; layer-- > 0;) {
            if (this.layersFront[layer].x + this.layersFront[layer].width < -Scene.DESTROY_LEFT)
                this.layersFront.splice(layer, 1);
            else
                this.layersFront[layer].update();
        }
    }

    renderBackground(context, time, width) {
        this.background.draw(context, width - 1920, 0);
        this.background.draw(context, width - (1920 << 1), 0);

        for (let layer = 0, layerCount = this.layersBack.length; layer < layerCount; ++layer)
            this.layersBack[layer].render(context, time);
    }

    renderForeground(context, time) {
        for (let layer = 0, layerCount = this.layersFront.length; layer < layerCount; ++layer)
            this.layersFront[layer].render(context, time);
    }

    destroy() {
        this.ambient?.stop();
    }
}