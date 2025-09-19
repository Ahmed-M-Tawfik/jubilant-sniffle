import Matter from "matter-js";
import { PhysicsComponent } from "../entities/components/PhysicsComponent";
import { PlayerComponent } from "../entities/components/PlayerComponent";
import type { GameEntity } from "../entities/GameEntity";
import type { Game } from "../Main";
import { playerActions } from "../ui/UserInterfaceConfigTypes";

export class PlayerInteractionSystem {
  static update(game: Game, entities: GameEntity[]): void {
    entities
      .filter((entity) => entity.getComponent<PlayerComponent>("player"))
      .forEach((entity) => {
        const player = entity.getComponent<PlayerComponent>("player");
        const physics = entity.getComponent<PhysicsComponent>("physics");
        if (!player || !physics) return;

        const body = physics.matterBody;

        if (player.playerId === 0) {
          if (game.input.actions.has(playerActions.player0.moveLeft)) {
            Matter.Body.applyForce(body, body.position, { x: -10, y: 0 });
          }
          if (game.input.actions.has(playerActions.player0.moveRight)) {
            Matter.Body.applyForce(body, body.position, { x: 10, y: 0 });
          }
          if (game.input.actions.has(playerActions.player0.moveUp)) {
            Matter.Body.applyForce(body, body.position, { x: 0, y: -10 });
          }
          if (game.input.actions.has(playerActions.player0.moveDown)) {
            Matter.Body.applyForce(body, body.position, { x: 0, y: 10 });
          }
        }
        if (player.playerId === 1) {
          if (game.input.actions.has(playerActions.player1.moveLeft)) {
            Matter.Body.applyForce(body, body.position, { x: -10, y: 0 });
          }
          if (game.input.actions.has(playerActions.player1.moveRight)) {
            Matter.Body.applyForce(body, body.position, { x: 10, y: 0 });
          }
          if (game.input.actions.has(playerActions.player1.moveUp)) {
            Matter.Body.applyForce(body, body.position, { x: 0, y: -10 });
          }
          if (game.input.actions.has(playerActions.player1.moveDown)) {
            Matter.Body.applyForce(body, body.position, { x: 0, y: 10 });
          }
        }
      });
  }
}
