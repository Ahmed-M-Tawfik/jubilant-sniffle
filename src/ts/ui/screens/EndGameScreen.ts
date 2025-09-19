import { StartGameButton } from "../buttons/MainMenuButtons";
import { GameScreen } from "./GameScreen";

export class EndGameScreen extends GameScreen {
  backToMainMenuBtn: StartGameButton | undefined;

  override onEnter(): void {
    this.backToMainMenuBtn = new StartGameButton(
      this.game,
      "backToMainMenu",
      "Back to Main Menu",
      this.userInterfaceConfig.screen.width * 0.5,
      this.userInterfaceConfig.screen.height * 0.65,
      () => {
        this.game._changeState(this.game.states.mainMenu);
      }
    );
  }

  override onExit(): void {
    this.backToMainMenuBtn?.remove();
  }

  override drawBackground(context: CanvasRenderingContext2D): void {}
  override drawForeground(context: CanvasRenderingContext2D): void {
    let scores: [number, number] = this.game.session.scorePerPlayer;
    let winner: number = scores[0] > scores[1] ? 1 : 2;

    context.save();
    context.textAlign = "center";
    context.font = `${this.userInterfaceConfig.fonts.mainButtons.fontSize * 2}px ${
      this.userInterfaceConfig.fonts.mainButtons.fontFamily
    }`;
    context.fillText(
      `Player ${winner} wins!`,
      this.userInterfaceConfig.screen.width * 0.5,
      this.userInterfaceConfig.screen.height * 0.5 - 20
    );
    context.font = `${this.userInterfaceConfig.fonts.mainButtons.fontSize * 0.7}px ${
      this.userInterfaceConfig.fonts.mainButtons.fontFamily
    }`;
    context.fillText(
      `Player ${winner} score: ${scores[winner - 1]}`,
      this.userInterfaceConfig.screen.width * 0.5,
      this.userInterfaceConfig.screen.height * 0.5 + 20
    );
    context.fillText(
      `Player ${(winner % 2) + 1} score: ${scores[winner % 2]}`,
      this.userInterfaceConfig.screen.width * 0.5,
      this.userInterfaceConfig.screen.height * 0.5 + 50
    );

    this.backToMainMenuBtn?.draw(context, this.userInterfaceConfig);

    context.restore();
  }
}
