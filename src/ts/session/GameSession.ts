import type { IGameConfig } from "../ConfigTypes";
import { GAME_CONFIG } from "../data/GameConfig";
import type { GameEntity } from "../entities/GameEntity";
import type { Game } from "../Main";
import { deepCopy } from "../utils/dataUtils";

export class GameSession {
  game: Game;
  gameConfig!: IGameConfig;
  entities: GameEntity[] = [];

  time: number = 0;
  maxTime: number = 0;

  scorePerPlayer: [number, number] = [0, 0];
  winningScore: number = 0;

  constructor(game: Game) {
    this.game = game;
    this.reset();
  }

  reset(): void {
    this.gameConfig = deepCopy(GAME_CONFIG);
    this.entities = [];

    this.time = 0;
    this.maxTime = this.gameConfig.maxTime;

    this.scorePerPlayer = [0, 0];
    this.winningScore = this.gameConfig.winningScore;
  }
}
