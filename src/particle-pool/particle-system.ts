import p5, { Vector } from "p5";
import { ParticlePool } from "./particle-pool";
import { Particle } from "./particle";

export const particleSystem = (p5: p5) => {
  const width = 711;
  const height = 400;

  const pool: ParticlePool = ParticlePool.getInstance()

  const lifeSpan = 100;
  const particles: Particle[] = [];

  const baseCount = 10
  p5.setup = () => {
    p5.createCanvas(width, height);

    for (let i = 0; i < baseCount; i ++) {
        let particle = pool.getParticle()
        particle.velocity = new Vector().set(p5.random(-1, 1), p5.random(-1, 1))
        particle.position = new Vector().set(width/2, height/2)
        particle.lifeSpan = lifeSpan
        particles.push(particle);
    }
    p5.stroke(52, 164, 235);
    p5.fill(255);
  };

  p5.draw = () => {
    p5.background(100);
    for (let i = particles.length - 1; i >= 0; i--) {
        let particle = particles[i]
        particle.lifeSpan--
        if (particle.lifeSpan <= 0) {
            particles.splice(i, 1)
            pool.releaseParticle(particle)
        } else {
            particle.position.add(particle.velocity.copy())
            p5.circle(particle.position.x, particle.position.y, 10)
        }
    }

    if (p5.random(0) < .1) {
        let particle = pool.getParticle()
        particle.velocity = new Vector().set(p5.random(-1, 1), p5.random(-1, 1))
        particle.position = new Vector().set(width/2, height/2)
        particle.lifeSpan = lifeSpan
        particles.push(particle)
    }
  };
};
