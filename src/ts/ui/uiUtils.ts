export function getCenteredCoordFromTopLeftCoord(
  x: number,
  y: number,
  width: number,
  height: number
): { x: number; y: number } {
  return {
    x: x + width / 2,
    y: y + height / 2,
  };
}

export function getTopLeftCoordFromCenteredCoord(
  x: number,
  y: number,
  width: number,
  height: number
): { x: number; y: number } {
  return {
    x: x - width / 2,
    y: y - height / 2,
  };
}
