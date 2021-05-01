import p5, { Vector } from "p5";

export const physicsSketch = (p5: p5) => {
  class Mover {
    private _position: Vector;
    private _velocity: Vector;
    private _acceleration: Vector;
    private _m: number;

    get position() {
      return this._position;
    }

    set position(pos: Vector) {
      this._position = pos;
    }

    get velocity() {
      return this._velocity;
    }

    get mass() {
      return this._m
    }

    constructor(m: number, p0: Vector, v0: Vector) {
      this._m = m;
      this._position = p0;
      this._velocity = v0;
      this._acceleration = p5.createVector(0, 0);
    }

    applyForce(force: Vector) {
      this._acceleration.add(force);
    }

    update(elapsed: number) {
      this._acceleration.mult(elapsed / this._m);
      this._velocity.add(this._acceleration);
      this._position.add(Vector.mult(this._velocity, elapsed));
      this._acceleration.mult(0);
    }
  }

  const width = 800;
  const height = 600;

  let faller: Mover;
  let slider: Mover;

  let previous: number;
  let elapsed: number;
  let time: number;

  const gravity = p5.createVector(0, 10);
  const mass = 200;
  const weight = gravity.mult(mass);

  const frictionCoeff = -1000;

  p5.setup = () => {
    p5.createCanvas(width, height);
    const p0 = p5.createVector(10, 0);
    const v0 = p5.createVector(70, 0);
    faller = new Mover(mass, p0, v0);

    const p1 = p5.createVector(10, height / 2);
    const v1 = p5.createVector(70, 0);
    slider = new Mover(mass, p1, v1);

    p5.fill("red");
    p5.noStroke();
    previous = performance.now();
  };

  p5.draw = () => {
    p5.clear();

    time = performance.now();

    elapsed = (time - previous) / 1000; // in seconds

    faller.applyForce(weight);

    faller.update(elapsed);

    const friction = slider.velocity.copy();
    friction.normalize().mult(frictionCoeff);
    slider.applyForce(friction);
    slider.update(elapsed)

    p5.circle(faller.position.x, faller.position.y, 30);
    p5.circle(slider.position.x, slider.position.y, 30);

    if (
      faller.position.x > width ||
      faller.position.x < 0 ||
      faller.position.y < 0 ||
      faller.position.y > height
    ) {
      console.log("no draw");
      p5.noLoop();
    } else {

      previous = time;
    }

  };
};
