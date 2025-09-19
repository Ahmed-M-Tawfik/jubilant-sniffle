import Matter from "matter-js";
import type { IBoardConfig, IPaddleLocationConfig } from "../ConfigTypes.ts";
import type { Game } from "../Main.ts";
import { CollisionCategory, PhysicsSystem } from "../systems/PhysicsSystem.ts";
import { BoardComponent } from "./components/BoardComponent.ts";
import { GameEntity } from "./GameEntity.ts";
import type { BodyWithEntity } from "./components/PhysicsComponent.ts";
import { ScoreComponent } from "./components/ScoreComponent.ts";

export class Board extends GameEntity {
  constructor(game: Game, config: IBoardConfig, paddleLocations: [IPaddleLocationConfig, IPaddleLocationConfig]) {
    super(game);

    const bounds = Matter.Composite.create({
      bodies: [
        createBoundaryBody("top", config.boundaryThickness, config.width, config.height, config.sides.top.type),
        createBoundaryBody("bottom", config.boundaryThickness, config.width, config.height, config.sides.bottom.type),
        createBoundaryBody("left", config.boundaryThickness, config.width, config.height, config.sides.left.type),
        createBoundaryBody("right", config.boundaryThickness, config.width, config.height, config.sides.right.type),
      ],
    });
    const paddleBounds = Matter.Composite.create({
      bodies: [
        addPaddleRestraint(paddleLocations[0], config, true),
        addPaddleRestraint(paddleLocations[1], config, false),
      ],
    });
    const visualisedPaddleBounds = Matter.Composite.create({
      bodies: [addPaddleRestraintVisual(paddleLocations[0]), addPaddleRestraintVisual(paddleLocations[1])],
    });
    this.addComponent<BoardComponent>("board", new BoardComponent(bounds, paddleBounds, visualisedPaddleBounds));
    Matter.World.add(PhysicsSystem.world, [bounds, paddleBounds, visualisedPaddleBounds]);
    [bounds, paddleBounds, visualisedPaddleBounds].forEach((composite: Matter.Composite) => {
      composite.bodies.forEach((body: BodyWithEntity) => {
        body.gameEntity = this;
      });
    });

    this.addComponent<ScoreComponent>("score", new ScoreComponent(1));
  }
}

function addPaddleRestraint(location: IPaddleLocationConfig, config: IBoardConfig, isTop: boolean): Matter.Body {
  const boundaryThickness = config.boundaryThickness;
  const width = location.bounds.max.x - location.bounds.min.x;
  const heightFromBorder = location.bounds.max.y - location.bounds.min.y;
  const y = isTop ? heightFromBorder + boundaryThickness / 2 : config.height - heightFromBorder - boundaryThickness / 2;
  return Matter.Bodies.rectangle(location.bounds.min.x + width / 2, y, width, boundaryThickness, {
    label: "Paddle Restraint: " + location.initialPosition.x + "," + location.initialPosition.y,
    isStatic: true,
    collisionFilter: {
      mask: CollisionCategory.paddle,
      category: CollisionCategory.paddleRestraint,
    },
    render: {
      visible: false,
    },
  });
}

function addPaddleRestraintVisual(location: IPaddleLocationConfig): Matter.Body {
  // create rectangle using the bounds
  const width = location.bounds.max.x - location.bounds.min.x;
  const height = location.bounds.max.y - location.bounds.min.y;
  return Matter.Bodies.rectangle(location.bounds.min.x + width / 2, location.bounds.min.y + height / 2, width, height, {
    label: "Paddle Restraint Visual: " + location.initialPosition.x + "," + location.initialPosition.y,
    isStatic: true,
    collisionFilter: {
      category: CollisionCategory.visualOnly,
    },
    render: {
      opacity: 0,
      strokeStyle: "red",
      lineWidth: 5,
    },
  });
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
      return Matter.Bodies.rectangle(
        0 + rectWidth / 2,
        0 - rectHeight / 2,
        rectWidth,
        rectHeight,
        getOptions(side, type)
      );
    case "bottom":
      rectWidth = width + extraCoverage * 2;
      rectHeight = boundaryThickness;
      return Matter.Bodies.rectangle(
        0 + rectWidth / 2,
        height + rectHeight / 2,
        rectWidth,
        rectHeight,
        getOptions(side, type)
      );
    case "left":
      rectWidth = boundaryThickness;
      rectHeight = height + extraCoverage * 2;
      return Matter.Bodies.rectangle(
        0 - rectWidth / 2,
        0 + rectHeight / 2,
        rectWidth,
        rectHeight,
        getOptions(side, type)
      );
    case "right":
      rectWidth = boundaryThickness;
      rectHeight = height + extraCoverage * 2;
      return Matter.Bodies.rectangle(
        width + rectWidth / 2,
        0 + rectHeight / 2,
        rectWidth,
        rectHeight,
        getOptions(side, type)
      );
    default:
      throw new Error(`Unknown side: ${side}`);
  }
}

function getOptions(side: string, type: "goal" | "bounce"): Matter.IChamferableBodyDefinition {
  return {
    label: type + ": " + side,
    isStatic: true,
    collisionFilter: {
      mask: CollisionCategory.paddle | CollisionCategory.ball,
      category: CollisionCategory.wall,
    },
  };
}
