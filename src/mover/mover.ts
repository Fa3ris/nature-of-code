import { Vector } from "p5";

const gravity = new Vector().set(0, 10);

const GRAVITATION_CST = 10;

export class Mover {
  private _position: Vector;
  private _velocity: Vector;
  private _acceleration: Vector;
  private _m: number;
  private _weight: Vector;

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

  constructor(m: number, p0: Vector, v0: Vector) {
    this._m = m;
    this._position = p0;
    this._velocity = v0;
    this._acceleration = new Vector().set(0, 0, 0);
    this._weight = Vector.mult(gravity, m);
  }

  applyForce(force: Vector) {
    this._acceleration.add(force);
  }

  applyWeight() {
    this.applyForce(this._weight);
  }

  applyFriction(frictionCoeff: number) {
    this.applyForce(this.velocity.normalize().mult(-frictionCoeff));
  }

  applyDrag(dragCoeff: number) {
    const dragForce = this.velocity;
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

  update(elapsed: number) {
    this._acceleration.mult(elapsed / this._m);
    this._velocity.add(this._acceleration);
    this._position.add(Vector.mult(this._velocity, elapsed));
    this._acceleration.mult(0);
  }
}
