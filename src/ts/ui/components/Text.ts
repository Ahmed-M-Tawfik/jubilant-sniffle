export interface TextOptions {
  font?: string;
  color?: string;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
}

export class Text {
  content: string;
  centerXPos: number;
  centerYPos: number;
  font: string;
  color: string;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;

  constructor(content: string, centerXPos: number, centerYPos: number, options: TextOptions = {}) {
    this.content = content;
    this.centerXPos = centerXPos;
    this.centerYPos = centerYPos;
    this.font = options.font ?? "16px sans-serif";
    this.color = options.color ?? "#000";
    this.textAlign = options.textAlign ?? "left";
    this.textBaseline = options.textBaseline ?? "alphabetic";
  }

  draw(context: CanvasRenderingContext2D): void {
    context.save();

    context.fillStyle = this.color;
    context.font = this.font;
    context.textAlign = this.textAlign;
    context.textBaseline = this.textBaseline;
    context.fillText(this.content, this.centerXPos, this.centerYPos);

    context.restore();
  }
}
