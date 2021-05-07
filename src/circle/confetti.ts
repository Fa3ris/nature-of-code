import p5, { Vector } from "p5";
import { Mover } from "../mover/mover";

export const confettiSystem = (p5: p5) => {
  const width = 711;
  const height = 400;
  const confettis: Confetti[] = [];
  const baseSize = 10;

  const maxNegativeHeight = -300;

  const maxSize = 1000;

  const windForceX = 15;
  const windForceY = -40;
  const wind = new Vector().set(windForceX, windForceY);

  p5.setup = () => {
    p5.createCanvas(width, height);

    for (let i = 0; i < baseSize; i++) {
      let confetti = new Confetti();
      setStart(confetti);
      confettis.push(confetti);
    }
    p5.noStroke();
    p5.fill(255);
    p5.blendMode(p5.ADD)
  };

  const mean = 2;

  const std = 1;

  let loop = true;

  p5.draw = () => {
    p5.clear()
    p5.background(0);

    if (confettis.length < maxSize) {
      const rng = p5.randomGaussian(mean, std);
      if (p5.abs(rng - mean) <= 0.1) {
        let confetti = new Confetti();
        setStart(confetti);
        confettis.push(confetti);
      }
    }

    for (const confetti of confettis) {
      if (applyWind) {
        confetti.mover.applyForce(wind);
      }
      confetti.mover.applyWeight();
      confetti.mover.update(0.1);
      confetti.draw(p5);

      if (confetti.mover.position.y - confetti.radius > height) {
        setStart(confetti);
      }
    }
  };

  
  p5.keyPressed = () => {
      if (p5.key === ' ') {
        loop = !loop
      }

      if (loop) {
          p5.loop();
    } else {
          p5.noLoop()
      }
  }

  function setStart(confetti: Confetti) {
    confetti.mover.position = new Vector().set(
      p5.random(0, width),
      p5.random(maxNegativeHeight, 0)
    );
    confetti.mover.velocity = new Vector();
  }

  let applyWind = false;

  p5.mouseClicked = () => {
    applyWind = !applyWind;
  };
};

class Confetti {
  mover: Mover = new Mover();

  radius: number = Math.random() * 10 + 10;

  draw(p5: p5) {
    p5.push();
    let position = this.mover.position;
    for (let r = this.radius; r > 0; --r) {
      p5.fill(255, r*2);
      p5.circle(position.x, position.y, r);
    }
    p5.pop();
  }
}
