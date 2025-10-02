import type { Button } from "../components/buttons/Button";
import { LargeButton } from "../components/buttons/MainMenuButtons";
import { ScreenBackground } from "../components/ScreenBackground";
import { Text } from "../components/Text";
import { GameScreen } from "./GameScreen";

type ScreenState = "mainMenu" | "customGameMenu";

export class MainMenuScreen extends GameScreen {
  buttons: Button[] = [];
  screenBackground!: ScreenBackground;
  text: Text[] = [];

  screenState: ScreenState = "mainMenu";

  override onEnter(): void {
    this.changeState("mainMenu");
  }

  override onExit(): void {
    this.clearScreen();
  }

  clearScreen(): void {
    this.buttons.forEach((button) => button.remove());
    this.buttons = [];
    this.text = [];
  }

  changeState(newState: ScreenState): void {
    this.clearScreen();

    this.screenState = newState;

    if (newState === "mainMenu") {
      this.setupMainMenuScreen();
    } else {
      this.setupConfigMenuScreen();
    }
  }

  setupMainMenuScreen(): void {
    this.screenBackground = new ScreenBackground(this.userInterfaceConfig.colours.primaryBackground);

    this.buttons.push(
      new LargeButton(
        this.game,
        "startGame",
        "Quick Game (2P)",
        this.userInterfaceConfig.screen.width * 0.5,
        this.userInterfaceConfig.screen.height * 0.65,
        () => {
          this.game._changeState(this.game.states.playing);
        }
      )
    );
    this.buttons.push(
      new LargeButton(
        this.game,
        "startGame",
        "Quick Game (vs AI)",
        this.userInterfaceConfig.screen.width * 0.5,
        this.userInterfaceConfig.screen.height * 0.75,
        () => {
          this.game._changeState(this.game.states.playing);
        }
      )
    );
    this.buttons.push(
      new LargeButton(
        this.game,
        "startGame",
        "Custom Game",
        this.userInterfaceConfig.screen.width * 0.5,
        this.userInterfaceConfig.screen.height * 0.85,
        () => {
          this.changeState("customGameMenu");
        }
      )
    );

    this.text.push(
      new Text(
        "Play PONG!",
        this.userInterfaceConfig.screen.width * 0.5,
        this.userInterfaceConfig.screen.height * 0.5 - 20,
        {
          font:
            this.userInterfaceConfig.fonts.mainButtons.fontSize * 2 +
            "px " +
            this.userInterfaceConfig.fonts.mainButtons.fontFamily,
          color: this.userInterfaceConfig.colours.primaryText,
          textAlign: "center",
        }
      )
    );
  }

  setupConfigMenuScreen(): void {
    this.screenBackground = new ScreenBackground(this.userInterfaceConfig.colours.secondaryBackground);

    this.text.push(
      new Text(
        "Custom Game",
        this.userInterfaceConfig.screen.width * 0.5,
        this.userInterfaceConfig.screen.height * 0.2,
        {
          font:
            this.userInterfaceConfig.fonts.mainButtons.fontSize * 1.5 +
            "px " +
            this.userInterfaceConfig.fonts.mainButtons.fontFamily,
          color: this.userInterfaceConfig.colours.primaryText,
          textAlign: "center",
        }
      )
    );
  }

  override drawBackground(context: CanvasRenderingContext2D): void {
    context.save();
    context.fillStyle = this.screenBackground.backgroundColour;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();
  }

  override drawForeground(context: CanvasRenderingContext2D): void {
    context.save();

    this.text.forEach((text) => text.draw(context));

    this.buttons.forEach((button) => button.draw(context, this.userInterfaceConfig));

    context.restore();
  }
}
