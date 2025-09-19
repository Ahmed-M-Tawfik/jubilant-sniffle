import type { Component } from "../Component";

export class ScoreComponent implements Component {
  public __isComponent: true = true;

  constructor(public score: number) {}
}
