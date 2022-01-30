import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemCandyStick extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.CANDYSTICK, 288, 26, 0, 0, "rectangle");
    }
}