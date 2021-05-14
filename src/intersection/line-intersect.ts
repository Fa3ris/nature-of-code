import p5, { Vector } from "p5";
import { Boyd } from "../boyd/boyd";
import { Segment } from "../path/segment";
import { LineLineDetector } from "./line-line-intersection";

export const lineIntersect = (p5: p5) => {
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

  const boyd = new Boyd();

  boyd.mover.position = new Vector().set(p5.random(width), p5.random(height));
    boyd.mover.velocity = new Vector().set(
      p5.random(-10, 10),
      p5.random(-10, 10)
    );

  p5.setup = () => {
    p5.createCanvas(width, height);
    segment.display(offScreen)
    segment2.display(offScreen)

    const intersect = LineLineDetector.detectLineLine(segment.start, segment.end, segment2.start, segment2.end)
    if (intersect.x && intersect.y) {

        const overFlowX = intersect.x < 0 || intersect.x > width
        const overFlowY = intersect.y < 0 || intersect.y > height
        if (overFlowX || overFlowY) {
            offScreen.text("overflow", 10, 10)
        } else {
            offScreen.push()

            offScreen.strokeWeight(10)
    
            const interSegment = LineLineDetector.intersectInsideSegment(intersect, segment.start, segment.end)
            const interSegment2 = LineLineDetector.intersectInsideSegment(intersect, segment2.start, segment2.end)
            
            let count = 0
            if (interSegment) {
                count++
            }
            if (interSegment2) {
                count++
            }
            offScreen.text(`intersection point falls on ${count} segment${count > 1 ? 's': ''}`, 10, 10)
            offScreen.stroke("yellow")
            offScreen.point(intersect.x, intersect.y)
            offScreen.pop()
        }
        
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
