import { GAME_CONFIG } from "../data/GameConfig.js";
import { Ball } from "../entities/Ball.js";
import { PhysicsComponent } from "../entities/components/PhysicsComponent.js";
import { PhysicsRenderSystem } from "../systems/PhysicsRenderSystem.js";
import { PhysicsSystem } from "../systems/PhysicsSystem.js";
import { GameState } from "./GameStates.js";

export class PlayingState extends GameState {
  subState: "active" | "paused" = "active";

  boardCenterPos = { x: 400, y: 300 };
  player1StartCenterPos = { x: this.boardCenterPos.x, y: 100 };
  player2StartCenterPos = { x: this.boardCenterPos.x, y: 500 };
  ballStartVelocity = { x: 0, y: 5 };

  override enter(): void {
    this.subState = "active";

    let ball = new Ball(this.game, GAME_CONFIG.ballTypes.fast, this.boardCenterPos);
    ball.getComponent<PhysicsComponent>("physics")!.velocity = this.ballStartVelocity;
    this.game.session.entities.push(ball);

    this.game.session.players.player1.getComponent<PhysicsComponent>("physics")!.position = this.player1StartCenterPos;
    this.game.session.players.player2.getComponent<PhysicsComponent>("physics")!.position = this.player2StartCenterPos;
  }

  override exit(): void {
    // Clear all input actions to prevent stuck keys when leaving playing state
    this.game.input.actions.clear();
  }

  override update(deltaTime: number): void {
    if (this.subState === "paused") return;

    this.game.session.time += deltaTime;

    this.evaluateEndGameCondition();

    this.runUpdates(deltaTime);
  }

  runUpdates(deltaTime: number): void {
    if (this.subState === "paused") {
      return;
    }

    PhysicsSystem.update(this.game, this.game.session.entities, deltaTime);
  }

  evaluateEndGameCondition(): void {}

  override draw(context: CanvasRenderingContext2D, deltaTime: number): void {
    this.game.userInterface.drawBackground(context);

    PhysicsRenderSystem.draw(this.game, context, this.game.session.entities);

    // UI updates at the end to ensure they are drawn on top
    this.game.userInterface.drawForeground(context);
  }

  override handleInput(event: KeyboardEvent): void {
    const pauseKeyBinding = this.game.input.keyBindings.actionToKey["pause"];
    if (!pauseKeyBinding) throw new Error("Pause key binding is not defined");

    if (event.key === pauseKeyBinding.key) {
      if (this.subState === "active") {
        this.subState = "paused";
      } else if (this.subState === "paused") {
        this.subState = "active";
      }
    }
  }
}
