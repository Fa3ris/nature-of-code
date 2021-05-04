import { Queue } from "mnemonist";
import p5, { Vector } from "p5";
import { Mover } from "../mover/mover";

export const angularMotion = (p5: p5) => {
  let angle: number = 0
  const inc: number = .01;
  const width = 711;
  const height = 400

  let theta: number = 0
  let omega: number = 0
  let r = 10;
  p5.setup = () => {

    p5.createCanvas(width, height)
    
    p5.stroke(13, 185, 219);
    p5.background(100)
    p5.smooth()
  };

  p5.draw = () => {

    // p5.background(100)
    p5.push()
    p5.translate(100, height/2)
    p5.strokeWeight(1);
    p5.rotate(angle);

    p5.line(-50, 0, 50, 0);
    p5.ellipse(-50, 0, 10)
    p5.ellipse(50, 0, 10)
    p5.pop()
    angle = (angle + inc) % p5.TAU;

    p5.push()
    p5.translate(width/2, height/2)

    p5.ellipse(r*p5.cos(theta), r*p5.sin(theta), 2);
    theta = (theta + inc) % p5.TAU;
    r += .05
    // if (theta > p5.TAU - .5) {
      
    // }
    p5.pop()
    
    p5.push()
    p5.translate(200, 300)
    p5.ellipse(40*p5.cos(omega / 5), 0, 10);
    p5.pop()

    omega += inc
  };
};
