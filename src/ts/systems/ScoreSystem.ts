import Matter from "matter-js";
import { BallComponent } from "../entities/components/BallComponent";
import type { BoardComponent } from "../entities/components/BoardComponent";
import type { BodyWithEntity } from "../entities/components/PhysicsComponent";
import type { ScoreComponent } from "../entities/components/ScoreComponent";
import type { Game } from "../Main";
import { PhysicsSystem } from "./PhysicsSystem";

export class ScoreSystem {
  private static collisionCallback: ((event: Matter.IEventCollision<Matter.Engine>) => void) | undefined;

  static start(game: Game) {
    if (this.collisionCallback) throw new Error("ScoreSystem already started");

    this.collisionCallback = function (event: Matter.IEventCollision<Matter.Engine>) {
      ScoreSystem.collisionCheck(event, game);
    };
    Matter.Events.on(PhysicsSystem.engine, "collisionStart", this.collisionCallback);
  }

  static stop() {
    if (!this.collisionCallback) throw new Error("ScoreSystem not started");

    Matter.Events.off(PhysicsSystem.engine, "collisionStart", this.collisionCallback);
    this.collisionCallback = undefined;
  }

  private static collisionCheck(event: Matter.IEventCollision<Matter.Engine>, game: Game) {
    const pairs = event.pairs;

    pairs.forEach((pair: Matter.Pair) => {
      const bodyA = pair.bodyA as BodyWithEntity;
      const bodyB = pair.bodyB as BodyWithEntity;

      // Check if either body has a BallComponent
      const ballA = bodyA.gameEntity?.getComponent<BallComponent>("ball");
      const ballB = bodyB.gameEntity?.getComponent<BallComponent>("ball");

      if (!!ballA === !!ballB) {
        // both are balls or none are balls
        return;
      }

      let ballEntity;
      let board;
      let score;
      let otherBody;
      if (ballA) {
        ballEntity = ballA;
        board = bodyB.gameEntity?.getComponent<BoardComponent>("board");
        score = bodyB.gameEntity?.getComponent<ScoreComponent>("score");
        otherBody = bodyB;
      } else {
        ballEntity = ballB;
        board = bodyA.gameEntity?.getComponent<BoardComponent>("board");
        score = bodyA.gameEntity?.getComponent<ScoreComponent>("score");
        otherBody = bodyA;
      }

      if (board && score) {
        if (otherBody.label.endsWith("top")) {
          game.session.scorePerPlayer[0] += score.score;
        } else if (otherBody.label.endsWith("bottom")) {
          game.session.scorePerPlayer[1] += score.score;
        }
      }
    });
  }
}
