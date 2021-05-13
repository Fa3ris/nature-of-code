import p5, { Vector } from "p5";

export const angleBetweenSketch = (p5: p5) => {
  const width = 711;
  const height = 400;

  const lineLength = 50;
  const canvasCenter = new Vector().set(width / 2, height / 2);

  const baseLine = new Vector().set(lineLength, 0);

  let graphics: p5.Graphics;

  const numberPrecision = 3

  p5.setup = () => {
    p5.createCanvas(width, height);
    graphics = p5.createGraphics(width, height);
    graphics.push();
    graphics.translate(canvasCenter.x, canvasCenter.y);
    graphics.stroke("red")
    graphics.line(0, 0, baseLine.x, baseLine.y);
    graphics.pop();
  };

  p5.draw = () => {
    p5.background(100);
    p5.image(graphics, 0, 0);
    const mousePos = new Vector().set(p5.mouseX, p5.mouseY);
    const mouseRelativeToCanvasCenter = Vector.sub(mousePos, canvasCenter)
    mouseRelativeToCanvasCenter.setMag(lineLength);
    const angleRad = mouseRelativeToCanvasCenter.angleBetween(baseLine);
    
    p5.text(`${angleRad.toFixed(numberPrecision)} radians`, 10, 20);
    p5.text(`${p5.degrees(angleRad).toFixed(numberPrecision)} degrees`, 10, 40);
    p5.push();
        p5.translate(canvasCenter.x, canvasCenter.y);
        p5.push()
            p5.stroke("blue")
            p5.line(0, 0, mouseRelativeToCanvasCenter.x, mouseRelativeToCanvasCenter.y);
        p5.pop()
        p5.push()
            p5.noStroke()
            p5.fill(255, 100)
            p5.arc(0, 0, lineLength, lineLength, -angleRad, 0);
        p5.pop()
    p5.pop();
  };
};
