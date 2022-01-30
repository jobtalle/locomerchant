export class PriceLabel {
    static WIDTH = 90;
    static HEIGHT = 40;

    constructor(price) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = PriceLabel.WIDTH;
        this.canvas.height = PriceLabel.HEIGHT;
        this.angle = Math.random() * Math.PI * -.35;

        const context = this.canvas.getContext("2d");

        context.fillStyle = "#c9a990";
        context.beginPath();
        context.moveTo(0, PriceLabel.HEIGHT * .5);
        context.lineTo(PriceLabel.HEIGHT * .5, 0);
        context.lineTo(PriceLabel.WIDTH, 0);
        context.lineTo(PriceLabel.WIDTH, PriceLabel.HEIGHT);
        context.lineTo(PriceLabel.HEIGHT * .5, PriceLabel.HEIGHT);
        context.closePath();
        context.fill();

        context.fillStyle = "black";
        context.font = "40px pica";
        context.fillText("$" + price, PriceLabel.HEIGHT * .5, PriceLabel.HEIGHT * .5 + 10);
    }

    draw(context, x, y) {
        context.save();
        context.rotate(this.angle);
        context.drawImage(this.canvas, x, y - PriceLabel.HEIGHT * .5);
        context.restore();
    }
}