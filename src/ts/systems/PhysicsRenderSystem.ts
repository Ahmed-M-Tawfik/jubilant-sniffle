import { Composite } from "matter-js";
import { PhysicsSystem } from "./PhysicsSystem";

export class PhysicsRenderSystem {
  static draw(context: CanvasRenderingContext2D) {
    const bodies = Composite.allBodies(PhysicsSystem.world);

    context.save();
    context.beginPath();

    bodies.forEach((body) => {
      const vertices = body.vertices;
      if (!vertices || vertices.length === 0 || !vertices[0]) return;

      context.moveTo(vertices[0].x, vertices[0].y);
      for (let i = 1; i < vertices.length; i++) {
        context.lineTo(vertices[i]!.x, vertices[i]!.y);
      }
      context.lineTo(vertices[0].x, vertices[0].y);
    });

    context.lineWidth = 1;
    context.strokeStyle = "#555";
    context.stroke();
    context.fillStyle = "#555";
    context.fill();
    context.restore();
  }
}
