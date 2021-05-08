import p5, { Vector } from "p5";
import { Mover } from "../mover/mover";

const halfTriangleHeight = 5;
const halfTriangleBase = 3;

const triangleShape = {
  a: new Vector().set(halfTriangleHeight, 0),
  b: new Vector().set(-halfTriangleHeight, halfTriangleBase),
  c: new Vector().set(-halfTriangleHeight, -halfTriangleBase),
};

export class Boyd {
  mover: Mover = new Mover();

  draw(p5: p5) {
    p5.push();

    p5.translate(this.mover.position.x, this.mover.position.y);
    p5.rotate(this.mover.heading);

    p5.beginShape(p5.TRIANGLES);
    p5.vertex(triangleShape.a.x, triangleShape.a.y);
    p5.vertex(triangleShape.b.x, triangleShape.b.y);
    p5.vertex(triangleShape.c.x, triangleShape.c.y);
    p5.endShape();

    p5.pop();
  }

  wrapEdges(p5: p5) {
    const width = p5.width;
    const height = p5.height;

    const pos = this.mover.position;

    // left-most side exceeds right border
    if (pos.x - halfTriangleHeight > width) {
      // wrap to left border with only half right side showing
      pos.x = -halfTriangleHeight;
    }

    // right-most side exceeds left border
    if (pos.x + halfTriangleHeight < 0) {
      // wrap to right border with only half left side showing
      pos.x = width + halfTriangleHeight;
    }

    // upper-most side exceeds bottom border
    if (pos.y - halfTriangleHeight > height) {
      // wrap to top border with only half lower side showing
      pos.y = -halfTriangleHeight;
    }

    // lower-most side exceeds top border
    if (pos.y + halfTriangleHeight < 0) {
      // wrap to bottom border with only half uppder side showing
      pos.y = height + halfTriangleHeight;
    }
  }

  seek(target: Vector, maxSpeed: number = 20, maxForce: number = 20) {
    const desired = Vector.sub(target, this.mover.position);
    desired.setMag(maxSpeed)
    const steering = Vector.sub(desired, this.mover.velocity);
    steering.limit(maxForce)
    this.mover.applyForce(steering)
  }

  arrive(target: Vector, closeDistance: number = 100, maxSpeed: number = 40, maxForce: number = 10) {
    const desired = Vector.sub(target, this.mover.position);
    const distance = desired.mag();
    let limitSpeed: number;
    if (distance < closeDistance) {
        limitSpeed = Math.floor(this.scale(distance, 0, closeDistance, 0, maxSpeed))
    } else {
        limitSpeed = maxSpeed
    }
    desired.setMag(limitSpeed)
    desired.normalize().mult(limitSpeed)
    const steering = Vector.sub(desired, this.mover.velocity);
    steering.limit(maxForce)
    this.mover.applyForce(steering.mult(this.mover.mass))
  }

  wander(futureLocation: Vector, radius: number = 20): Vector {
    const angle = Math.random() * 2*Math.PI
    return Vector.add(futureLocation, new Vector().set(Math.cos(angle), Math.sin(angle)).mult(radius))
  }



  private scale (number: number, inMin: number, inMax: number, outMin: number, outMax: number) {
    return outMin + (((number - inMin)/(inMax - inMin)) * (outMax - outMin));
}
}
