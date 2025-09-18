import Matter from "matter-js";
import type { IBoardConfig } from "../ConfigTypes.ts";
import type { Game } from "../Main.ts";
import { PhysicsSystem } from "../systems/PhysicsSystem.ts";
import { BoardComponent } from "./components/BoardComponent.ts";
import { GameEntity } from "./GameEntity.ts";

export class Board extends GameEntity {
  constructor(game: Game, config: IBoardConfig) {
    super(game);

    const compositeBody = Matter.Composite.create({
      bodies: [
        createBoundaryBody("top", config.boundaryThickness, config.width, config.height, config.sides.top.type),
        createBoundaryBody("bottom", config.boundaryThickness, config.width, config.height, config.sides.bottom.type),
        createBoundaryBody("left", config.boundaryThickness, config.width, config.height, config.sides.left.type),
        createBoundaryBody("right", config.boundaryThickness, config.width, config.height, config.sides.right.type),
      ],
    });
    this.addComponent<BoardComponent>("board", new BoardComponent(compositeBody));
    Matter.World.add(PhysicsSystem.world, compositeBody);
  }
}

function createBoundaryBody(
  side: string,
  boundaryThickness: number,
  width: number,
  height: number,
  type: "goal" | "bounce"
): Matter.Body {
  let extraCoverage: number = 0;
  if (type === "bounce") {
    extraCoverage = boundaryThickness;
  }

  let rectWidth = 0;
  let rectHeight = 0;
  switch (side) {
    case "top":
      rectWidth = width + extraCoverage * 2;
      rectHeight = boundaryThickness;
      return Matter.Bodies.rectangle(0 + rectWidth / 2, 0 - rectHeight / 2, rectWidth, rectHeight, {
        isStatic: true,
        label: side,
      });
    case "bottom":
      rectWidth = width + extraCoverage * 2;
      rectHeight = boundaryThickness;
      return Matter.Bodies.rectangle(0 + rectWidth / 2, height + rectHeight / 2, rectWidth, rectHeight, {
        isStatic: true,
        label: side,
      });
    case "left":
      rectWidth = boundaryThickness;
      rectHeight = height + extraCoverage * 2;
      return Matter.Bodies.rectangle(0 - rectWidth / 2, 0 + rectHeight / 2, rectWidth, rectHeight, {
        isStatic: true,
        label: side,
      });
    case "right":
      rectWidth = boundaryThickness;
      rectHeight = height + extraCoverage * 2;
      return Matter.Bodies.rectangle(width + rectWidth / 2, 0 + rectHeight / 2, rectWidth, rectHeight, {
        isStatic: true,
        label: side,
      });
    default:
      throw new Error(`Unknown side: ${side}`);
  }
}
