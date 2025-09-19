import { playerActions, type IKeyBinding } from "../ui/UserInterfaceConfigTypes";

export const DEFAULT_KEY_BINDINGS: IKeyBinding[] = [
  { action: playerActions.player0.moveLeft, key: "ArrowLeft", group: "player0" },
  { action: playerActions.player0.moveRight, key: "ArrowRight", group: "player0" },
  { action: playerActions.player0.moveUp, key: "ArrowUp", group: "player0" },
  { action: playerActions.player0.moveDown, key: "ArrowDown", group: "player0" },
  { action: playerActions.player1.moveLeft, key: "a", group: "player1" },
  { action: playerActions.player1.moveRight, key: "d", group: "player1" },
  { action: playerActions.player1.moveUp, key: "w", group: "player1" },
  { action: playerActions.player1.moveDown, key: "s", group: "player1" },

  { action: "pause", key: "p", group: "game" },

  { action: "debug_show_mouse_coords", key: "t", group: "debug" },
  { action: "debug_add_score", key: "g", group: "debug" },
  { action: "debug_restart_level", key: "r", group: "debug" },
];
