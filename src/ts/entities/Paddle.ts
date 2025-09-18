import Matter from "matter-js";
import { type Game } from "../../ts/Main";
import type { IPaddleConfig, IPaddleLocationConfig, IPlayerConfig } from "../ConfigTypes";
import { GAME_CONFIG } from "../data/GameConfig";
import { addPhysicsComponentAndMatterBody } from "../utils/entityUtils";
import { GameEntity } from "./GameEntity";
import { PaddleComponent } from "./components/PaddleComponent";
import { PhysicsRenderComponent } from "./components/PhysicsRenderComponent";
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
        width * GAME_CONFIG.gameScale,
        height * GAME_CONFIG.gameScale,
        {
          density,
          restitution: 1,
          inertia: Infinity, // Prevent rotation from physics interactions
        }
      )
    );
    this.addComponent<PhysicsRenderComponent>("physicsrender", new PhysicsRenderComponent(colour, "rectangle"));
  }
}
