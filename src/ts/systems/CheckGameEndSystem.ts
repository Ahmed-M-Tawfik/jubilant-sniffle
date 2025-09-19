import type { Game } from "../Main";

export class CheckGameEndSystem {
  static update(game: Game): void {
    if (game.session.scorePerPlayer[0] >= game.session.winningScore) {
      game.endGame();
    } else if (game.session.scorePerPlayer[1] >= game.session.winningScore) {
      game.endGame();
    }
  }
}
