import type { GameEntity } from "../entities/GameEntity.js";

// return a map of game entity types and number of each in a given array
export function countEntityTypes(entities: GameEntity[]): Map<string, number> {
  const typeCount = new Map<string, number>();
  for (const entity of entities) {
    const type = entity.constructor.name;
    typeCount.set(type, (typeCount.get(type) || 0) + 1);
  }
  return typeCount;
}
