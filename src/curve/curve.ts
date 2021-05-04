import { Queue } from "mnemonist";
import p5, { Vector } from "p5";
import { Mover } from "../mover/mover";

export const curve = (p5: p5) => {
  const width = 711;
  const height = 400;

  let p0: Vector = new Vector().set(20, 20);
  let p1: Vector = new Vector().set(80, 20);
  let p2: Vector = new Vector().set(50, 50);
  let p3: Vector = new Vector().set(60, 35);
  p5.setup = () => {
    p5.createCanvas(width, height);

    // p5.stroke(13, 185, 219);
    p5.fill(52, 164, 235)
  };

  p5.draw = () => {

    p5.background(100);
    p1 = p5.createVector(p5.mouseX, p5.mouseY);
    p3 = p1.copy().mult(.1).add(Vector.sub(p2, p0));
    
    
    
    p5.noStroke()
    p5.strokeWeight(1);
    p5.beginShape()
    p5.vertex(p0.x, p0.y)
    p5.quadraticVertex(p1.x, p1.y, p2.x, p2.y)
    p5.quadraticVertex(p3.x, p3.y, p0.x, p0.y)
    p5.endShape()

    p5.stroke(13, 185, 219);
    p5.strokeWeight(5);
    p5.point(p0.x, p0.y)
    p5.point(p1.x, p1.y)
    p5.point(p2.x, p2.y)
    p5.point(p3.x, p3.y)

  };
};
