import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemPumpkin extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.PUMPKIN, 99, 87, 0, 0, "circle");
    }
}