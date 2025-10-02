import { type Game } from "../../../../ts/Main";
import { getCenteredCoordFromTopLeftCoord, getTopLeftCoordFromCenteredCoord } from "../../uiUtils";
import type { IUserInterfaceConfig } from "../../UserInterfaceConfigTypes";
import { Button } from "./Button";

/**
 * Creates a large button centered at (x, y) with width 50% of game width and height 8% of game height.
 * The button displays the provided text and triggers the onClick callback when clicked.
 */
export class LargeButton extends Button {
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
        const { x: buttonX, y: buttonY } = getTopLeftCoordFromCenteredCoord(x, y, buttonWidth, buttonHeight);
        context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

        context.fillStyle = userInterfaceConfig.colours.secondaryText;
        context.textAlign = "center";
        context.textBaseline = "middle";

        const { x: textX, y: textY } = getCenteredCoordFromTopLeftCoord(buttonX, buttonY, buttonWidth, buttonHeight);
        context.fillText(text, textX, textY);
        context.restore();
      }
    );
  }
}
