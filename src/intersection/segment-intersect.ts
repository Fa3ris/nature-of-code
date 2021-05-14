import p5, { Vector } from "p5";
import { Boyd } from "../boyd/boyd";
import { Segment } from "../path/segment";
import { LineLineDetector } from "./line-line-intersection";

export const segmentIntersect = (p5: p5) => {
  const width = 711;
  const height = 400;

  const start = new Vector().set(p5.random(width), p5.random(height))
  const end = new Vector().set(p5.random(width), p5.random(height))


  const start2 = new Vector().set(p5.random(width), p5.random(height))
  const end2 = new Vector().set(p5.random(width), p5.random(height))

  const halfWidth = 5;
  const segment = new Segment(start, end, halfWidth)
  const segment2 = new Segment(start2, end2, halfWidth)

  const offScreen = p5.createGraphics(width, height)

  p5.setup = () => {
    p5.createCanvas(width, height);
    segment.display(offScreen)
    segment2.display(offScreen)
    offScreen.text("1", start.x, start.y)
    offScreen.text("2", end.x, end.y)
    offScreen.text("1'", start2.x, start2.y)
    offScreen.text("2'", end2.x, end2.y)

    const intersectInfos = LineLineDetector.detectSegmentSegment(segment.start, segment.end, segment2.start, segment2.end)
    if (intersectInfos) {
      offScreen.push()
      offScreen.strokeWeight(1)

      console.log(intersectInfos.point1);
      console.log(intersectInfos.point2);
      const alpha = 100
      // offScreen.noStroke()
      // offScreen.fill(168, 166, 50, alpha)
      // offScreen.circle(intersectInfos.point1.x, intersectInfos.point1.y, 20)
      // offScreen.fill(50, 168, 82, alpha)
      // offScreen.circle(intersectInfos.point2.x, intersectInfos.point2.y, 10)
      offScreen.stroke(50, 168, 82)
      offScreen.strokeWeight(4)
      offScreen.point(intersectInfos.point1.x, intersectInfos.point1.y)

      offScreen.pop()

      const intersectionOnSegment1 = intersectInfos.ratio1 >= 0 && intersectInfos.ratio1 <= 1
      const intersectionOnSegment2 =  intersectInfos.ratio2 >= 0 && intersectInfos.ratio2 <= 1

      offScreen.text(`intersection is${intersectionOnSegment1 ? '': " not"} on segment 1`, 10, 10)
      offScreen.text(`intersection is${intersectionOnSegment2 ? '': " not"} on segment 2`, 10, 10 + offScreen.textSize())
      offScreen.text(`intersection is${intersectionOnSegment2 ? '': " not"} on segment 2`, 10, 10 + offScreen.textSize())
      offScreen.text(`x: ${intersectInfos.point1.x.toFixed(2)} y: ${intersectInfos.point1.y.toFixed(2)}`, 10, 10 + 2*offScreen.textSize())
    }
  };

  
  p5.draw = () => {
    p5.background(100);
    p5.image(offScreen, 0, 0)

  };

  p5.keyPressed = () => {
  };

  p5.mouseClicked = () => {
  };
};
