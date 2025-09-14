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

  gameScale: number;

  // environment
  maxParticles: number;
  maxTime: number;
  winningScore: number;
  initialLives: number;
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
