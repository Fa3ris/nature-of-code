import { Vector } from "p5";

export class ParticlePool {
  private instance: ParticlePool | undefined;

  private _pool: Particle[];
  private size = 100;

  private constructor() {
    this._pool = new Array(this.size);

    for (let index = 0; index < this.size; index++) {
      this._pool.push(new Particle());
    }
  }

  public getInstance(): ParticlePool {
    if (!this.instance) {
      this.instance = new ParticlePool();
    }
    return this.instance;
  }

  public getParticule(): Particle {
    for (let i = 0; i < this.size; i++) {
      if (!this._pool[i].inUse) {
        return this._pool[i];
      }
    }

    const extension = new Array(this.size);
    for (let index = 0; index < this.size; index++) {
      extension.push(new Particle());
    }

    this._pool = [...this._pool, ...extension];
    const index = this.size;
    this.size = this.size * 2;
    return this._pool[index];
  }

  public releaseParticule(particule: Particle) {
    const toRelease = this._pool.find((value) => value === particule)
    if (toRelease) {
        toRelease.inUse = false;
    }
  }
}

class Particle {
  inUse: boolean = false;

  position: Vector = new Vector()
  velocity: Vector = new Vector()
  acceleration: Vector = new Vector()

  constructor() {}
}
