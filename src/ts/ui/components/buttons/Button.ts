import type { Game } from "../../../Main";
import { getCenteredCoordFromTopLeftCoord, getTopLeftCoordFromCenteredCoord } from "../../uiUtils";
import type { IUserInterfaceConfig } from "../../UserInterfaceConfigTypes";
import type { TextOptions } from "../Text";

export class Button {
  public isHighlighted: boolean = false;

  public textOptions: TextOptions = {};

  constructor(
    public game: Game,
    public name: string,
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public onClick: () => void = () => {},
    public onDraw: (context: CanvasRenderingContext2D, userInterfaceConfig: IUserInterfaceConfig) => void = this
      .defaultDraw
  ) {
    this.game.input.addButton(this);
  }

  remove() {
    this.game.input.removeButton(this);
  }

  draw(context: CanvasRenderingContext2D, userInterfaceConfig: IUserInterfaceConfig): void {
    context.save();
    this.onDraw(context, userInterfaceConfig);
    context.restore();
  }

  protected defaultDraw(context: CanvasRenderingContext2D, userInterfaceConfig: IUserInterfaceConfig) {
    context.save();

    const { x: buttonX, y: buttonY } = getTopLeftCoordFromCenteredCoord(this.x, this.y, this.width, this.height);

    // bg fill
    {
      if (this.isHighlighted) {
        context.fillStyle = userInterfaceConfig.colours.warning;
      } else {
        context.fillStyle = userInterfaceConfig.colours.secondaryBackground;
      }
      context.fillRect(buttonX, buttonY, this.width, this.height);
    }

    // text
    {
      const fontFamily = this.textOptions.fontFamily ?? userInterfaceConfig.fonts.mainButtons.fontFamily;
      const fontSizeMultiplier = this.textOptions.fontSizeMultiplier ?? 1;
      if (this.textOptions.fontSizeUnscaled) {
        context.font = `${this.textOptions.fontSizeUnscaled} ${fontFamily}`;
      } else {
        context.font = `${userInterfaceConfig.fonts.mainButtons.fontSize * fontSizeMultiplier}px ${fontFamily}`;
      }

      context.fillStyle = userInterfaceConfig.colours.primaryText;
      this.textOptions?.color && (context.fillStyle = this.textOptions.color);
      context.textAlign = "center";
      this.textOptions?.textAlign && (context.textAlign = this.textOptions.textAlign);
      context.textBaseline = "middle";
      this.textOptions?.textBaseline && (context.textBaseline = this.textOptions.textBaseline);

      const { x: textX, y: textY } = getCenteredCoordFromTopLeftCoord(buttonX, buttonY, this.width, this.height);
      context.fillText(this.name, textX, textY);
    }

    context.restore();
  }
}

export class ToggleButton extends Button {
  private isToggled: boolean = false;
  constructor(...args: ConstructorParameters<typeof Button>) {
    super(...args);
    // Optionally override onClick to toggle state
    const originalOnClick = this.onClick;
    this.onClick = () => {
      this.isToggled = !this.isToggled;
      originalOnClick();
    };
  }
}
