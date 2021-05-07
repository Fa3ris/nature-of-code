import { Vector } from "p5";


export class Particle {
  inUse: boolean = false;

  lifeSpan = 0;
  position: Vector = new Vector();
  velocity: Vector = new Vector();
  acceleration: Vector = new Vector();

  constructor() { }
}
