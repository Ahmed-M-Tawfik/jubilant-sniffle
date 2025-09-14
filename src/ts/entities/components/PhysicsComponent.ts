import type Matter from "matter-js";
import type { Component } from "../Component";

export class PhysicsComponent implements Component {
  public __isComponent: true = true;

  constructor(public matterBody: Matter.Body) {}
}
