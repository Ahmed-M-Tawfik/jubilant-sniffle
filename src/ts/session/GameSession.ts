import { GAME_CONFIG } from "../data/GameConfig";
import type { GameEntity } from "../entities/GameEntity";
import type { Game } from "../Main";

export class GameSession {
  game: Game;
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
    this.entities = [];

    this.time = 0;
    this.maxTime = GAME_CONFIG.maxTime;

    this.scorePerPlayer = [0, 0];
    this.winningScore = GAME_CONFIG.winningScore;
  }
}
