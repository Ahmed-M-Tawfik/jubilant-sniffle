import Matter from "matter-js";
import { PhysicsComponent } from "../entities/components/PhysicsComponent";
import type { GameEntity } from "../entities/GameEntity";
import { PhysicsSystem } from "../systems/PhysicsSystem";

export function addPhysicsComponentAndMatterBody(entity: GameEntity, matterBody: Matter.Body) {
  entity.addComponent("physics", new PhysicsComponent(matterBody));
  Matter.World.add(PhysicsSystem.world, matterBody);
}

// return a map of game entity types and number of each in a given array
export function countEntityTypes(entities: GameEntity[]): Map<string, number> {
  const typeCount = new Map<string, number>();
  for (const entity of entities) {
    const type = entity.constructor.name;
    typeCount.set(type, (typeCount.get(type) || 0) + 1);
  }
  return typeCount;
}
