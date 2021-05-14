import { Vector } from "p5";

export interface Intersection {

    x?: number
    y?: number
}

export class LineLineDetector {

  static detectLineLine(
    p1: Vector,
    p2: Vector,
    p3: Vector,
    p4: Vector
  ): Vector | undefined {
    const x1 = p1.x;
    const y1 = p1.y;

    const x2 = p2.x;
    const y2 = p2.y;

    const x3 = p3.x;
    const y3 = p3.y;

    const x4 = p4.x;
    const y4 = p4.y;

    const denominator = (x1 -x2)*(y3 - y4) - (y1 - y2)*(x3 - x4)

    if (denominator == 0) {
        return undefined
    }

    const interX = ((x1*y2 - y1*x2)*(x3 - x4) - (x1 - x2)*(x3*y4 - y3*x4)) / denominator

    const interY = ((x1*y2 - y1*x2)*(y3 - y4) - (y1 - y2)*(x3*y4 - y3*x4)) / denominator

    return new Vector().set(interX, interY);
  }

  static intersectInsideSegment(intersect: Vector, start: Vector, end: Vector): boolean {

    if (!intersect) {
        return false
    } else {

      const maybeInnerSegment = Vector.sub(intersect, start)

      const segment = Vector.sub(end, start)

      const dotProduct = segment.dot(maybeInnerSegment)

      const vectorsHaveOppositeDirections = dotProduct < 0

      if (vectorsHaveOppositeDirections) {
        return false
      }

      if (dotProduct > segment.magSq()) {
        return false
      }

      return true
    }
  }
}
