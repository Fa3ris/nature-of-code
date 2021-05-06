import p5 from "p5";
import { roundabout } from "./circle/roundabout";
import { curve } from "./curve/curve";
import { wave } from "./curve/wave";
import { angularMotion } from "./physics/angular-motion";
import { physicsSketch2 } from "./physics/physics2";
import { spring } from "./physics/spring";
import { triangleSketch } from "./triangles/triangles";

const container = document.createElement("div");
container.classList.add("container");
document.body.append(container);

// new p5(triangleSketch, container);
// new p5(physicsSketch);
// new p5(physicsSketch2, container);
// new p5(angularMotion, container);
// new p5(roundabout, container);
new p5(spring, container);
// new p5(wave, container);
// new p5(curve);
