import {Wagon} from "./train/wagon.js";
import {Vector} from "../../math/vector.js";
import {Item} from "./item/item.js";
import {Locomotive} from "./train/locomotive.js";

export class Scene {
    static TAIL = 3000;
    static TRACKS_Y = 850;
    static DESTROY_UNDER = 200;
    static DESTROY_ABOVE = 1500;

    constructor(mouse, width, height) {
        this.width = width;
        this.height = height;
        this.engine = Matter.Engine.create();
        this.wagonA = new Wagon(this.engine, new Vector(width - 1400, Scene.TRACKS_Y), 400, 150);
        this.wagonB = new Wagon(this.engine, new Vector(width - 900, Scene.TRACKS_Y), 400, 150);
        this.locomotive = new Locomotive(this.engine, new Vector(width - 200, Scene.TRACKS_Y), 600, 200);
        this.items = [];

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
        Matter.Events.on(mouseConstraint, "startdrag", event => {
            event.body.collisionFilter.category = 0;
        });
        Matter.Events.on(mouseConstraint, "enddrag", event => {
            event.body.collisionFilter.category = 2;
        });

        for (let i = 0; i < 100; ++i)
            this.items.push(new Item(
                this.engine,
                new Vector(width * Math.random(), height * Math.random()),
                10 + Math.random() * 60,
                10 + Math.random() * 60));

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

    update(delta) {
        Matter.Engine.update(this.engine, delta);

        // console.log(this.engine.world.bodies.length);

        this.wagonA.update();
        this.wagonB.update();
        this.locomotive.update();

        for (let item = this.items.length; item-- > 0;) {
            this.items[item].update();

            if (this.items[item].body.position.y > this.height + Scene.DESTROY_UNDER ||
                this.items[item].body.position.y < -Scene.DESTROY_ABOVE) {
                this.items[item].destroy();
                this.items.splice(item, 1);
            }
        }
    }

    render(context, time) {
        context.fillStyle = "rgb(181,190,201)";
        context.fillRect(0, 0, this.width, this.height);

        this.wagonA.render(context, time);
        this.wagonB.render(context, time);
        this.locomotive.render(context, time);

        for (const item of this.items)
            item.render(context, time);

        context.strokeStyle = "#8d7272";
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(this.width, Scene.TRACKS_Y);
        context.lineTo(this.width - Scene.TAIL, Scene.TRACKS_Y);
        context.stroke();
    }
}