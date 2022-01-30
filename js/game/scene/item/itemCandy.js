import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemCandy extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.CANDY, 92, 88, 0, 0, "circle");
    }
}