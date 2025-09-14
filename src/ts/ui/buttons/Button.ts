import type { Game } from "../../../ts/Main";
import type { IUserInterfaceConfig } from "../UserInterfaceConfigTypes";

export class Button {
  constructor(
    public game: Game,
    public name: string,
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public onClick: () => void,
    public onDraw: (context: CanvasRenderingContext2D, userInterfaceConfig: IUserInterfaceConfig) => void
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
}
