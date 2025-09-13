import type { Component } from "../Component.js";

export class PhysicsComponent implements Component {
  public __isComponent: true = true;

  constructor(
    public mass: number,
    public size: { width: number; height: number },
    public position: { x: number; y: number },
    public velocity: { x: number; y: number }
  ) {}
}
