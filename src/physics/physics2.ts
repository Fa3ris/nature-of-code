import p5, { Vector } from "p5";
import { Mover } from "../mover/mover";

export const physicsSketch2 = (p5: p5) => {
  const width = 800;
  const height = 600;

  const mass = 200;

  const smallR = Math.sqrt(mass / Math.PI);

  const p0 = new Vector().set(10, 0);
  const v0 = new Vector().set(70, 0);
  const faller = new Mover(mass, p0, v0);
  const c0 = p5.color(255, 68, 59);

  const p1 = new Vector().set(10, height / 2);
  const v1 = new Vector().set(70, 0);
  const slider = new Mover(mass, p1, v1);
  const c1 = p5.color(255, 167, 59);

  const p2 = new Vector().set(50, 0);
  const v2 = new Vector().set(0, 100);
  const moverNoFriction = new Mover(mass, p2, v2);
  const c2 = p5.color(193, 255, 59);

  const p3 = new Vector().set(90, 0);
  const v3 = new Vector().set(0, 100);
  const moverFriction = new Mover(mass, p3, v3);
  const c3 = p5.color(59, 255, 141);

  const p4 = new Vector().set(90, 90);
  const v4 = new Vector().set(0, 10);
  const attracted = new Mover(mass, p4, v4);
  const c4 = p5.color(59, 177, 255);

  const bigMass = 20000;
  const p6 = new Vector().set(width / 2, height / 2);
  const v6 = new Vector().set(0, 0);
  const attractor = new Mover(bigMass, p6, v6);
  const c6 = p5.color(170, 59, 255);

  const bigR = Math.sqrt(bigMass / Math.PI);

  let previous: number;
  let elapsed: number;
  let time: number;

  const frictionCoeff = 10;

  const airResistCoeff = 0.1;

  p5.setup = () => {
    const renderer = p5.createCanvas(width, height);

    renderer.class("foreground");

    p5.noStroke();
    previous = performance.now();
  };

  p5.draw = () => {
    p5.clear();

    time = performance.now();

    elapsed = (time - previous) / 1000; // in seconds

    faller.applyWeight();

    faller.update(elapsed);

    slider.applyFriction(frictionCoeff);
    slider.update(elapsed);

    moverFriction.applyDrag(airResistCoeff);
    moverFriction.update(elapsed);

    moverNoFriction.update(elapsed);

    attracted.applyGravitation(attractor);
    attractor.applyGravitation(attracted);

    attracted.update(elapsed);
    attractor.update(elapsed);

    p5.fill(c0);
    p5.circle(faller.position.x, faller.position.y, smallR);

    p5.fill(c1);
    p5.circle(slider.position.x, slider.position.y, smallR);

    p5.fill(c2);
    p5.circle(moverFriction.position.x, moverFriction.position.y, smallR);

    p5.fill(c3);
    p5.circle(moverNoFriction.position.x, moverNoFriction.position.y, smallR);

    p5.fill(c4);
    p5.circle(attracted.position.x, attracted.position.y, smallR);

    p5.fill(c6);

    p5.circle(attractor.position.x, attractor.position.y, bigR);

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
