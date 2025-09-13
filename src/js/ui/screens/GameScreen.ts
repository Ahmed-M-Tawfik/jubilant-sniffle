import type { Game } from "../../Main.js";
import type { IUserInterfaceConfig } from "../UserInterfaceConfigTypes.js";

export abstract class GameScreen {
  constructor(public game: Game, public userInterfaceConfig: IUserInterfaceConfig) {}

  abstract drawBackground(context: CanvasRenderingContext2D): void;
  abstract drawForeground(context: CanvasRenderingContext2D): void;
  abstract onEnter(): void;
  abstract onExit(): void;
}
