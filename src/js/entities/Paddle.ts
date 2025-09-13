import { type Game } from "../Main.js";
import type { IPaddleConfig } from "../ConfigTypes.js";
import { GameEntity } from "./GameEntity.js";
import { PhysicsComponent } from "./components/PhysicsComponent.js";
import { PhysicsRenderComponent } from "./components/PhysicsRenderComponent.js";
import { PlayerComponent } from "./components/PlayerComponent.js";
import { PaddleComponent } from "./components/PaddleComponent.js";

export class Paddle extends GameEntity {
  constructor(game: Game, paddleConfig: IPaddleConfig, playerId: "1" | "2") {
    super(game);

    const { width, height, mass, colour } = paddleConfig;
    this.addComponent<PaddleComponent>("paddle", new PaddleComponent());
    this.addComponent<PlayerComponent>("player", new PlayerComponent(playerId));
    this.addComponent<PhysicsComponent>(
      "physics",
      new PhysicsComponent(mass, { width: width, height: height }, { x: 0, y: 0 }, { x: 0, y: 0 })
    );
    this.addComponent<PhysicsRenderComponent>("physicsrender", new PhysicsRenderComponent(colour, "rectangle"));
  }
}
