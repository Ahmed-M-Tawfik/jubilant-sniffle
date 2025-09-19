import type { Component } from "../Component";

export class BoardComponent implements Component {
  public __isComponent: true = true;
  constructor(
    public bounds: Matter.Composite,
    public paddleBounds: Matter.Composite,
    public visualisedPaddleBounds: Matter.Composite
  ) {}
}
