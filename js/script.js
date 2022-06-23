const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

ctx.translate(
    canvas.width / 2 - canvas.width / 2,
    canvas.height / 2 - canvas.height / 2
);

// a + bi
class Complex {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    add(c) {
        return new Complex(this.a + c.a, this.b + c.b);
    }
    sub(c) {
        return new Complex(this.a - c.a, this.b - c.b);
    }
    mul(c) {
        return new Complex(
            this.a * c.a - this.b * c.b,
            this.a * c.b + this.b * c.a
        );
    }
    div(c) {
        return new Complex(
            (this.a * c.a + this.b * c.b) / (c.a * c.a + c.b * c.b),
            (this.b * c.a - this.a * c.b) / (c.a * c.a + c.b * c.b)
        );
    }
    mag() {
        return Math.sqrt(this.a * this.a + this.b * this.b);
    }

    //now is not more mandelbrot set it is julia set
    belongsToMandelbrotSet() {
        let z = new Complex(this.a, this.b);
        for (let i = 0; i < 60; i++) {
            // z = z(n)^2 + c -> this is c
            z = z.mul(z).add(new Complex(-0.70176, -0.3842)); //this is the current complex number
            if (z.mag() > 2) {
                return false;
            }
        }
        return true;
    }
}

// -0.70176 - 0.3842 i
const draw = () => {
    for (let i = 0; i < canvas.width; i++) {
        for (let j = 0; j < canvas.height; j++) {
            const c = new Complex(
                (i / canvas.width) * 4 - 2,
                (j / canvas.height) * 4 - 2
            );
            if (c.belongsToMandelbrotSet()) {
                ctx.fillStyle = "#fff";
                ctx.fillRect(i, j, 1, 1);
            }
        }
    }
};

const animate = () => {
    draw();
    requestAnimationFrame(animate);
};

draw();
