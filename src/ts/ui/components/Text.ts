import type { IUserInterfaceConfig } from "../UserInterfaceConfigTypes";

export interface TextOptions {
  fontSizeMultiplier?: number; // e.g., 1.2 for 120%
  fontSizeUnscaled?: string; // e.g., "20px", "1.5em"
  fontFamily?: string; // e.g., "Arial", "sans-serif"
  color?: string;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
}

export class Text {
  constructor(
    public content: string,
    public centerXPos: number,
    public centerYPos: number,
    public textOptions: TextOptions = {}
  ) {}

  draw(context: CanvasRenderingContext2D, userInterfaceConfig: IUserInterfaceConfig): void {
    context.save();

    // Use userInterfaceConfig for defaults, allow override via textOptions
    const fontFamily = this.textOptions.fontFamily ?? userInterfaceConfig.fonts.mainButtons.fontFamily;
    const fontSizeMultiplier = this.textOptions.fontSizeMultiplier ?? 1;
    if (this.textOptions.fontSizeUnscaled) {
      context.font = `${this.textOptions.fontSizeUnscaled} ${fontFamily}`;
    } else {
      context.font = `${userInterfaceConfig.fonts.mainButtons.fontSize * fontSizeMultiplier}px ${fontFamily}`;
    }

    context.fillStyle = userInterfaceConfig.colours.primaryText;
    if (this.textOptions.color) context.fillStyle = this.textOptions.color;

    context.textAlign = "left";
    if (this.textOptions.textAlign) context.textAlign = this.textOptions.textAlign;

    context.textBaseline = "alphabetic";
    if (this.textOptions.textBaseline) context.textBaseline = this.textOptions.textBaseline;

    context.fillText(this.content, this.centerXPos, this.centerYPos);

    context.restore();
  }
}
