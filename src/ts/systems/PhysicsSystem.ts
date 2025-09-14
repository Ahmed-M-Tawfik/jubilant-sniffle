import Matter from "matter-js";
import { USER_INTERFACE_CONFIG } from "../data/ui/UserInterfaceConfig";

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
