import {Wagon} from "./train/wagon.js";
import {Vector} from "../../math/vector.js";
import {Item} from "./item/item.js";
import {Locomotive} from "./train/locomotive.js";
import {Scenery} from "./scenery/scenery.js";
import {Sprites} from "../sprite/sprites.js";
import {ItemCoal} from "./item/itemCoal.js";
import {ItemLog} from "./item/itemLog.js";

export class Scene {
    static TAIL = 3000;
    static TRACKS_Y = 850;
    static DESTROY_UNDER = 200;
    static DESTROY_ABOVE = 1500;
    static DESTROY_LEFT = 2000;

    constructor(mouse, width, height) {
        this.width = width;
        this.height = height;
        this.engine = Matter.Engine.create();
        this.wagonA = new Wagon(this.engine, new Vector(width - 1400, Scene.TRACKS_Y), 400, 150);
        this.wagonB = new Wagon(this.engine, new Vector(width - 900, Scene.TRACKS_Y), 400, 150);
        this.locomotive = new Locomotive(this.engine, new Vector(width - 200, Scene.TRACKS_Y), 600, 200);
        this.items = [];
        this.itemDragging = null;
        this.pulling = 0;
        this.scenery = new Scenery(width, height);

        const mouseConstraint = Matter.MouseConstraint.create(this.engine, {
            mouse: mouse,
            collisionFilter: {
                mask: 0x02
            },
            constraint: {
                stiffness: .2
            }
        });

        Matter.Composite.add(this.engine.world, [mouseConstraint]);
        Matter.Events.on(mouseConstraint, "mousedown", event => {
            if (Matter.Query.point([this.locomotive.cabin], event.mouse.position).length) {
                this.pulling = 1;

                mouseConstraint.collisionFilter.mask = 0x04;
            }
        });
        Matter.Events.on(mouseConstraint, "mousemove", event => {
            switch (this.pulling) {
                case 1:
                    this.locomotive.pullLever(event.mouse.position);

                    break;
            }
        });
        Matter.Events.on(mouseConstraint, "mouseup", () => {
            if (this.pulling) {
                mouseConstraint.collisionFilter.mask = 0x02;

                this.pulling = 0;
            }
        });
        Matter.Events.on(mouseConstraint, "startdrag", event => {
            event.body.collisionFilter.category = 0;

            this.itemDragging = this.findItem(event.body);
            this.items.splice(this.items.indexOf(this.itemDragging), 1);

            if (this.itemDragging.locomotive)
                this.itemDragging.leaveFurnace();
        });
        Matter.Events.on(mouseConstraint, "enddrag", event => {
            event.body.collisionFilter.category = 2;

            this.items.push(this.itemDragging);
            this.itemDragging = null;
        });
        Matter.Events.on(this.engine, "collisionStart", event => {
            const pairs = event.pairs;

            for (let pair = 0, pairCount = pairs.length; pair < pairCount; ++pair) {
                let item = null;

                if (pairs[pair].bodyA === this.locomotive.furnace)
                    item = this.findItem(pairs[pair].bodyB);
                else if (pairs[pair].bodyB === this.locomotive.furnace)
                    item = this.findItem(pairs[pair].bodyA);

                item?.enterFurnace(this.locomotive);
            }
        });
        Matter.Events.on(this.engine, "collisionEnd", event => {
            const pairs = event.pairs;

            for (let pair = 0, pairCount = pairs.length; pair < pairCount; ++pair) {
                let item = null;

                if (pairs[pair].bodyA === this.locomotive.furnace)
                    item = this.findItem(pairs[pair].bodyB);
                else if (pairs[pair].bodyB === this.locomotive.furnace)
                    item = this.findItem(pairs[pair].bodyA);

                item?.leaveFurnace();
            }
        });

        this.initialize();

        // this.engineRenderer = Matter.Render.create({
        //     element: document.getElementById("gui"),
        //     engine: this.engine,
        //     options: {
        //         width: width,
        //         height: height
        //     }
        // });
        //
        // Matter.Render.run(this.engineRenderer);
    }

    reset() {
        this.itemDragging?.destroy();

        for (const item of this.items)
            item.destroy();

        this.items = [];

        this.locomotive.reset();

        this.initialize();
    }

    initialize() {
        for (let i = 0; i < 3; ++i) {
            const item = new ItemCoal(
                this.engine,
                new Vector(
                    this.locomotive.body.position.x - 30 + 60 * Math.random(),
                    this.locomotive.body.position.y - i * 30));

            item.burning = true;

            this.items.push(item);
        }

        const initial = 4;

        for (let i = 0; i < initial; ++i)
            this.items.push(new ItemCoal(
                this.engine,
                new Vector(
                    this.wagonB.body.position.x - 100 + 200 * i / (initial - 1),
                    this.wagonB.body.position.y - this.wagonB.height)));


        for (let i = 0; i < initial; ++i)
            this.items.push(new ItemLog(
                this.engine,
                new Vector(
                    this.wagonA.body.position.x - 100 + 200 * i / (initial - 1),
                    this.wagonA.body.position.y - this.wagonB.height)));

        this.scenery.initialize();
    }

    move(delta) {
        this.scenery.move(delta);
    }

    findItem(body) {
        for (const item of this.items)
            if (item.body === body)
                return item;

        return null;
    }

    update(delta) {
        Matter.Engine.update(this.engine, delta);

        let acceleration = -this.locomotive.velocity;

        this.scenery.update();

        this.wagonA.update();
        this.wagonB.update();
        this.locomotive.update();

        acceleration += this.locomotive.velocity;

        const accelerationForce = new Vector(acceleration * -.004, 0);

        this.itemDragging?.update();

        for (let item = this.items.length; item-- > 0;) {
            if (this.items[item].update() ||
                this.items[item].body.position.y > this.height + Scene.DESTROY_UNDER ||
                this.items[item].body.position.y < -Scene.DESTROY_ABOVE) {
                this.items[item].destroy();
                this.items.splice(item, 1);
            }
            else
                Matter.Body.applyForce(this.items[item].body, this.items[item].body.position, accelerationForce);
        }

        this.wagonA.move(this.locomotive.velocity);
        this.wagonB.move(this.locomotive.velocity);
        this.locomotive.move(this.locomotive.velocity);
        this.locomotive.accelerate(acceleration);
        this.move(this.locomotive.velocity);
    }

    render(context, time) {
        context.fillStyle = "rgb(181,190,201)";
        context.fillRect(0, 0, this.width, this.height);

        this.scenery.renderBackground(context, time);

        for (const item of this.items)
            item.render(context, time);

        this.wagonA.render(context, time);
        this.wagonB.render(context, time);
        this.locomotive.render(context, time);

        context.fillStyle = "#8d7272";
        context.lineWidth = 4;
        context.beginPath();
        context.rect(this.width - Scene.TAIL, Scene.TRACKS_Y, Scene.TAIL + this.width, this.height);
        context.fill();

        this.itemDragging?.render(context, time);

        this.scenery.renderForeground(context, time);
    }
}