import p5, { Vector } from "p5";
import { Boyd } from "../boyd/boyd";

export const stayAround = (p5: p5) => {
  const width = 711;
  const height = 400;

  const mouse = new Vector().set(p5.mouseX, p5.mouseY);

  const boyds: Boyd[] = [];
  const configs: {r: number, dTheta: number}[] = []

  p5.setup = () => {
    p5.createCanvas(width, height);
    boyds.push(generateBoyd());
    configs.push(randomDistAndDtheta())
  };

  p5.draw = () => {
    p5.background(100);

    mouse.set(p5.mouseX, p5.mouseY);

    boyds.forEach((boyd, index) => {
        const config = configs[index]
        processBoyd(boyd, mouse, config.r, config.dTheta);
    })
  };

  p5.keyPressed = () => {};

  p5.mouseClicked = () => {
    boyds.push(generateBoyd());
    configs.push(randomDistAndDtheta())
  };

  function generateBoyd(): Boyd {
    const boyd = new Boyd();

    boyd.mover.position = new Vector().set(p5.random(width), p5.random(height));
    boyd.mover.velocity = Vector.random2D().setMag(10);
    return boyd;
  }

  function randomDistAndDtheta(lowerRadius: number = 20, upperRadius: number  = 70): {r: number, dTheta: number,} {

    const radius = p5.random(lowerRadius, upperRadius)
    const angle2 = p5.constrain(1/ radius, .5, 1) 
    return {
      r: radius,
      dTheta: angle2 * (p5.random() < .5 ? 1 : -1)
    }
  }

  function processBoyd(boyd: Boyd, mouse: Vector, r: number = 40, dTheta:number = .5) {
    const newTarget = boyd.circleAround(mouse, r, dTheta);

    p5.push();
    p5.strokeWeight(2);
    p5.point(newTarget.x, newTarget.y);
    p5.pop();

    boyd.mover.update();

    p5.push();
    const velHeading = boyd.mover.velocity.heading();
    const boydHead = new Vector()
      .set(p5.cos(velHeading), p5.sin(velHeading))
      .mult(5);
    const translation = Vector.add(boyd.mover.position, boydHead);
    p5.translate(translation.x, translation.y);
    p5.line(0, 0, boyd.mover.velocity.x, boyd.mover.velocity.y);
    p5.translate(boyd.mover.velocity.x, boyd.mover.velocity.y);
    p5.rotate(boyd.mover.velocity.heading());
    const arrowAngle = p5.PI - p5.QUARTER_PI * 0.5;
    const arrowHeadLength = 5;
    p5.line(
      0,
      0,
      arrowHeadLength * p5.cos(arrowAngle),
      arrowHeadLength * p5.sin(arrowAngle)
    );
    p5.line(
      0,
      0,
      arrowHeadLength * p5.cos(-arrowAngle),
      arrowHeadLength * p5.sin(-arrowAngle)
    );
    p5.pop();

    boyd.wrapEdges(p5);

    boyd.draw(p5);
  }
};
