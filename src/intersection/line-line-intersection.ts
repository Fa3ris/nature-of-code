import { Vector } from "p5";

export interface IntersectionInfos {

    ratio1: number
    point1: Vector
    ratio2: number
    point2: Vector
    
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


  static detectSegmentSegment(
    p1: Vector,
    p2: Vector,
    p3: Vector,
    p4: Vector): IntersectionInfos | undefined {

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

      const ratio1 = ((x1 - x3)*(y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator

      const ratio2 = ((x2 - x1)*(y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

      const point1X = x1 + ratio1*(x2 - x1)
      const point1Y = y1 + ratio1*(y2 - y1)

      const point2X = x3 + ratio2*(x4 - x3)
      const point2Y = y3 + ratio2*(y4 - y3)

      const point1 = new Vector().set(point1X, point1Y)
      const point2 = new Vector().set(point2X, point2Y)

      return {ratio1, ratio2, point1, point2}

    }
}
