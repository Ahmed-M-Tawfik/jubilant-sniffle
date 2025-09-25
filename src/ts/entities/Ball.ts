import Matter from "matter-js";
import type { Game } from "../../ts/Main";
import type { IBallConfig } from "../ConfigTypes";
import { CollisionCategory } from "../systems/PhysicsSystem";
import { addPhysicsComponentAndMatterBody } from "../utils/entityUtils";
import { BallComponent } from "./components/BallComponent";
import { GameEntity } from "./GameEntity";

export class Ball extends GameEntity {
  constructor(game: Game, ballConfig: IBallConfig, initialPosition: { x: number; y: number }) {
    super(game);

    const { radius, density, colour } = ballConfig;
    this.addComponent<BallComponent>("ball", new BallComponent());
    addPhysicsComponentAndMatterBody(
      this,
      Matter.Bodies.circle(initialPosition.x, initialPosition.y, radius * this.game.session.gameConfig.gameScale, {
        label: "Ball",
        density,
        restitution: 1,
        frictionAir: 0,
        frictionStatic: 0,
        collisionFilter: {
          mask: CollisionCategory.wall | CollisionCategory.paddle,
          category: CollisionCategory.ball,
        },
        render: {
          fillStyle: colour,
        },
      })
    );
  }
}
