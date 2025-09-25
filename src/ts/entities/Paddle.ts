import Matter from "matter-js";
import { type Game } from "../../ts/Main";
import type { IPaddleConfig, IPaddleLocationConfig, IPlayerConfig } from "../ConfigTypes";
import { CollisionCategory } from "../systems/PhysicsSystem";
import { addPhysicsComponentAndMatterBody } from "../utils/entityUtils";
import { GameEntity } from "./GameEntity";
import { PaddleComponent } from "./components/PaddleComponent";
import { PlayerComponent } from "./components/PlayerComponent";

export class Paddle extends GameEntity {
  constructor(
    game: Game,
    paddleConfig: IPaddleConfig,
    paddleLocation: IPaddleLocationConfig,
    playerConfig: IPlayerConfig
  ) {
    super(game);

    const { width, height, density, colour } = paddleConfig;
    const { playerId } = playerConfig;
    this.addComponent<PaddleComponent>("paddle", new PaddleComponent());
    this.addComponent<PlayerComponent>("player", new PlayerComponent(playerId));
    addPhysicsComponentAndMatterBody(
      this,
      Matter.Bodies.rectangle(
        paddleLocation.initialPosition.x,
        paddleLocation.initialPosition.y,
        width * this.game.session.gameConfig.gameScale,
        height * this.game.session.gameConfig.gameScale,
        {
          label:
            "Paddle: " + playerId + " " + paddleLocation.initialPosition.x + "," + paddleLocation.initialPosition.y,
          friction: 0,
          frictionStatic: 0,
          density,
          restitution: 1,
          inertia: Infinity, // Prevent rotation from physics interactions
          collisionFilter: {
            mask: CollisionCategory.wall | CollisionCategory.ball | CollisionCategory.paddleRestraint,
            category: CollisionCategory.paddle,
          },
          render: {
            fillStyle: colour,
          },
        }
      )
    );
  }
}
