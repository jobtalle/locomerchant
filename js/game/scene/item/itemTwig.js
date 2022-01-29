import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemTwig extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.TWIG, 63, 93, 10, 1, "rectangle");
    }
}