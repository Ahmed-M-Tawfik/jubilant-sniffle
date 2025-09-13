import { GAME_CONFIG } from "../data/GameConfig.js";
import type { PhysicsComponent } from "../entities/components/PhysicsComponent.js";
import type { PhysicsRenderComponent } from "../entities/components/PhysicsRenderComponent.js";
import type { GameEntity } from "../entities/GameEntity.js";
import type { Game } from "../Main.js";

export class PhysicsRenderSystem {
  static draw(game: Game, context: CanvasRenderingContext2D, entities: GameEntity[]) {
    const gameDrawScale = GAME_CONFIG.gameDrawScale;

    entities.forEach((entity) => {
      const physics = entity.getComponent<PhysicsComponent>("physics");
      const render = entity.getComponent<PhysicsRenderComponent>("physicsrender");

      if (!physics || !render) {
        return;
      }

      context.save();

      context.fillStyle = render.color;

      if (render.shape === "rectangle") {
        PhysicsRenderSystem.drawRectangle(context, physics, gameDrawScale);
      } else if (render.shape === "circle") {
        PhysicsRenderSystem.drawCircle(context, physics, gameDrawScale);
      }
    });
    context.restore();
  }

  private static drawCircle(context: CanvasRenderingContext2D, physics: PhysicsComponent, gameDrawScale: number) {
    let centerX = physics.position.x;
    let centerY = physics.position.y;
    let radius = physics.size.width / 2;

    // draw an oval
    let scaleX = physics.size.width * gameDrawScale;
    let scaleY = physics.size.height * gameDrawScale;
    context.scale(scaleX, scaleY);
    context.beginPath();
    context.arc(centerX / scaleX, centerY / scaleY, radius, 0, Math.PI * 2);
    context.fill();
  }

  private static drawRectangle(context: CanvasRenderingContext2D, physics: PhysicsComponent, gameDrawScale: number) {
    // fill rect with physics.position being center position
    let centerX = physics.position.x;
    let centerY = physics.position.y;

    let halfWidth = (physics.size.width / 2) * gameDrawScale;
    let halfHeight = (physics.size.height / 2) * gameDrawScale;

    context.fillRect(centerX - halfWidth, centerY - halfHeight, halfWidth * 2, halfHeight * 2);
  }
}
