import { Queue } from "mnemonist";
import p5, { Vector } from "p5";
import { Mover } from "../mover/mover";

export const angularMotion = (p5: p5) => {
  let angle: number = 0;
  const inc: number = 0.01;
  const width = 711;
  const height = 400;

  const pendulum = new Pendulum(new Vector().set(400, 0),
  150, 20,  Math.PI / 4, 0.01);

  const pendulum2 = new Pendulum(new Vector().set(150, 100),
  150, 20,  Math.PI / 4, 0.05);

  let theta: number = 0;
  let omega: number = 0;
  let r = 10;
  p5.setup = () => {
    p5.createCanvas(width, height);

    p5.stroke(13, 185, 219);
    p5.background(100);
    p5.smooth();
  };

  p5.draw = () => {
    p5.background(100);
    // p5.push()
    // p5.translate(100, height/2)
    // p5.strokeWeight(1);
    // p5.rotate(angle);

    // p5.line(-50, 0, 50, 0);
    // p5.ellipse(-50, 0, 10)
    // p5.ellipse(50, 0, 10)
    // p5.pop()
    // angle = (angle + inc) % p5.TAU;

    // p5.push()
    // p5.translate(width/2, height/2)

    // p5.ellipse(r*p5.cos(theta), r*p5.sin(theta), 2);
    // theta = (theta + inc) % p5.TAU;
    // r += .05
    // // if (theta > p5.TAU - .5) {

    // // }
    // p5.pop()

    // p5.push()
    // p5.translate(200, 300)
    // p5.ellipse(40*p5.cos(omega / 5), 0, 10);
    // p5.pop()

    // omega += inc

    pendulum.update();
    pendulum2.update()
    pendulum.draw(p5);
    pendulum2.draw(p5);
    // p5.noLoop()
  };

  p5.mouseClicked = () => {
    p5.redraw();
  };
};

class Pendulum {
  private readonly affix: Vector;

  private readonly length;

  private readonly radius;

  private readonly maxAngle;

  private theta;
  private angularVelocity;

  constructor(
    affix: Vector,
    armLength: number,
    radius: number,
    maxAngle: number,
    angularVelocity: number
  ) {
    this.affix = affix;

   this.length = armLength;

   this.radius = radius;

   this.maxAngle = maxAngle;

   this.theta = 0;
   this.angularVelocity = angularVelocity;
  }

  update() {
    if (this.exceedMaxAngle()) {
      this.angularVelocity *= -1;
    }
    this.theta = (this.theta + this.angularVelocity) % (Math.PI * 2);
  }

  private exceedMaxAngle(): boolean {
    return (
      (this.theta > this.maxAngle && this.angularVelocity > 0) ||
      (this.theta < -this.maxAngle && this.angularVelocity < 0)
    );
  }

  draw(p5: p5) {
    p5.push();
    p5.translate(this.affix.x, this.affix.y);
    p5.line(
      0,
      0,
      this.length * p5.sin(this.theta),
      this.length * p5.cos(this.theta)
    );
    p5.translate(
      this.length * p5.sin(this.theta),
      this.length * p5.cos(this.theta)
    );
    p5.circle(0, 0, this.radius);
    p5.pop();
  }
}
