import { type Game } from "../../Main.js";
import type { IUserInterfaceConfig } from "../UserInterfaceConfigTypes.js";
import { Button } from "./Button.js";

export class StartGameButton extends Button {
  constructor(game: Game, name: string, text: string, x: number, y: number, onClick: () => void) {
    const buttonWidth = game.width * 0.5;
    const buttonHeight = game.height * 0.08;
    super(
      game,
      name,
      x,
      y,
      buttonWidth,
      buttonHeight,
      onClick,
      (context: CanvasRenderingContext2D, userInterfaceConfig: IUserInterfaceConfig): void => {
        context.save();
        context.font = `${userInterfaceConfig.fonts.mainButtons.fontSize}px ${userInterfaceConfig.fonts.mainButtons.fontFamily}`;
        context.fillStyle = userInterfaceConfig.colours.secondaryBackground;
        const buttonX = x - buttonWidth / 2;
        const buttonY = y - buttonHeight / 2;
        context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

        context.fillStyle = userInterfaceConfig.colours.secondaryText;
        context.textAlign = "center";
        context.textBaseline = "middle";

        const textX = buttonX + buttonWidth / 2;
        const textY = buttonY + buttonHeight / 2;
        context.fillText(text, textX, textY);
        context.restore();
      }
    );
  }
}
