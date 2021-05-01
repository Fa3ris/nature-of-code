import { Vector } from "p5";



export class Mover {
    private _position: Vector;
    private _velocity: Vector;
    private _acceleration: Vector;
    private _m: number;

    get position() {
      return this._position.copy();
    }

    set position(pos: Vector) {
      this._position = pos;
    }

    get velocity() {
      return this._velocity.copy();
    }

    get mass() {
      return this._m
    }

    constructor(m: number, p0: Vector, v0: Vector) {
      this._m = m;
      this._position = p0;
      this._velocity = v0;
      this._acceleration = new Vector().set(0, 0, 0);
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