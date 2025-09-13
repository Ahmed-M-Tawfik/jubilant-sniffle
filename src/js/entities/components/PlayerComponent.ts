import type { Component } from "../Component.js";

export class PlayerComponent implements Component {
  public __isComponent: true = true;

  constructor(public playerId: "1" | "2") {}
}
