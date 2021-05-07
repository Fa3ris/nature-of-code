import { Particle } from "./particle";

export interface Poolable {
    reset(): void;
    inUse: boolean
}

export class GenericPool {

  private _pool: Poolable[] = []
  private size = 100;

  private factoryFn: () => Poolable

  private constructor(factoryFn: () => Poolable) {
    this.factoryFn = factoryFn;
    for (let index = 0; index < this.size; index++) {
      this._pool.push(this.factoryFn());
    }
  }

  public get(): Poolable {
    for (let i = 0; i < this.size; i++) {
      if (!this._pool[i].inUse) {
        this._pool[i].inUse = true
        return this._pool[i];
      }
    }

    const extension: Poolable[] = [];
    for (let index = 0; index < this.size; index++) {
      extension.push(this.factoryFn());
    }

    this._pool = [...this._pool, ...extension];
    const index = this.size;
    this.size = this.size * 2;
    this._pool[index].inUse = true
    return this._pool[index];
  }

  public release(t: Poolable) {
    const toRelease = this._pool.find((value) => value === t)
    if (toRelease) {
      toRelease.inUse = false;
      toRelease.reset();
    }
  }
}


