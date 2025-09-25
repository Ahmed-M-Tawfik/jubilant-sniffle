import { GameState } from "./GameStates";

export class MainMenuState extends GameState {
  override draw(context: CanvasRenderingContext2D, deltaTime: number): void {
    this.game.userInterface.drawForeground(context);
  }
}
