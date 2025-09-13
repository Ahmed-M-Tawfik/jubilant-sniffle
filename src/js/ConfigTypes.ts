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

  gameDrawScale: number;

  // environment
  maxParticles: number;
  maxTime: number;
  winningScore: number;
  initialLives: number;
}

export interface IPaddleConfig {
  mass: number;
  maxSpeed: number;

  width: number;
  height: number;

  colour: string;
}

export interface IBallConfig {
  mass: number;

  width: number;
  height: number;

  colour: string;
}
