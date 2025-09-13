import type { Component } from "../Component.js";

export type PhysicsRenderShape = "rectangle" | "circle";

export class PhysicsRenderComponent implements Component {
  public __isComponent: true = true;

  // allows rendering of physics objects
  // requires: PhysicsComponent
  // uses Physics data to render the object
  constructor(public color: string, public shape: PhysicsRenderShape) {}
}
