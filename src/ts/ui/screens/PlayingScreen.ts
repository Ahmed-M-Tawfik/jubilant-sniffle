import { GameScreen } from "./GameScreen";

export class PlayingScreen extends GameScreen {
  override onEnter(): void {
    console.log("Entered PlayingScreen");
  }
  override onExit(): void {
    console.log("Exited PlayingScreen");
  }
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
    context.fillText(`Time: ${(this.game.session.time * 0.001).toFixed(2)}`, 10, 30);
    context.restore();
  }
}
