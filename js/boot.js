import {Game} from "./game.js";

export function boot(canvas, gui, fps) {
    const game = new Game();

    canvas.width = gui.clientWidth;
    canvas.height = gui.clientHeight;

    window.onresize = () => {
        canvas.width = gui.clientWidth;
        canvas.height = gui.clientHeight;

        game.resize(canvas.width, canvas.height);
    };

    const updateRate = 1 / fps;
    let lastTime = performance.now();
    let updateTime = 0;

    const loop = time => {
        game.render(updateTime / updateRate);

        updateTime += Math.min(.1, .001 * Math.max(0, time - lastTime));

        while (updateTime > updateRate) {
            game.update();

            updateTime -= updateRate;
        }

        lastTime = time;

        requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
}