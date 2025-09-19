import { GameScreen } from "./GameScreen";

export class PlayingScreen extends GameScreen {
  override onEnter(): void {}
  override onExit(): void {}
  drawBackground(context: CanvasRenderingContext2D): void {
    context.save();
    context.fillStyle = "black";
    context.fillRect(0, 0, this.userInterfaceConfig.screen.width, this.userInterfaceConfig.screen.height);
    context.restore();
  }
  drawForeground(context: CanvasRenderingContext2D): void {
    context.save();
    context.fillStyle = "white";
    context.font = "24px Arial";
    context.fillText(`${this.game.session.scorePerPlayer[1]}`, 10, context.canvas.height / 2 - 30);
    context.fillText(`${(this.game.session.time * 0.001).toFixed(2)}`, 10, context.canvas.height / 2);
    context.fillText(`${this.game.session.scorePerPlayer[0]}`, 10, context.canvas.height / 2 + 30);
    context.restore();
  }
}
