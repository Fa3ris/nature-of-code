import { Particle } from "./particle";

export class ParticlePool {
  private static instance: ParticlePool | undefined;

  private _pool: Particle[];
  private size = 100;

  private constructor() {
    this._pool = new Array();

    for (let index = 0; index < this.size; index++) {
      this._pool.push(new Particle());
    }
  }

  public static getInstance(): ParticlePool {
    if (!ParticlePool.instance) {
      ParticlePool.instance = new ParticlePool();
    }
    return ParticlePool.instance;
  }

  public getParticle(): Particle {
    for (let i = 0; i < this.size; i++) {
      if (!this._pool[i].inUse) {
        this._pool[i].inUse = true
        return this._pool[i];
      }
    }

    const extension = new Array();
    for (let index = 0; index < this.size; index++) {
      extension.push(new Particle());
    }

    this._pool = [...this._pool, ...extension];
    const index = this.size;
    this.size = this.size * 2;
    this._pool[index].inUse = true
    return this._pool[index];
  }

  public releaseParticle(particule: Particle) {
    const toRelease = this._pool.find((value) => value === particule)
    if (toRelease) {
        toRelease.inUse = false;
    }
  }
}


