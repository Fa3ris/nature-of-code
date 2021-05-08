import { Vector } from "p5";

const gravity = new Vector().set(0, 10);

const GRAVITATION_CST = 10;

export class Mover {
  private _position: Vector;
  private _velocity: Vector;
  private _acceleration: Vector;
  private _m: number;
  private _weight: Vector;

  get position() {
    return this._position;
  }

  set position(pos: Vector) {
    this._position = pos;
  }

  get velocity() {
    return this._velocity;
  }

  set velocity(newVel: Vector) {
    this._velocity = newVel;
  }

  get heading(): number {
    return this._velocity.heading();
  }

  get mass() {
    return this._m;
  }

  constructor(m?: number, p0?: Vector, v0?: Vector) {
    this._m = m || 10;
    this._position = p0 || new Vector();
    this._velocity = v0 || new Vector();
    this._acceleration = new Vector();
    this._weight = Vector.mult(gravity, this._m);
  }

  applyForce(force: Vector) {
    this._acceleration.add(force);
  }

  applyWeight() {
    this.applyForce(this._weight);
  }

  applyFriction(frictionCoeff: number) {
    this.applyForce(this._velocity.copy().normalize().mult(-frictionCoeff));
  }

  applyDrag(dragCoeff: number) {
    const dragForce = this._velocity.copy();
    const vSquared = dragForce.magSq();
    dragForce.normalize().mult(-dragCoeff * vSquared);
    this.applyForce(dragForce);
  }

  applyGravitation(other: Mover) {
    const attractionForce = Vector.sub(other._position, this._position);
    const magnitude =
      (GRAVITATION_CST * other._m * this._m) / attractionForce.magSq();
    attractionForce.normalize().mult(magnitude);
    this.applyForce(attractionForce);
  }

  applySpringForce(k: number, anchor: Vector, restLength: number) {
    const force = Vector.sub(this._position, anchor);
    const displacement = force.mag() - restLength;
    force.normalize().mult(-k * displacement);
    this.applyForce(force);
  }

  update(elapsed: number = .1) {
    this._acceleration.mult(elapsed / this._m);
    this._velocity.add(this._acceleration);
    this._position.add(Vector.mult(this._velocity, elapsed));
    this._acceleration.mult(0);
  }

  projectFutureLocation(elapsed: number = .1): Vector {
    return Vector.add(this._position, Vector.mult(this._velocity, elapsed))
  }
}
