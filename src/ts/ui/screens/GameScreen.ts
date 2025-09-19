import type { Game } from "../../../ts/Main";
import type { IUserInterfaceConfig } from "../UserInterfaceConfigTypes";

export abstract class GameScreen {
  constructor(public game: Game, public userInterfaceConfig: IUserInterfaceConfig) {}

  drawBackground(context: CanvasRenderingContext2D): void {
    // placeholder so we don't get 'unused variable' error...
    context.save();
    context.restore();
  }
  drawForeground(context: CanvasRenderingContext2D): void {
    // placeholder so we don't get 'unused variable' error...
    context.save();
    context.restore();
  }
  onEnter(): void {}
  onExit(): void {}
}
