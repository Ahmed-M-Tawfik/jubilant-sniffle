import { Button } from "../components/buttons/Button";
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
      this.game.session.reset();
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
          fontSizeMultiplier: 2,
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
        this.userInterfaceConfig.screen.height * 0.1,
        {
          fontSizeMultiplier: 1.5,
          fontFamily: this.userInterfaceConfig.fonts.mainButtons.fontFamily,
          color: this.userInterfaceConfig.colours.primaryText,
          textAlign: "center",
        }
      )
    );

    // nav buttons
    this.buttons.push(
      new Button(
        this.game,
        "Back",
        this.userInterfaceConfig.screen.width * 0.1,
        this.userInterfaceConfig.screen.height * 0.07,
        this.userInterfaceConfig.screen.width * 0.13,
        this.userInterfaceConfig.screen.height * 0.09,
        () => {
          this.changeState("mainMenu");
        }
      )
    );

    this.buttons.push(
      new Button(
        this.game,
        "Start Game",
        this.userInterfaceConfig.screen.width * 0.5,
        this.userInterfaceConfig.screen.height * 0.9,
        this.userInterfaceConfig.screen.width * 0.3,
        this.userInterfaceConfig.screen.height * 0.1,
        () => {
          this.game._changeState(this.game.states.playing);
        }
      )
    );

    this.createPlayerOptionsUI(0, -0.3);
    this.createPlayerOptionsUI(1, 0.3);
  }

  private createPlayerOptionsUI(playerIndex: number, horizontalOffset: number): void {
    const playerGameConfig = this.game.session.gameConfig.gameplay.players[playerIndex === 0 ? "player0" : "player1"];

    this.text.push(
      new Text(
        "Player " + (playerIndex + 1) + " options",
        this.userInterfaceConfig.screen.width * (0.5 + horizontalOffset),
        this.userInterfaceConfig.screen.height * 0.2,
        {
          color: this.userInterfaceConfig.colours.primaryText,
          textAlign: "center",
        }
      )
    );

    this.text.push(
      new Text(
        "Paddle type",
        this.userInterfaceConfig.screen.width * (0.5 + horizontalOffset),
        this.userInterfaceConfig.screen.height * 0.27,
        {
          fontSizeMultiplier: 0.8,
          color: this.userInterfaceConfig.colours.primaryText,
          textAlign: "center",
        }
      )
    );

    const btnFontSizeMultiplier = 0.5;
    let normalButton = new Button(
      this.game,
      "Normal",
      this.userInterfaceConfig.screen.width * (0.5 + horizontalOffset - 0.075),
      this.userInterfaceConfig.screen.height * 0.32,
      this.userInterfaceConfig.screen.width * 0.08,
      this.userInterfaceConfig.screen.height * 0.05
    );
    normalButton.textOptions.fontSizeMultiplier = btnFontSizeMultiplier;
    normalButton.isHighlighted = playerGameConfig.selectedPaddle === "normal";
    this.buttons.push(normalButton);

    let fastButton = new Button(
      this.game,
      "Fast",
      this.userInterfaceConfig.screen.width * (0.5 + horizontalOffset),
      this.userInterfaceConfig.screen.height * 0.32,
      this.userInterfaceConfig.screen.width * 0.06,
      this.userInterfaceConfig.screen.height * 0.05
    );
    fastButton.textOptions.fontSizeMultiplier = btnFontSizeMultiplier;
    fastButton.isHighlighted = playerGameConfig.selectedPaddle === "fast";
    this.buttons.push(fastButton);

    let wideButton = new Button(
      this.game,
      "Wide",
      this.userInterfaceConfig.screen.width * (0.5 + horizontalOffset + 0.065),
      this.userInterfaceConfig.screen.height * 0.32,
      this.userInterfaceConfig.screen.width * 0.06,
      this.userInterfaceConfig.screen.height * 0.05
    );
    wideButton.textOptions.fontSizeMultiplier = btnFontSizeMultiplier;
    wideButton.isHighlighted = playerGameConfig.selectedPaddle === "wide";
    this.buttons.push(wideButton);

    normalButton.onClick = () => {
      playerGameConfig.selectedPaddle = "normal";
      wideButton.isHighlighted = false;
      fastButton.isHighlighted = false;
      normalButton.isHighlighted = true;
    };
    fastButton.onClick = () => {
      playerGameConfig.selectedPaddle = "fast";
      wideButton.isHighlighted = false;
      fastButton.isHighlighted = true;
      normalButton.isHighlighted = false;
    };
    wideButton.onClick = () => {
      playerGameConfig.selectedPaddle = "wide";
      wideButton.isHighlighted = true;
      fastButton.isHighlighted = false;
      normalButton.isHighlighted = false;
    };
  }

  override drawBackground(context: CanvasRenderingContext2D): void {
    context.save();
    context.fillStyle = this.screenBackground.backgroundColour;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();
  }

  override drawForeground(context: CanvasRenderingContext2D): void {
    context.save();

    this.text.forEach((text) => text.draw(context, this.userInterfaceConfig));

    this.buttons.forEach((button) => button.draw(context, this.userInterfaceConfig));

    context.restore();
  }
}
