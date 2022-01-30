import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemBall extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.BALL, 92, 93, 0, 0, "circle");
    }
}