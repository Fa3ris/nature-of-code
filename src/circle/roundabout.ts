import { Queue } from "mnemonist";
import p5, { Color, Vector } from "p5";
import { Mover } from "../mover/mover";

export const roundabout = (p5: p5) => {
  const width = 711;
  const height = 400;

  const inc = 0.01;
  let phasing = 0;

  const baseRadius = 30;
  let r = baseRadius;

  const variation = 5;

  p5.setup = () => {
    p5.createCanvas(width, height);

    p5.noStroke();
  };

  p5.draw = () => {
    p5.background(100);
    p5.push();
    p5.translate(width / 2, height / 2);
    for (let i = 0; i < p5.TAU; i += p5.QUARTER_PI) {
      p5.fill(52, 164, 235, 255 - i * 50);
      p5.circle(r * p5.cos(i + phasing), r * p5.sin(i + phasing), r / 2);
    }
    p5.pop();

    phasing -= inc;
    phasing %= p5.TAU;

    r = baseRadius + variation * p5.sin(phasing);
  };
};
