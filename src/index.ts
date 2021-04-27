import p5 from "p5";

const myp5 = new p5((sketch: p5) => {
  let x = 100;
  let y = 100;

  sketch.setup = () => {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
  };

  sketch.windowResized = () => {
    sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
  };

  sketch.draw = () => {
    sketch.background(0);
    sketch.fill(255);
    sketch.rect(x, y, 50, 50);
    x++;

    sketch.createVector(10, 10, 5);
  };
}, document.body);
