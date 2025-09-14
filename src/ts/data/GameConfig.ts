import type { IGameConfig } from "../ConfigTypes";

export const GAME_CONFIG: IGameConfig = {
  paddleTypes: {
    normal: {
      width: 10,
      height: 1,
      maxSpeed: 5,
      density: 23,
      colour: "#009dffff",
    },
    fast: {
      width: 5,
      height: 1,
      maxSpeed: 8,
      density: 15,
      colour: "#00fbffff",
    },
    wide: {
      width: 15,
      height: 3,
      maxSpeed: 3,
      density: 30,
      colour: "#0008ffff",
    },
  },

  ballTypes: {
    normal: {
      radius: 2,
      density: 2,
      colour: "#ffaa00ff",
    },
    fast: {
      radius: 1.5,
      density: 1,
      colour: "#ffff00",
    },
    heavy: {
      radius: 3,
      density: 3,
      colour: "#ff7300ff",
    },
  },

  gameScale: 10,

  // environment
  maxParticles: 200,
  maxTime: 10000,
  winningScore: 5,
  initialLives: 5,
};
