import { playerActions, type IKeyBinding } from "../ui/UserInterfaceConfigTypes";

export const DEFAULT_KEY_BINDINGS: IKeyBinding[] = [
  { action: playerActions.player1.moveLeft, key: "ArrowLeft", group: "player1" },
  { action: playerActions.player1.moveRight, key: "ArrowRight", group: "player1" },
  { action: playerActions.player1.moveUp, key: "ArrowUp", group: "player1" },
  { action: playerActions.player1.moveDown, key: "ArrowDown", group: "player1" },
  { action: playerActions.player2.moveLeft, key: "a", group: "player2" },
  { action: playerActions.player2.moveRight, key: "d", group: "player2" },
  { action: playerActions.player2.moveUp, key: "w", group: "player2" },
  { action: playerActions.player2.moveDown, key: "s", group: "player2" },

  { action: "pause", key: "p", group: "game" },

  { action: "debug_show_mouse_coords", key: "t", group: "debug" },
  { action: "debug_add_score", key: "g", group: "debug" },
  { action: "debug_restart_level", key: "r", group: "debug" },
];
