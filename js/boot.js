import {Game} from "./game/game.js";

export function boot(canvas, gui, fps) {
    const mouse = Matter.Mouse.create(gui);
    const game = new Game(mouse);
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    (window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        game.resize(canvas.width, canvas.height);
    })();

    window.addEventListener("keydown", event => {
        if (event.key === " ")
            game.reset();
    });

    const updateRate = 1 / fps;
    let lastTime = performance.now();
    let updateTime = 0;

    const loop = time => {
        game.render(context, updateTime / updateRate);

        updateTime += Math.min(.1, .001 * Math.max(0, time - lastTime));

        while (updateTime > updateRate) {
            game.update(1000 * updateRate);

            updateTime -= updateRate;
        }

        lastTime = time;

        requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
}