import type { IBallConfig } from "../ConfigTypes.js";
import type { Game } from "../Main.js";
import { BallComponent } from "./components/BallComponent.js";
import { PhysicsComponent } from "./components/PhysicsComponent.js";
import { PhysicsRenderComponent } from "./components/PhysicsRenderComponent.js";
import { GameEntity } from "./GameEntity.js";

export class Ball extends GameEntity {
  constructor(game: Game, ballConfig: IBallConfig, initialPosition: { x: number; y: number }) {
    super(game);

    const { width, height, mass, colour } = ballConfig;
    this.addComponent<BallComponent>("ball", new BallComponent());
    this.addComponent<PhysicsComponent>(
      "physics",
      new PhysicsComponent(mass, { width: width, height: height }, initialPosition, { x: 0, y: 0 })
    );
    this.addComponent<PhysicsRenderComponent>("physicsrender", new PhysicsRenderComponent(colour, "circle"));
  }
}
