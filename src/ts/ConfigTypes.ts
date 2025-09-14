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

  gameScale: number;

  // environment
  maxParticles: number;
  maxTime: number;
  winningScore: number;
  initialLives: number;
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
