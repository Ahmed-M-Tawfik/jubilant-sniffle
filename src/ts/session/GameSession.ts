import { GAME_CONFIG } from "../data/GameConfig";
import type { GameEntity } from "../entities/GameEntity";
import { Paddle } from "../entities/Paddle";
import type { Game } from "../Main";

export class GameSession {
  game: Game;
  entities: GameEntity[] = [];
  players!: { player1: Paddle; player2: Paddle };
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
    this.players = {
      player1: new Paddle(this.game, GAME_CONFIG.paddleTypes.fast, "1"),
      player2: new Paddle(this.game, GAME_CONFIG.paddleTypes.normal, "2"),
    };
    this.entities = [this.players.player1, this.players.player2];

    // this.lives = GAME_CONFIG.initialLives;

    this.time = 0;
    this.maxTime = GAME_CONFIG.maxTime;

    // this.score = 0;
    this.winningScore = GAME_CONFIG.winningScore;
  }
}
