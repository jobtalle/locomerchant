import {Wagon} from "./train/wagon.js";
import {Vector} from "../../math/vector.js";
import {Locomotive} from "./train/locomotive.js";
import {ItemCoal} from "./item/itemCoal.js";
import {ItemLog} from "./item/itemLog.js";
import {Sounds} from "../audio/sounds.js";
import {ItemTwig} from "./item/itemTwig.js";
import {SceneryForest} from "./scenery/sceneryForest.js";
import {Utils} from "../../math/utils.js";
import {PriceLabel} from "./priceLabel.js";
import {Seller} from "./seller.js";
import {Particles} from "./particles/particles.js";
import {Particle} from "./particles/particle.js";
import {Sprites} from "../sprite/sprites.js";
import {SceneryVillage} from "./scenery/sceneryVillage.js";
import {Music} from "../music.js";

export class Scene {
    static TRACKS_Y = 850;
    static DESTROY_UNDER = 200;
    static DESTROY_ABOVE = 1500;
    static DESTROY_LEFT = 1000;
    static PIXELS_PER_METER = 100;
    static MONEY_INITIAL = 50;
    static BIOME_SCALING = 1.1;

    constructor(mouse, width, height) {
        this.width = width;
        this.height = height;
        this.engine = Matter.Engine.create();
        this.wagonA = new Wagon(this.engine, new Vector(width - 1450, Scene.TRACKS_Y), 400, 150);
        this.wagonB = new Wagon(this.engine, new Vector(width - 980, Scene.TRACKS_Y), 400, 150);
        this.locomotive = new Locomotive(this.engine, new Vector(width - 200, Scene.TRACKS_Y), 700, 200);
        this.items = [];
        this.itemDragging = null;
        this.pulling = 0;
        this.sceneryLength = 300 * Scene.PIXELS_PER_METER;
        this.scenery = new SceneryVillage(width, height, this.sceneryLength);
        this.money = Scene.MONEY_INITIAL;
        this.distance = 0;
        this.itemsForSale = [];
        this.seller = null;
        this.particles = new Particles();
        this.tunnelX = -1;
        this.tunneling = false;
        this.music = new Music();

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

                Sounds.LEVER_GRAB.play();

                mouseConstraint.collisionFilter.mask = 0x04;
            }

            if (this.seller) {
                if (event.mouse.position.y > this.seller.body.position.y &&
                    Math.abs(event.mouse.position.x - this.seller.body.position.x) < 200)
                    this.seller.sell(this);
            }
        });
        Matter.Events.on(mouseConstraint, "mousemove", event => {
            switch (this.pulling) {
                case 1:
                    this.locomotive.pullLever(event.mouse.position);

                    break;
            }

            if (this.seller) {
                if (event.mouse.position.y > this.seller.body.position.y &&
                    Math.abs(event.mouse.position.x - this.seller.body.position.x) < 200) {
                    document.body.style.cursor = "pointer";
                }
                else
                    document.body.style.cursor = "auto";
            }
        });
        Matter.Events.on(mouseConstraint, "mouseup", () => {
            if (this.pulling) {
                mouseConstraint.collisionFilter.mask = 0x02;

                Sounds.LEVER_RELEASE.play();

                this.pulling = 0;
            }
        });
        Matter.Events.on(mouseConstraint, "startdrag", event => {
            event.body.collisionFilter.category = 0;

            Sounds.GRAB.play();

            this.itemDragging = this.findItem(event.body);

            if (this.itemDragging) {
                if (this.itemDragging.label) {
                    this.money -= this.itemDragging.label.price;
                    this.itemDragging.label = null;
                    Sounds.BUY.play();
                }
                if (this.itemsForSale.indexOf(this.itemDragging) !== -1)
                    this.itemsForSale.splice(this.itemsForSale.indexOf(this.itemDragging), 1);
                this.items.splice(this.items.indexOf(this.itemDragging), 1);

                this.seller?.removeItem(this.itemDragging);

                this.updateForSale();

                if (this.itemDragging.locomotive)
                    this.itemDragging.leaveFurnace();
            }
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

                if (this.seller) {
                    item = null;

                    if (pairs[pair].bodyA === this.seller.body)
                        item = this.findItem(pairs[pair].bodyB);
                    else if (pairs[pair].bodyB === this.seller.body)
                        item = this.findItem(pairs[pair].bodyA);

                    if (item)
                        this.seller.addItem(item);
                }
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

                if (this.seller) {
                    item = null;

                    if (pairs[pair].bodyA === this.seller.body)
                        item = this.findItem(pairs[pair].bodyB);
                    else if (pairs[pair].bodyB === this.seller.body)
                        item = this.findItem(pairs[pair].bodyA);

                    if (item)
                        this.seller.removeItem(item);
                }
            }
        });

        this.initialize();
    }

    updateForSale() {
        for (const item of this.itemsForSale) {
            if (item.label.price > this.money) {
                item.label.afford = false;
                item.body.isSleeping = true;
                item.body.collisionFilter.category = 4;
                item.label.repaint();
            }
            else {
                item.body.collisionFilter.category = 2;
                item.body.isSleeping = true;
                item.label.afford = true;
                item.label.repaint();
            }
        }
    }

    reset() {
        this.itemDragging?.destroy();

        for (const item of this.items)
            item.destroy();

        this.items = [];
        this.distance = 0;
        this.money = Scene.MONEY_INITIAL;

        this.locomotive.reset();
        this.seller?.destroy();
        this.seller = null;
        this.tunneling = 0;

        this.initialize();
    }

    initialize() {
        this.locomotive.initialize();

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


        for (let i = 0; i < initial; ++i) {
            if (i & 1)
                this.items.push(new ItemLog(
                    this.engine,
                    new Vector(
                        this.wagonA.body.position.x - 100 + 200 * i / (initial - 1),
                        this.wagonA.body.position.y - this.wagonB.height)));
            else
                this.items.push(new ItemTwig(
                    this.engine,
                    new Vector(
                        this.wagonA.body.position.x - 100 + 200 * i / (initial - 1),
                        this.wagonA.body.position.y - this.wagonB.height)));
        }

        this.scenery.initialize();
    }

    nextBiome() {
        this.scenery.destroy();

        this.sceneryLength *= Scene.BIOME_SCALING;

        this.scenery = new SceneryForest(this.width, this.height, this.sceneryLength);
        this.scenery.initialize();
    }

    move(delta) {
        const sm = this.scenery.moved;

        if (this.tunneling) {
            const txp = this.tunnelX;
            const t = 125;

            this.tunnelX -= delta * 2;

            if (txp > -t && this.tunnelX < -t)
                this.nextBiome();
        }

        if (this.scenery.move(delta)) {
            const sellWidth = 1700;
            const sellY = 950;
            const sellItems = [];

            for (const selling of this.scenery.catalogue.selling) {
                const count = Math.round(Utils.lerp(selling.min, selling.max, Math.random()));

                for (let i = 0; i < count; ++i)
                    sellItems.push(selling);
            }

            for (let i = 0; i < sellItems.length; ++i) {
                const x = 32 + this.width + sellWidth * (1 - i / (sellItems.length - 1));
                const c = sellItems[i].f;
                const item = new c(this.engine, new Vector(x, sellY + (i & 1) * 25));

                item.body.isSleeping = true;

                this.items.push(item);
                this.itemsForSale.push(item);

                item.label = new PriceLabel(sellItems[i].price, sellItems[i].price <= this.money);
            }
        }

        for (const item of this.itemsForSale) {
            const xp = item.body.position.x;

            Matter.Body.setPosition(item.body, new Vector(item.body.position.x - delta, item.body.position.y));
            item.body.positionPrev.x = xp;
        }

        this.seller?.move(delta);

        if (sm < this.scenery.pScale && this.scenery.moved > this.scenery.pScale) {
            this.seller = new Seller(this.engine, new Vector(this.width + 500, 970), this.scenery.catalogue.buying);
        }

        if (sm < this.scenery.length && this.scenery.moved > this.scenery.length) {
            this.tunneling = true;
            this.tunnelX = this.width;
        }

        if (this.seller && this.seller.body.position.x < -3000) {
            this.seller.destroy();
            this.seller = null;
        }
    }

    findItem(body) {
        for (const item of this.items)
            if (item.body === body)
                return item;

        return null;
    }

    update(delta) {
        this.music.setVelocity(this.locomotive.velocity);

        Matter.Engine.update(this.engine, delta);

        let acceleration = -this.locomotive.velocity;

        this.scenery.update();

        this.wagonA.update();
        this.wagonB.update();
        this.locomotive.update();
        this.seller?.update();

        acceleration += this.locomotive.velocity;

        const accelerationForce = new Vector(acceleration * -.006, 0);

        this.itemDragging?.update();

        for (let item = this.items.length; item-- > 0;) {
            if (this.items[item] === null) {
                this.items.splice(item, 1);

                continue;
            }
            if (this.items[item].update() ||
                this.items[item].body.position.y > this.height + Scene.DESTROY_UNDER ||
                this.items[item].body.position.y < -Scene.DESTROY_ABOVE ||
                this.items[item].body.position.x < -3000) {
                const saleIndex = this.itemsForSale.indexOf(this.items[item]);

                if (saleIndex !== -1)
                    this.itemsForSale.splice(saleIndex, 1);

                this.seller?.removeItem(this.items[item]);

                this.items[item].destroy();
                this.items.splice(item, 1);
            }
            else {
                Matter.Body.applyForce(this.items[item].body, this.items[item].body.position, accelerationForce);

                if (this.items[item].burning && Math.random() < .4)
                    this.particles.add(new Particle(
                        new Vector(
                            (Math.random() - .5) * this.items[item].width,
                            (Math.random() - .5) * this.items[item].height).rotate(-this.items[item].body.angle).add(
                                new Vector(
                                    this.items[item].body.position.x,
                                    this.items[item].body.position.y)),
                        new Vector((Math.random() * 2 - 1) * .1, Math.random() * -5),
                        16 * Math.random() + 8,
                        "#e7600d",
                        .4,
                        .05 + Math.random() * .05
                    ));
            }
        }

        this.wagonA.move(this.locomotive.velocity);
        this.wagonB.move(this.locomotive.velocity);
        this.locomotive.move(this.locomotive.velocity);
        this.locomotive.accelerate(acceleration);
        this.move(this.locomotive.velocity);

        this.particles.update();

        this.distance += this.locomotive.velocity;

        document.getElementById("distance").innerText = Math.round(this.distance / Scene.PIXELS_PER_METER) + "m";
        document.getElementById("money").innerText = "$" + this.money;
    }

    render(context, time) {
        this.scenery.renderBackground(context, time, this.width);

        this.wagonA.renderBackground(context, time);
        this.wagonB.renderBackground(context, time);
        this.locomotive.renderBackground(context, time);

        for (const item of this.items)
            item.render(context, time);

        this.particles.render(context, time);

        this.wagonA.render(context, time);
        this.wagonB.render(context, time);
        this.locomotive.render(context, time);

        this.seller?.render(context, time);

        this.scenery.renderForeground(context, time);

        this.itemDragging?.render(context, time);

        if (this.tunneling) {
            Sprites.TUNNEL.draw(context, this.tunnelX, 0);
        }
    }
}