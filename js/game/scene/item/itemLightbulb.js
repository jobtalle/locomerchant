import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemLightbulb extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.LIGHTBULB, 85, 93, 0, 0, "circle");
    }
}