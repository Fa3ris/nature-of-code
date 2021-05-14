import p5, { Vector } from "p5";
import { Mover } from "../mover/mover";

export class Segment {
   start;
   end;
   halfWidth;
   heading;
   length;
   direction;

  private static interpolation = 25

  constructor(start: Vector, end: Vector, halfWidth: number) {
    this.start = start;
    this.end = end;
    this.halfWidth = halfWidth;
    this.direction = Vector.sub(end, start).normalize()
    this.heading = this.direction.heading();
    this.length = Vector.dist(start, end);
  }

  display(p5: p5) {
    this.drawNearbyArea(p5);
    this.drawSegment(p5);
  }

  private drawNearbyArea(p5: p5) {
    p5.push();
    p5.translate(this.start.x, this.start.y);
    p5.rotate(this.heading);
    p5.noStroke();
    p5.fill(255, 70);
    p5.beginShape(p5.QUADS);
    p5.vertex(0, this.halfWidth);
    p5.vertex(this.length, this.halfWidth);
    p5.vertex(this.length, -this.halfWidth);
    p5.vertex(0, -this.halfWidth);
    p5.endShape(p5.CLOSE);
    p5.pop();
  }

  private drawSegment(p5: p5) {
    p5.push();
    
    p5.line(this.start.x, this.start.y, this.end.x, this.end.y);
    p5.strokeWeight(5)
    p5.stroke("blue")
    p5.point(this.start.x, this.start.y)
    p5.stroke("red")
    p5.point(this.end.x, this.end.y)
    p5.pop();
  }

//   normalPoint(position: Vector): Vector {
//     // const futureLocation = Vector.add(mover.position, mover.velocity.copy().normalize().mult(Segment.interpolation));
//     const futureLocationRelativeToStart = Vector.sub(position, this.start);

//     const scalarProjection = Vector.mult(this.direction, futureLocationRelativeToStart.dot(this.heading))
//     return Vector.add(this.start, scalarProjection)
//     // return Vector.dist(futureLocation, normalPoint)
//   }
}
