import p5, { Vector } from "p5";

export class FlowField {
  field: Vector[][];
  rows: number;
  cols: number;
  xResolution: number;
  yResolution: number;
  width: number
  height: number

  constructor(
    p5: p5,
    width: number = 711,
    height: number = 400,
    xRes: number = 20,
    yRes: number = 20,
    layout: "noise"| "center" = "noise"
  ) {
    this.cols = Math.ceil(width / xRes);
    this.rows = Math.ceil(height / yRes);
    this.xResolution = xRes;
    this.yResolution = yRes;
    this.width = width
    this.height = height
    this.field = new Array(this.rows);
    if (layout === 'noise') {
        this.noiseLayout(p5)
    } else {
        this.pointToCenter()
    }
  }

  private noiseLayout(p5: p5) {
    for (let row = 0; row < this.rows; row++) {
        this.field[row] = new Array(this.cols);
        for (let col = 0; col < this.cols; col++) {
            
          const newRow = p5.map(row, 0, this.rows, 0, 2)
          const newCol =  p5.map(col, 0, this.cols, 0, 2)
  
          const theta = p5.map(p5.noise(newCol, newRow), 0, 1, 0, p5.TAU)
          this.field[row][col] =  new Vector().set(p5.cos(theta), p5.sin(theta))
        }
      }
  }

  private pointToCenter() {
    const canvasCenter = new Vector().set(this.width / 2, this.height / 2);
    for (let row = 0; row < this.rows; row++) {
        this.field[row] = new Array(this.cols);
        for (let col = 0; col < this.cols; col++) {
          const caseCenter = new Vector().set(
            col * this.xResolution + this.xResolution / 2 + (Math.random() * 2),
            row * this.yResolution + this.yResolution / 2 + (Math.random() * 2)
          );
          this.field[row][col] = Vector.sub(canvasCenter, caseCenter);
        }
    }
  }

  lookup(position: Vector): Vector {
    let col = Math.floor(position.x / this.xResolution);
    if (col < 0) {
      col = 0;
    } else if (col > this.cols - 1) {
      col = this.cols - 1;
    }
    let row = Math.floor(position.y / this.yResolution);
    if (row < 0) {
      row = 0;
    } else if (row > this.rows - 1) {
      row = this.rows - 1;
    }
    return this.field[row][col];
  }

  draw(p5: p5) {
    p5.push();
    p5.stroke(255, 100);
    p5.strokeWeight(0.75);
    const center = new Vector().set(this.xResolution / 2, this.yResolution / 2);
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        p5.push();
        p5.translate(col * this.xResolution, row * this.yResolution);
        const arrowLength = 15;
        const direction = this.field[row][col]
          .copy()
          .normalize()
          .mult(arrowLength);
        const left = center.x - direction.x / 2;
        const top = center.y - direction.y / 2;
        const bottom = center.y + direction.y / 2;
        const right = center.x + direction.x / 2;
        p5.line(left, top, right, bottom);
        p5.translate(right, bottom);
        p5.rotate(direction.heading());
        const arrowAngle = p5.PI - p5.QUARTER_PI;
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
      }
    }
    p5.pop();
  }

  private pgcd(a: number, b: number): number {
    if (b == 0) {
      return a;
    } else {
      return this.pgcd(b, a % b);
    }
  }
}
