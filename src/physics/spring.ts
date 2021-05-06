import p5, { Vector } from "p5";

export const spring = (p5: p5) => {
  const width = 711;
  const height = 400;

  let previous: number;
  let elapsed: number;
  let time: number;

  const mass = 10;

  const bob = new Vector().set(width / 2, 0);

  const k = 10;

  const restLength = height / 2;

  const spring: Spring = new Spring(
    mass,
    new Vector().set(width / 2, height / 2)
  );

  let drag: boolean = false;

  const maxTimeFrame = 0.02;

  p5.setup = () => {
    const renderer = p5.createCanvas(width, height);

    renderer.class("foreground");

    p5.stroke(255);
    previous = performance.now();
  };

  p5.draw = () => {
    p5.background(0);

    time = performance.now();

    elapsed = (time - previous) / 1000; // in seconds

    if (elapsed > maxTimeFrame) {
      elapsed = maxTimeFrame;
    }

    if (!drag) {
      spring.applySpringForce(k, bob, restLength);
      spring.update(elapsed);
    }

    p5.line(width / 2, 0, spring.position.x, spring.position.y);

    p5.circle(spring.position.x, spring.position.y, 10);
  };

  
  p5.mouseDragged = (evt: Event) => {
    drag = true;
    spring.position = new Vector().set(p5.mouseX, p5.mouseY);
  };

  p5.mouseReleased = () => {
    drag = false;
  };
};

class Spring {
  private _position: Vector;
  private _velocity: Vector;
  private _acceleration: Vector;
  private _m: number;

  /**
   * copy of position
   */
  get position() {
    return this._position.copy();
  }

  set position(pos: Vector) {
    this._position = pos;
  }

  /**
   * copy of velocity
   */
  get velocity() {
    return this._velocity.copy();
  }

  get mass() {
    return this._m;
  }

  constructor(m: number, p0: Vector) {
    this._m = m;
    this._position = p0;
    this._velocity = new Vector();
    this._acceleration = new Vector();
  }

  applyForce(force: Vector) {
    this._acceleration.add(force);
  }

  applySpringForce(k: number, anchor: Vector, restLength: number) {
    const force = Vector.sub(this._position, anchor);
    const length = force.mag();
    const displacement = length - restLength;
    force.normalize().mult(-k * displacement);
    this.applyForce(force);
  }

  update(elapsed: number) {
    this._acceleration.mult(elapsed / this._m);
    this._velocity.add(this._acceleration);
    this._position.add(Vector.mult(this._velocity, elapsed));
    this._acceleration.mult(0);
  }
}
