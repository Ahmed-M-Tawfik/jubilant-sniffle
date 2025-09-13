import type { IGameConfig } from "../ConfigTypes";

export const GAME_CONFIG: IGameConfig = {
  paddleTypes: {
    normal: {
      width: 10,
      height: 1,
      maxSpeed: 5,
      mass: 2,
      colour: "#009dffff",
    },
    fast: {
      width: 5,
      height: 1,
      maxSpeed: 8,
      mass: 1,
      colour: "#00fbffff",
    },
    wide: {
      width: 15,
      height: 3,
      maxSpeed: 3,
      mass: 3,
      colour: "#0008ffff",
    },
  },

  ballTypes: {
    normal: {
      width: 2,
      height: 2,
      mass: 2,
      colour: "#ffaa00ff",
    },
    fast: {
      width: 1.5,
      height: 1.5,
      mass: 1,
      colour: "#ffff00",
    },
    heavy: {
      width: 3,
      height: 3,
      mass: 3,
      colour: "#ff7300ff",
    },
  },

  gameDrawScale: 10,

  // environment
  maxParticles: 200,
  maxTime: 10000,
  winningScore: 5,
  initialLives: 5,
};
