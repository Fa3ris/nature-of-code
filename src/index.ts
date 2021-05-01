import p5, { Color, Renderer, Vector } from "p5";
import { physicsSketch } from "./mover/mover";
import { triangleSketch } from "./triangles/triangles";

// new p5(triangleSketch, document.body);
new p5(physicsSketch, document.body);