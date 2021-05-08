import p5, { Vector } from "p5";
import { Boyd } from "../boyd/boyd";
import { Mover } from "../mover/mover";

export const steering = (p5: p5) => {
  const width = 711;
  const height = 400;

  const target = new Vector().set(width / 2, height / 2);

  const boyd = new Boyd();

  const wanderer = new Boyd();

  let seek = false;

  let futureLocation: Vector
  let wanderTarget: Vector;
  const targetDist = 10

  const timeIntoFuture = 3

  const probability = .1

  p5.setup = () => {
    p5.createCanvas(width, height);

    boyd.mover.position = new Vector().set(width / 2, height / 2);
    boyd.mover.velocity = new Vector().set(
      p5.random(-10, 10),
      p5.random(-10, 10)
    );

    wanderer.mover.position = new Vector().set(width * .75, height / 2)
    wanderer.mover.velocity = new Vector().set(
      p5.random(-10, 10),
      p5.random(-10, 10)
    );
    futureLocation = wanderer.mover.projectFutureLocation(timeIntoFuture)
    wanderTarget = wanderer.wander(futureLocation, targetDist);

    p5.fill(255);
    p5.stroke(255);
  };

  
  p5.draw = () => {
    p5.background(0);
    if (seek) {
        boyd.arrive(target)
    }

    const pickNew = p5.random() < probability;
    if (pickNew) {
      futureLocation = wanderer.mover.projectFutureLocation(timeIntoFuture)
      wanderTarget = wanderer.wander(futureLocation, targetDist);
    }
    wanderer.arrive(wanderTarget);

    wanderer.mover.update()
    boyd.mover.update();

    wanderer.wrapEdges(p5)
    boyd.wrapEdges(p5);

    boyd.draw(p5);
    wanderer.draw(p5)
    p5.push()
    p5.noStroke()
    p5.fill(255, 10);
    const radius = futureLocation.dist(wanderTarget);
    p5.circle(futureLocation.x, futureLocation.y, radius*2);
    p5.stroke(255)
    p5.strokeWeight(2)
    p5.point(wanderTarget.x, wanderTarget.y)
    p5.pop()
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
