import type Matter from "matter-js";
import type { Component } from "../Component";
import type { GameEntity } from "../GameEntity";

export class PhysicsComponent implements Component {
  public __isComponent: true = true;

  constructor(public matterBody: BodyWithEntity) {}
}

export interface BodyWithEntity extends Matter.Body {
  gameEntity?: GameEntity;
}
