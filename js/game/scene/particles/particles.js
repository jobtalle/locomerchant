export class Particles {
    constructor() {
        this.particles = [];
    }

    add(particle) {
        this.particles.push(particle);
    }

    update() {
        for (let particle = this.particles.length; particle-- > 0;)
            if (this.particles[particle].update())
                this.particles.splice(particle, 1);
    }

    render(context, time) {
        for (let particle = 0, particleCount = this.particles.length; particle < particleCount; ++particle)
            this.particles[particle].render(context, time);

        context.globalAlpha = 1;
    }
}