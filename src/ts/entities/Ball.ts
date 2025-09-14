import type { IBallConfig } from "../ConfigTypes";
import type { Game } from "../../ts/Main";
import { BallComponent } from "./components/BallComponent";
import { PhysicsRenderComponent } from "./components/PhysicsRenderComponent";
import { GameEntity } from "./GameEntity";
import { addPhysicsComponentAndMatterBody } from "../utils/entityUtils";
import Matter from "matter-js";
import { GAME_CONFIG } from "../data/GameConfig";

export class Ball extends GameEntity {
  constructor(game: Game, ballConfig: IBallConfig, initialPosition: { x: number; y: number }) {
    super(game);

    const { radius, density, colour } = ballConfig;
    this.addComponent<BallComponent>("ball", new BallComponent());
    addPhysicsComponentAndMatterBody(
      this,
      Matter.Bodies.circle(initialPosition.x, initialPosition.y, radius * GAME_CONFIG.gameScale, {
        density,
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
      })
    );
    this.addComponent<PhysicsRenderComponent>("physicsrender", new PhysicsRenderComponent(colour, "circle"));
  }
}
