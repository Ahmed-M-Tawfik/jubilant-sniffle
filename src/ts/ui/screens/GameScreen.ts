import type { Game } from "../../../ts/Main";
import type { IUserInterfaceConfig } from "../UserInterfaceConfigTypes";

export abstract class GameScreen {
  constructor(public game: Game, public userInterfaceConfig: IUserInterfaceConfig) {}

  abstract drawBackground(context: CanvasRenderingContext2D): void;
  abstract drawForeground(context: CanvasRenderingContext2D): void;
  abstract onEnter(): void;
  abstract onExit(): void;
}
