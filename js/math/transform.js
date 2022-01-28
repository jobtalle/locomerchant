export class Transform {
    constructor(translate, scale) {
        this.translate = translate;
        this.scale = scale;
    }

    apply(context) {
        context.translate(this.translate.x, this.translate.y);
        context.scale(this.scale.x, this.scale.y);
    }
}