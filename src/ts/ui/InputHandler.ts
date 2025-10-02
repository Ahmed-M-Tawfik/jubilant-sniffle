import { Game } from "../../ts/Main";
import type { Button } from "./components/buttons/Button";
import type { KeyBinding, KeyBindings } from "./KeyBindings";

export class InputHandler {
  game: Game;
  keyBindings: KeyBindings;
  buttons: Button[];
  actions: Set<string>;
  debugActions: Set<string>;

  debugMousePosTracking: { x: number; y: number } = { x: 0, y: 0 };

  constructor(game: Game, canvas: HTMLCanvasElement, keyBindings: KeyBindings) {
    this.game = game;
    this.keyBindings = keyBindings;
    this.buttons = [];
    this.actions = new Set<string>();
    this.debugActions = new Set<string>();

    // Make sure the canvas is focused to receive keyboard events
    canvas.focus();

    canvas.addEventListener("keydown", (e) => {
      // Only process player actions if game is in PLAYING state
      if (
        game.state === game.states.playing &&
        (this.keyBindings.getKeysByGroup("player0").includes(e.key) ||
          this.keyBindings.getKeysByGroup("player1").includes(e.key))
      ) {
        this.actions.add(this.getKeyBinding(this.keyBindings.keyToAction, e.key).action);
      }
      if (this.keyBindings.getKeysByGroup("debug").includes(e.key)) {
        game.handleDebugKeys(e);
      }
      this.game.state.handleInput(e);
    });
    canvas.addEventListener("keyup", (e) => {
      if (
        game.state === game.states.playing &&
        (this.keyBindings.getKeysByGroup("player0").includes(e.key) ||
          this.keyBindings.getKeysByGroup("player1").includes(e.key))
      ) {
        this.actions.delete(this.getKeyBinding(this.keyBindings.keyToAction, e.key).action);
      }
    });
    canvas.addEventListener("click", (e) => {
      let mouseX = e.offsetX;
      let mouseY = e.offsetY;
      this.buttons.forEach((button) => {
        if (
          !(
            mouseX < button.x - button.width / 2 ||
            mouseX > button.x + button.width / 2 ||
            mouseY < button.y - button.height / 2 ||
            mouseY > button.y + button.height / 2
          )
        ) {
          button.onClick();
        }
      });
    });

    // debug
    canvas.addEventListener("mousemove", (e) => {
      this.debugMousePosTracking = { x: e.offsetX, y: e.offsetY };
    });
  }

  addButton(button: Button) {
    this.buttons.push(button);
  }
  removeButton(button: Button) {
    const index = this.buttons.indexOf(button);
    if (index > -1) {
      this.buttons.splice(index, 1);
    }
  }

  getKeyBinding(map: Record<string, KeyBinding>, key: string): NonNullable<KeyBinding> {
    const keyBinding = map[key];
    if (!keyBinding) {
      throw new Error(`Key binding for '${String(key)}' not found`);
    }
    return keyBinding as NonNullable<KeyBinding>;
  }
}
