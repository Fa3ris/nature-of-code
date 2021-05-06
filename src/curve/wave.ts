import p5 from "p5";

export const wave = (p5: p5) => {
  const width = 711;
  const height = 400;

  const points: number[] = [];

  let time = 0;
  const start = 0;
  const end = width / 2;
  const spacing = 0.1;
  const amplitude = 20;

  const period = 4;
  p5.setup = () => {
    p5.createCanvas(width, height);

    for (let i = start; i < end; i += spacing) {
      points.push(i);
    }
    p5.stroke(52, 164, 235);
    p5.noFill();
  };

  p5.draw = () => {
    p5.background(100);
    p5.push();
    p5.translate(0, height / 2);
    p5.beginShape();

    for (let point of points) {
      let y = amplitude * p5.sin((point + time) / period);
      p5.vertex(point, y);
    }
    p5.endShape();
    p5.pop();
    time += 0.7;
  };
};
