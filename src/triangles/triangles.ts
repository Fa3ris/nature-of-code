import p5, { Vector } from "p5";


export const triangleSketch = (p5: p5) => {

  const white = p5.color("white");
  const red = p5.color("red");

  const backX = -20;
  const backY = 20;
  
  let offScreen: p5.Graphics;

  const triangleShape: TriangleShape = {
    a: p5.createVector(10, 0),
    b: p5.createVector(backX, backY),
    c: p5.createVector(backX, -backY)
  }

  let previous: number;
  let elapsed: number;
  let time: number;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.frameRate(24)

    offScreen = p5.createGraphics(p5.windowWidth, p5.windowHeight)
    offScreen.fill(white);
    offScreen.stroke(red);
    offScreen.strokeWeight(.75);

    
    for (let i = 0; i < p5.windowWidth; i += 10) {
      for (let j = 0; j < p5.windowHeight; j += 10) {
        isocelesTriangle(offScreen, p5.createVector(i, j), (i*j) % p5.TAU, triangleShape, false);
      }   
    }
    previous = performance.now()
  };


  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };


  p5.draw = () => {

    time = performance.now();

    console.log("fps", p5.frameRate());
    
    elapsed = time - previous;
    console.log("elapsed ms", elapsed);
    
    previous = time
    p5.clear();

    p5.image(offScreen, 0, 0)
  };

  p5.mouseClicked = () => {
    console.log("draw called");
    p5.draw();
  }
};

function equilateralTriangle(
  p5: p5,
  center: Vector,
  radius: number,
  angle: number,
  orientation = true
): void {
  p5.push();
  p5.translate(center.x, center.y);
  p5.rotate(angle);
  const front: Vector = p5.createVector(radius, 0);
  const back1 = front.copy().rotate(p5.TWO_PI / 3);
  const back2 = front.copy().rotate(-p5.TWO_PI / 3);

  p5.beginShape(p5.TRIANGLES);
  p5.vertex(front.x, front.y);
  p5.vertex(back1.x, back1.y);
  p5.vertex(back2.x, back2.y);
  p5.endShape();

  if (orientation) {

    p5.stroke("red");
    p5.strokeWeight(3);
    p5.line(0, 0, radius - 7, 0);
  }

  p5.pop();
}

interface TriangleShape {
  a: Vector,
  b: Vector,
  c: Vector,
}

function isocelesTriangle(
  p5: p5,
  center: Vector,
  angle: number,
  triangleShape: TriangleShape,
  orientation = true,
): void {

  p5.push();
  p5.translate(center.x, center.y);
  p5.rotate(angle);
  
  p5.beginShape(p5.TRIANGLES);
  p5.vertex(triangleShape.a.x, triangleShape.a.y);
  p5.vertex(triangleShape.b.x, triangleShape.b.y);
  p5.vertex(triangleShape.c.x, triangleShape.c.y);
  p5.endShape();

  if (orientation) {
    p5.line(0, 0, 10, 0);
  }

  p5.pop();
}
