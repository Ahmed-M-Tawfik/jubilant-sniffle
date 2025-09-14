import { UserInterface } from "./UserInterface";
import { DEFAULT_KEY_BINDINGS } from "./data/KeyBindingsData";
import { USER_INTERFACE_CONFIG } from "./data/ui/UserInterfaceConfig";
import { GameSession } from "./session/GameSession";
import { EndGameState, GameState, MainMenuState } from "./states/GameStates";
import { PlayingState } from "./states/PlayingState";
import { InputHandler } from "./ui/InputHandler";
import { KeyBindings } from "./ui/KeyBindings";

export class Game {
  width: number;
  height: number;
  gameSpeedScale: number = 60;
  debug: boolean;
  session: GameSession;
  input: InputHandler;
  userInterface: UserInterface;
  states: {
    playing: PlayingState;
    endGame: EndGameState;
    mainMenu: MainMenuState;
  };
  state!: GameState;

  constructor(width: number, height: number, context: CanvasRenderingContext2D) {
    this.width = width;
    this.height = height;

    this.debug = false;

    // State machine setup - change state only using changeState(state) method
    this.states = {
      playing: new PlayingState(this),
      endGame: new EndGameState(this),
      mainMenu: new MainMenuState(this),
    };

    this.session = new GameSession(this);
    this.input = new InputHandler(this, context.canvas, new KeyBindings(DEFAULT_KEY_BINDINGS));
    this.userInterface = new UserInterface(this);

    this.goToMainMenu();
  }
  update(deltaTime: number) {
    this.state.update(deltaTime);
  }
  draw(context: CanvasRenderingContext2D, deltaTime: number) {
    this.state.draw(context, deltaTime);
  }
  _changeState(newState: GameState) {
    this.userInterface.onExitState(this.state);
    this.state?.exit();
    this.state = newState;
    this.state.enter();
    this.userInterface.onEnterState(this.state);
  }

  _resetLevelStateAndStart() {
    this.session.reset();
    this._changeState(this.states.playing);
  }

  playAgain() {
    this._resetLevelStateAndStart();
  }
  endGame() {
    this._changeState(this.states.endGame);
  }
  goToMainMenu() {
    this._changeState(this.states.mainMenu);
  }

  handleDebugKeys(event: KeyboardEvent) {
    if (event.key === this.input.getKeyBinding(this.input.keyBindings.actionToKey, "debug_show_mouse_coords").key) {
      // print location of mouse on canvas
      console.log(`Mouse position: ${this.input.debugMousePosTracking.x}, ${this.input.debugMousePosTracking.y}`);
    }
  }
}

window.addEventListener("load", async function () {
  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = USER_INTERFACE_CONFIG.screen.width;
  canvas.height = USER_INTERFACE_CONFIG.screen.height;
  const game = new Game(canvas.width, canvas.height, ctx);

  let lastTime: number = 0;

  function animate(timeStamp: number) {
    const deltaTime: number = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.update(deltaTime);
    game.draw(ctx, deltaTime);

    requestAnimationFrame(animate);
  }
  animate(0);
});
