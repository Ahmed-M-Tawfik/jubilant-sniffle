import { StartGameButton } from "../buttons/MainMenuButtons";
import { GameScreen } from "./GameScreen";

export class MainMenuScreen extends GameScreen {
  startGameVsAiBtn: StartGameButton | undefined;
  startGameVs2ndPlayerBtn: StartGameButton | undefined;

  override onEnter(): void {
    this.startGameVsAiBtn = new StartGameButton(
      this.game,
      "startGame",
      "Start Game (vs AI)",
      this.userInterfaceConfig.screen.width * 0.5,
      this.userInterfaceConfig.screen.height * 0.65,
      () => {
        this.game._changeState(this.game.states.playing);
      }
    );
    this.startGameVs2ndPlayerBtn = new StartGameButton(
      this.game,
      "startGame",
      "Start Game (vs 2nd player)",
      this.userInterfaceConfig.screen.width * 0.5,
      this.userInterfaceConfig.screen.height * 0.75,
      () => {
        this.game._changeState(this.game.states.playing);
      }
    );
  }

  override onExit(): void {
    this.startGameVsAiBtn?.remove();
    this.startGameVs2ndPlayerBtn?.remove();
  }

  override drawForeground(context: CanvasRenderingContext2D): void {
    context.save();
    context.fillStyle = this.userInterfaceConfig.colours.primaryBackground;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    context.fillStyle = this.userInterfaceConfig.colours.primaryText;
    context.textAlign = "center";
    context.font =
      this.userInterfaceConfig.fonts.mainButtons.fontSize * 2 +
      "px " +
      this.userInterfaceConfig.fonts.mainButtons.fontFamily;
    context.fillText(
      "Play PONG!",
      this.userInterfaceConfig.screen.width * 0.5,
      this.userInterfaceConfig.screen.height * 0.5 - 20
    );

    this.startGameVsAiBtn?.draw(context, this.userInterfaceConfig);
    this.startGameVs2ndPlayerBtn?.draw(context, this.userInterfaceConfig);

    context.restore();
  }
}
