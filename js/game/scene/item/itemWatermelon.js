import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemWatermelon extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.WATERMELON, 106, 94, 0, 0, "circle");
    }
}