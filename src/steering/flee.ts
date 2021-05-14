import p5, { Vector } from "p5";
import { Boyd } from "../boyd/boyd";

export const fleeBehavior = (p5: p5) => {
  const width = 711;
  const height = 400;

  const obstacles = new Array(50);

  const offScreen = p5.createGraphics(width, height);

  const mouse = new Vector().set(p5.mouseX, p5.mouseY);

  const boyd = new Boyd();

  boyd.mover.position = new Vector().set(p5.random(width), p5.random(height));
  boyd.mover.velocity = Vector.random2D().setMag(10);

  p5.setup = () => {
    p5.createCanvas(width, height);
    offScreen.fill(255);
    offScreen.stroke(255);

    for (let index = 0; index < obstacles.length; index++) {
      const obstacle = new Vector().set(p5.random(width), p5.random(height));
      obstacles[index] = obstacle;
      offScreen.point(obstacle.x, obstacle.y);
    }
  };

  p5.draw = () => {
    p5.background(100);

    p5.image(offScreen, 0, 0);

    mouse.set(p5.mouseX, p5.mouseY);

    boyd.flee(mouse, 50);

    obstacles.forEach((obstacle) => {
      boyd.flee(obstacle);
    });
    boyd.mover.update();

    boyd.wrapEdges(p5);

    boyd.draw(p5);
  };

  p5.keyPressed = () => {};

  p5.mouseClicked = () => {};
};
