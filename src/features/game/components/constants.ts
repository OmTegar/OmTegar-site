export type Point = [number, number];

export const CANVAS_SIZE: Point = [330, 480];
export const SNAKE_START: Point[] = [
  [11, 15],
  [11, 16],
];
export const APPLE_START: Point = [11, 5];
export const SCALE: number = 15;
export const SPEED: number = 140;

export interface Directions {
  [key: number]: Point;
}

export const DIRECTIONS: Directions = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0], // right
};
