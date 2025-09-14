import { USER_INTERFACE_CONFIG } from "./data/ui/UserInterfaceConfig";
import type { Game } from "../ts/Main";
import type { GameState } from "./states/GameStates";
import { EndGameScreen } from "./ui/screens/EndGameScreen";
import type { GameScreen } from "./ui/screens/GameScreen";
import { MainMenuScreen } from "./ui/screens/MainMenuScreen";
import { PlayingScreen } from "./ui/screens/PlayingScreen";
import type { IUserInterfaceConfig } from "./ui/UserInterfaceConfigTypes";

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
