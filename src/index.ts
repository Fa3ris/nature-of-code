import p5 from "p5";
import { physicsSketch2 } from "./physics/physics2";
import { triangleSketch } from "./triangles/triangles";

const container = document.createElement("div");
container.classList.add("container");
document.body.append(container);

new p5(triangleSketch, container);
// new p5(physicsSketch);
new p5(physicsSketch2, container);
