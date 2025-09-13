import { playerActions, type IKeyBinding } from "../ui/UserInterfaceConfigTypes.js";

export const DEFAULT_KEY_BINDINGS: IKeyBinding[] = [
  { action: playerActions.player1.moveLeft, key: "ArrowLeft", group: "player1" },
  { action: playerActions.player1.moveRight, key: "ArrowRight", group: "player1" },
  { action: playerActions.player2.moveLeft, key: "A", group: "player2" },
  { action: playerActions.player2.moveRight, key: "D", group: "player2" },

  { action: "pause", key: "p", group: "game" },

  { action: "debug_active", key: "d", group: "debug" },
  { action: "debug_show_mouse_coords", key: "t", group: "debug" },
  { action: "debug_add_score", key: "g", group: "debug" },
  { action: "debug_restart_level", key: "r", group: "debug" },
];
