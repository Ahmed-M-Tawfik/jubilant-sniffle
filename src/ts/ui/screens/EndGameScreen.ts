import { GameScreen } from "./GameScreen";

export class EndGameScreen extends GameScreen {
  override onEnter(): void {
    // Reset any end game state, show end game UI, etc.
    // For example, you might want to stop game timers, play a sound, or show a dialog.
    // Here is a simple implementation:
    console.log("Entered EndGameScreen");
    // Optionally, you could add more logic here as needed.
  }

  override onExit(): void {
    // Clean up end game UI, reset variables, etc.
    console.log("Exited EndGameScreen");
    // Optionally, you could add more logic here as needed.
  }
  override drawBackground(context: CanvasRenderingContext2D): void {}
  override drawForeground(context: CanvasRenderingContext2D): void {
    context.save();
    context.textAlign = "center";
    context.font = `${this.userInterfaceConfig.fonts.mainButtons.fontSize * 2}px ${
      this.userInterfaceConfig.fonts.mainButtons.fontFamily
    }`;
    context.fillText(
      "Love at first bite?",
      this.userInterfaceConfig.screen.width * 0.5,
      this.userInterfaceConfig.screen.height * 0.5 - 20
    );
    context.font = `${this.userInterfaceConfig.fonts.mainButtons.fontSize * 0.7}px ${
      this.userInterfaceConfig.fonts.mainButtons.fontFamily
    }`;
    context.fillText(
      "You fought bravely,",
      this.userInterfaceConfig.screen.width * 0.5,
      this.userInterfaceConfig.screen.height * 0.5 + 20
    );
    context.fillText(
      "but the night is dark and full of terrors.",
      this.userInterfaceConfig.screen.width * 0.5,
      this.userInterfaceConfig.screen.height * 0.5 + 50
    );
    context.restore();
  }
}
