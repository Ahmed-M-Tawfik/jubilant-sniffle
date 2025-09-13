import type { PaddleComponent } from "../entities/components/PaddleComponent.js";
import type { PhysicsComponent } from "../entities/components/PhysicsComponent.js";
import type { GameEntity } from "../entities/GameEntity.js";
import type { Game } from "../Main.js";
import { scaledDeltaTime } from "../utils/timeUtils.js";

export class PhysicsSystem {
  static update(game: Game, entities: GameEntity[], deltaTime: number): void {
    let paddles = entities.filter((entity) => entity.getComponent<PaddleComponent>("paddle"));
    let nonPaddles = entities.filter((entity) => !entity.getComponent<PaddleComponent>("paddle"));

    paddles.forEach((paddle) => {
      const physics = paddle.getComponent<PhysicsComponent>("physics");
      if (!physics) {
        return;
      }

      const scaledDt = scaledDeltaTime(game, deltaTime);

      // we assume that paddles will only collide with non-paddles
      this.detectAndApplyCollisions(physics, nonPaddles);
      this.updatePositionsBasedOnVelocity(physics, scaledDt);
    });

    nonPaddles.forEach((entity) => {
      const physics = entity.getComponent<PhysicsComponent>("physics");
      if (!physics) {
        return;
      }

      const scaledDt = scaledDeltaTime(game, deltaTime);
      this.updatePositionsBasedOnVelocity(physics, scaledDt);
    });
  }

  private static detectAndApplyCollisions(paddlePhysics: PhysicsComponent, nonPaddles: GameEntity[]): void {
    nonPaddles.forEach((nonPaddle) => {
      const colliderPhysics = nonPaddle.getComponent<PhysicsComponent>("physics");
      if (!colliderPhysics) {
        return;
      }

      // Assume paddle is rectangle, collider is circle (e.g., ball)
      if (this.isCircleRectColliding(colliderPhysics, paddlePhysics)) {
        // Calculate collision normal
        const closestX = Math.max(
          paddlePhysics.position.x,
          Math.min(colliderPhysics.position.x, paddlePhysics.position.x + paddlePhysics.size.width)
        );
        const closestY = Math.max(
          paddlePhysics.position.y,
          Math.min(colliderPhysics.position.y, paddlePhysics.position.y + paddlePhysics.size.height)
        );
        const normalX = colliderPhysics.position.x - closestX;
        const normalY = colliderPhysics.position.y - closestY;
        const length = Math.sqrt(normalX * normalX + normalY * normalY) || 1;
        const nx = normalX / length;
        const ny = normalY / length;

        // Use relative velocity for bounce
        const relVelX = colliderPhysics.velocity.x - paddlePhysics.velocity.x;
        const relVelY = colliderPhysics.velocity.y - paddlePhysics.velocity.y;
        const dot = relVelX * nx + relVelY * ny;
        // Reflect relative velocity
        const reflectedRelVelX = relVelX - 2 * dot * nx;
        const reflectedRelVelY = relVelY - 2 * dot * ny;
        // New collider velocity is reflected relative velocity plus paddle velocity
        colliderPhysics.velocity.x = reflectedRelVelX + paddlePhysics.velocity.x;
        colliderPhysics.velocity.y = reflectedRelVelY + paddlePhysics.velocity.y;
      }
    });
  }

  private static isCircleRectColliding(paddle: PhysicsComponent, circle: PhysicsComponent): boolean {
    // Find closest point on rectangle to circle center
    const closestX = Math.max(paddle.position.x, Math.min(circle.position.x, paddle.position.x + paddle.size.width));
    const closestY = Math.max(paddle.position.y, Math.min(circle.position.y, paddle.position.y + paddle.size.height));
    // Calculate distance to circle center
    const dx = circle.position.x - closestX;
    const dy = circle.position.y - closestY;
    // Use circle radius for collision check
    const radius = circle.size.width;
    return dx * dx + dy * dy < radius * radius;
  }

  private static updatePositionsBasedOnVelocity(paddle: PhysicsComponent, scaledDt: number): void {
    paddle.position.x += paddle.velocity.x * scaledDt;
    paddle.position.y += paddle.velocity.y * scaledDt;
  }
}
