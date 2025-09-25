import type { Bounds } from "matter-js";

export interface IGameConfig {
  paddleTypes: {
    normal: IPaddleConfig;
    fast: IPaddleConfig;
    wide: IPaddleConfig;
  };

  ballTypes: {
    normal: IBallConfig;
    fast: IBallConfig;
    heavy: IBallConfig;
  };

  players: [IPlayerConfig, IPlayerConfig];

  paddleLocations: [IPaddleLocationConfig, IPaddleLocationConfig];

  board: IBoardConfig;

  gameplay: IGameplayConfig;

  gameScale: number;

  maxTime: number;
  winningScore: number;
}

export interface IGameplayConfig {
  players: {
    player0: {
      selectedPaddle: "normal" | "fast" | "wide";
      selectedPosition: 0 | 1;
    };
    player1: {
      selectedPaddle: "normal" | "fast" | "wide";
      selectedPosition: 0 | 1;
    };
  };
  level: {
    winningScore: number;
    maxTime: number; // in seconds
    rounds: number;
    roundEndsOn: "onEveryScore" | "onlyOnMaxScore";
  };
}

export interface IPlayerConfig {
  playerId: number;
}

export interface IPaddleLocationConfig {
  bounds: Bounds;

  initialPosition: {
    x: number;
    y: number;
  };
}

export interface IPaddleConfig {
  density: number;
  maxSpeed: number;

  width: number;
  height: number;

  colour: string;
}

export interface IBallConfig {
  density: number;

  radius: number;

  colour: string;
}

export interface IBoardConfig {
  boundaryThickness: number;

  width: number;
  height: number;

  sides: {
    top: { type: "goal" | "bounce" };
    bottom: { type: "goal" | "bounce" };
    left: { type: "goal" | "bounce" };
    right: { type: "goal" | "bounce" };
  };
}
