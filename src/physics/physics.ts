import p5, { Vector } from "p5";
import { Mover } from "../mover/mover"

export const physicsSketch = (p5: p5) => {

  const width = 800;
  const height = 600;

  let faller: Mover;
  let slider: Mover;

  let moverNoFriction: Mover
  let moverFriction: Mover

  let attracted: Mover

  let previous: number;
  let elapsed: number;
  let time: number;

  const gravity = p5.createVector(0, 10);
  const mass = 200;
  const weight = gravity.mult(mass);

  const frictionCoeff = -10;

  const airResistCoeff = -.1;

  const G = 10;

  let mouse: Vector

  p5.setup = () => {
    p5.createCanvas(width, height);
    const p0 = p5.createVector(10, 0);
    const v0 = p5.createVector(70, 0);
    faller = new Mover(mass, p0, v0);

    const p1 = p5.createVector(10, height / 2);
    const v1 = p5.createVector(70, 0);
    slider = new Mover(mass, p1, v1);

    const p2 = p5.createVector(50, 0);
    const v2 = p5.createVector(0, 100);
    moverNoFriction = new Mover(mass, p2, v2);
    
    const p3 = p5.createVector(90, 0);
    const v3 = p5.createVector(0, 100);
    moverFriction = new Mover(mass, p3, v3);

    const p4 = p5.createVector(90, 90);
    const v4 = p5.createVector(0, 0);
    attracted = new Mover(mass, p4, v4);

    p5.fill("red");
    p5.noStroke();
    previous = performance.now();
  };

  p5.draw = () => {
    p5.clear();

    time = performance.now();

    elapsed = (time - previous) / 1000; // in seconds

    faller.applyForce(weight);

    faller.update(elapsed);

    const friction = slider.velocity;
    friction.normalize().mult(frictionCoeff);
    slider.applyForce(friction);
    slider.update(elapsed)

    const airFriction = moverFriction.velocity;
    const speed = airFriction.magSq();
    airFriction.normalize().mult(airResistCoeff * speed);

    moverFriction.applyForce(airFriction);
    moverFriction.update(elapsed);

    moverNoFriction.update(elapsed);

    mouse = p5.createVector(p5.mouseX, p5.mouseY)

    const attractionVect = Vector.sub(mouse, attracted.position)
    
    const magnitude = G * attracted.mass * attracted.mass * 2000000 / attractionVect.magSq()

    attractionVect.normalize().mult(p5.constrain(magnitude, 0, 1000))
    
    attracted.applyForce(attractionVect)
    attracted.update(elapsed)

    p5.circle(faller.position.x, faller.position.y, 30);
    p5.circle(slider.position.x, slider.position.y, 30);

    p5.circle(moverFriction.position.x, moverFriction.position.y, 30);

    p5.circle(moverNoFriction.position.x, moverNoFriction.position.y, 30);

    p5.circle(attracted.position.x, attracted.position.y, 30);

    if (
      faller.position.x > width ||
      faller.position.x < 0 ||
      faller.position.y < 0 ||
      faller.position.y > height
    ) {
      console.log("no draw");
      p5.noLoop();
    } else {

      previous = time;
    }

  };
};
