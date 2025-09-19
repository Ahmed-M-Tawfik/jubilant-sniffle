import Matter from "matter-js";
import { USER_INTERFACE_CONFIG } from "../data/ui/UserInterfaceConfig";

/**
 * We assign each category a unique bit
 * We can have up to 32 unique categories, because that's what MatterJs supports
 */
export enum CollisionCategory {
  ball = 0b001,
  paddle = 0b010,
  wall = 0b100,
  paddleRestraint = 0b1000,
  visualOnly = 0b10000,
}

export class PhysicsSystem {
  static engine = Matter.Engine.create();
  static world = this.engine.world;

  static {
    this.engine.gravity.y = 0;
    this.engine.world.bounds = {
      min: { x: 0, y: 0 },
      max: { x: USER_INTERFACE_CONFIG.screen.width, y: USER_INTERFACE_CONFIG.screen.height },
    };
  }

  static update(deltaTime: number): void {
    Matter.Engine.update(this.engine, deltaTime);
  }
}
