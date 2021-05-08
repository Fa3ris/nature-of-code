import p5, { Vector } from "p5";
import { Boyd } from "../boyd/boyd";
import { Mover } from "../mover/mover";

export const steering = (p5: p5) => {
  const width = 711;
  const height = 400;

  const target = new Vector().set(width / 2, height / 2);

  const boyd = new Boyd();

  let seek = false;

  p5.setup = () => {
    p5.createCanvas(width, height);

    boyd.mover.position = new Vector().set(width / 2, height / 2);

    boyd.mover.velocity = new Vector().set(
      p5.random(-10, 10),
      p5.random(-10, 10)
    );
    p5.fill(255);
    p5.stroke(255);
  };

  p5.draw = () => {
    p5.background(0);
    if (seek) {
        boyd.arrive(target)
    }
    boyd.mover.update();
    boyd.wrapEdges(p5);
    boyd.draw(p5);
    p5.point(target.x, target.y);
  };

  p5.keyPressed = () => {
    if (p5.key === " ") {
      seek = !seek;
    }
  };

  p5.mouseClicked = () => {
    target.set(p5.mouseX, p5.mouseY);
  };
};
