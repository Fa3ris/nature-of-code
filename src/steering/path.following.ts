import p5, { Vector } from "p5";
import { Boyd } from "../boyd/boyd";
import { FlowField } from "../flow-field/flow-field";
import { Segment } from "../path/segment";

export const pathFollowing = (p5: p5) => {
  const width = 711;
  const height = 400;

  const start = new Vector().set(p5.random(width), p5.random(height))
  const end = new Vector().set(p5.random(width), p5.random(height))
  const halfWidth = 5;
  const segment = new Segment(start, end, halfWidth)

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
  };

  
  p5.draw = () => {
    p5.background(100);
    p5.image(offScreen, 0, 0)


    const pointToSeek = boyd.followSegment(segment)
    
    boyd.mover.update();

    boyd.wrapEdges(p5);
    
    boyd.draw(p5);

    if (pointToSeek) {

        console.log(pointToSeek);
        p5.push()
        p5.stroke("red")
        p5.line(boyd.mover.position.x, boyd.mover.position.y, pointToSeek.x, pointToSeek.y)
        p5.point(pointToSeek.x, pointToSeek.y)
        p5.pop()
    }

  };

  p5.keyPressed = () => {
  };

  p5.mouseClicked = () => {
  };
};
