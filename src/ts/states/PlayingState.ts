import Matter, { Composite } from "matter-js";
import { Ball } from "../entities/Ball";
import { PhysicsComponent } from "../entities/components/PhysicsComponent";
import { PhysicsRenderSystem } from "../systems/PhysicsRenderSystem";
import { PhysicsSystem } from "../systems/PhysicsSystem";
import { GameState } from "./GameStates";
import { PlayerInteractionSystem } from "../systems/PlayerInteractionSystem";
import { Paddle } from "../entities/Paddle";
import { Board } from "../entities/Board";
import { ScoreSystem } from "../systems/ScoreSystem";
import { CheckGameEndSystem } from "../systems/CheckGameEndSystem";

export class PlayingState extends GameState {
  subState: "active" | "paused" = "active";

  boardCenterPos = { x: 400, y: 300 };
  paddle1StartCenterPos = { x: this.boardCenterPos.x, y: 100 };
  paddle2StartCenterPos = { x: this.boardCenterPos.x, y: 500 };
  ballStartVelocity = { x: 0, y: 5 };

  override enter(): void {
    let gameConfig = this.game.session.gameConfig;
    this.game.session.reset();

    this.subState = "active";
    this.game.session.winningScore = gameConfig.gameplay.level.winningScore;
    this.game.session.maxTime = gameConfig.gameplay.level.maxTime;

    let board = new Board(this.game, gameConfig.board, gameConfig.paddleLocations);
    this.game.session.entities.push(board);

    let ball = new Ball(this.game, gameConfig.ballTypes.fast, this.boardCenterPos);
    Matter.Body.setVelocity(ball.getComponent<PhysicsComponent>("physics")!.matterBody, this.ballStartVelocity);
    this.game.session.entities.push(ball);

    let paddle0 = new Paddle(
      this.game,
      gameConfig.paddleTypes[gameConfig.gameplay.players.player0.selectedPaddle],
      gameConfig.paddleLocations[gameConfig.gameplay.players.player0.selectedPosition],
      gameConfig.players[0]
    );
    Matter.Body.setPosition(paddle0.getComponent<PhysicsComponent>("physics")!.matterBody, this.paddle1StartCenterPos);
    this.game.session.entities.push(paddle0);

    let paddle1 = new Paddle(
      this.game,
      gameConfig.paddleTypes[gameConfig.gameplay.players.player1.selectedPaddle],
      gameConfig.paddleLocations[gameConfig.gameplay.players.player1.selectedPosition],
      gameConfig.players[1]
    );
    Matter.Body.setPosition(paddle1.getComponent<PhysicsComponent>("physics")!.matterBody, this.paddle2StartCenterPos);
    this.game.session.entities.push(paddle1);

    ScoreSystem.start(this.game);
  }

  override exit(): void {
    ScoreSystem.stop();

    // Clear all input actions to prevent stuck keys when leaving playing state
    this.game.input.actions.clear();

    PhysicsSystem.stop();
  }

  override update(deltaTime: number): void {
    if (this.subState === "paused") return;

    this.game.session.time += deltaTime;

    this.runUpdates(deltaTime);
  }

  runUpdates(deltaTime: number): void {
    if (this.subState === "paused") {
      return;
    }

    CheckGameEndSystem.update(this.game);

    PlayerInteractionSystem.update(this.game, this.game.session.entities);

    PhysicsSystem.update(deltaTime);
  }

  override draw(context: CanvasRenderingContext2D): void {
    this.game.userInterface.drawBackground(context);

    PhysicsRenderSystem.draw(context, Composite.allBodies(PhysicsSystem.world));

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
