export class PhysicsRenderSystem {
  static draw(context: CanvasRenderingContext2D, physicsBodies: Matter.Body[]) {
    context.save();

    physicsBodies.forEach((body) => {
      if (body.render && !body.render.visible) {
        return;
      }

      context.beginPath();
      const vertices = body.vertices;
      if (!vertices || vertices.length === 0 || !vertices[0]) return;

      context.moveTo(vertices[0].x, vertices[0].y);
      for (let i = 1; i < vertices.length; i++) {
        context.lineTo(vertices[i]!.x, vertices[i]!.y);
      }
      context.lineTo(vertices[0].x, vertices[0].y);

      if (body.render && body.render.lineWidth && body.render.strokeStyle) {
        context.lineWidth = body.render.lineWidth;
        context.strokeStyle = body.render.strokeStyle;
        context.stroke();
      }
      if (body.render && body.render.opacity && body.render.fillStyle) {
        context.fillStyle = body.render.fillStyle;
        context.fill();
      }
    });

    context.restore();
  }
}
