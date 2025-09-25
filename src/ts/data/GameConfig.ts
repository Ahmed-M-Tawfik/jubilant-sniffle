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

  players: [
    {
      playerId: 0,
    },
    {
      playerId: 1,
    },
  ],

  paddleLocations: [
    {
      bounds: {
        min: {
          x: 0,
          y: 0,
        },
        max: {
          x: 800,
          y: 160,
        },
      },
      initialPosition: {
        x: 400,
        y: 100,
      },
    },
    {
      bounds: {
        min: {
          x: 0,
          y: 440,
        },
        max: {
          x: 800,
          y: 600,
        },
      },
      initialPosition: {
        x: 400,
        y: 500,
      },
    },
  ],

  board: {
    boundaryThickness: 100,
    width: 800,
    height: 600,
    sides: {
      top: { type: "goal" },
      bottom: { type: "goal" },
      left: { type: "bounce" },
      right: { type: "bounce" },
    },
  },

  gameplay: {
    players: {
      player0: {
        selectedPaddle: "normal",
        selectedPosition: 0,
      },
      player1: {
        selectedPaddle: "fast",
        selectedPosition: 1,
      },
    },
    level: {
      winningScore: 5,
      maxTime: 20, // in seconds
      rounds: 3,
      roundEndsOn: "onlyOnMaxScore",
    },
  },

  gameScale: 10,

  maxTime: 10000,
  winningScore: 5,
};
