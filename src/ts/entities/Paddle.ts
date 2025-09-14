import Matter from "matter-js";
import { type Game } from "../../ts/Main";
import type { IPaddleConfig } from "../ConfigTypes";
import { addPhysicsComponentAndMatterBody } from "../utils/entityUtils";
import { GameEntity } from "./GameEntity";
import { PaddleComponent } from "./components/PaddleComponent";
import { PhysicsRenderComponent } from "./components/PhysicsRenderComponent";
import { PlayerComponent } from "./components/PlayerComponent";
import { GAME_CONFIG } from "../data/GameConfig";

export class Paddle extends GameEntity {
  constructor(game: Game, paddleConfig: IPaddleConfig, playerId: "1" | "2") {
    super(game);

    const { width, height, density, colour } = paddleConfig;
    this.addComponent<PaddleComponent>("paddle", new PaddleComponent());
    this.addComponent<PlayerComponent>("player", new PlayerComponent(playerId));
    addPhysicsComponentAndMatterBody(
      this,
      Matter.Bodies.rectangle(0, 0, width * GAME_CONFIG.gameScale, height * GAME_CONFIG.gameScale, {
        density,
        restitution: 1,
      })
    );
    this.addComponent<PhysicsRenderComponent>("physicsrender", new PhysicsRenderComponent(colour, "rectangle"));
  }
}
