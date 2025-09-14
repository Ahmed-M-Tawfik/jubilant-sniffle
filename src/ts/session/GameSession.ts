import { GAME_CONFIG } from "../data/GameConfig";
import type { GameEntity } from "../entities/GameEntity";
import type { Game } from "../Main";

export class GameSession {
  game: Game;
  entities: GameEntity[] = [];
  lives: number = 0;
  time: number = 0;
  maxTime: number = 0;
  score: number = 0;
  winningScore: number = 0;

  constructor(game: Game) {
    this.game = game;
    this.reset();
  }

  reset(): void {
    this.entities = [];

    // this.lives = GAME_CONFIG.initialLives;

    this.time = 0;
    this.maxTime = GAME_CONFIG.maxTime;

    // this.score = 0;
    this.winningScore = GAME_CONFIG.winningScore;
  }
}
