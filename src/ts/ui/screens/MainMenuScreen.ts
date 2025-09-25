import { StartGameButton } from "../buttons/MainMenuButtons";
import { GameScreen } from "./GameScreen";

export class MainMenuScreen extends GameScreen {
  quickGameBtn: StartGameButton | undefined;
  quickGameAiBtn: StartGameButton | undefined;
  customGameBtn: StartGameButton | undefined;

  override onEnter(): void {
    this.quickGameBtn = new StartGameButton(
      this.game,
      "startGame",
      "Quick Game (2P)",
      this.userInterfaceConfig.screen.width * 0.5,
      this.userInterfaceConfig.screen.height * 0.65,
      () => {
        this.game._changeState(this.game.states.playing);
      }
    );
    this.quickGameAiBtn = new StartGameButton(
      this.game,
      "startGame",
      "Quick Game (vs AI)",
      this.userInterfaceConfig.screen.width * 0.5,
      this.userInterfaceConfig.screen.height * 0.75,
      () => {
        this.game._changeState(this.game.states.playing);
      }
    );
    this.customGameBtn = new StartGameButton(
      this.game,
      "startGame",
      "Custom Game",
      this.userInterfaceConfig.screen.width * 0.5,
      this.userInterfaceConfig.screen.height * 0.85,
      () => {
        this.game._changeState(this.game.states.playing);
      }
    );
  }

  override onExit(): void {
    this.quickGameBtn?.remove();
    this.quickGameAiBtn?.remove();
    this.customGameBtn?.remove();
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

    this.quickGameBtn?.draw(context, this.userInterfaceConfig);
    this.quickGameAiBtn?.draw(context, this.userInterfaceConfig);
    this.customGameBtn?.draw(context, this.userInterfaceConfig);

    context.restore();
  }
}
