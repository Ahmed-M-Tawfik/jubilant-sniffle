import { USER_INTERFACE_CONFIG } from "./data/ui/UserInterfaceConfig.js";
import type { Game } from "./Main.js";
import type { GameState } from "./states/GameStates.js";
import { EndGameScreen } from "./ui/screens/EndGameScreen.js";
import type { GameScreen } from "./ui/screens/GameScreen.js";
import { MainMenuScreen } from "./ui/screens/MainMenuScreen.js";
import { PlayingScreen } from "./ui/screens/PlayingScreen.js";
import type { IUserInterfaceConfig } from "./ui/UserInterfaceConfigTypes.js";

export class UserInterface {
  game: Game;
  gameStateToScreen: Map<GameState, GameScreen>;
  userInterfaceConfig: IUserInterfaceConfig = USER_INTERFACE_CONFIG;

  constructor(game: Game) {
    this.game = game;
    this.gameStateToScreen = new Map([
      [game.states.mainMenu, new MainMenuScreen(game, this.userInterfaceConfig)],
      [game.states.playing, new PlayingScreen(game, this.userInterfaceConfig)],
      [game.states.endGame, new EndGameScreen(game, this.userInterfaceConfig)],
    ]);
  }

  onExitState(exitedState: GameState) {
    this.gameStateToScreen.get(exitedState)?.onExit();
  }
  onEnterState(enteredState: GameState) {
    this.gameStateToScreen.get(enteredState)?.onEnter();
  }

  drawBackground(context: CanvasRenderingContext2D): void {
    context.save();
    this.gameStateToScreen.get(this.game.state)!.drawBackground(context);
    context.restore();
  }

  drawForeground(context: CanvasRenderingContext2D): void {
    context.save();
    this.gameStateToScreen.get(this.game.state)!.drawForeground(context);
    context.restore();
  }
}
