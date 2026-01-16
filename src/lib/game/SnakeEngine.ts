export type Point = [number, number];

export interface GameConfig {
    canvasSize: [number, number];
    snakeStart: Point[];
    appleStart: Point;
    scale: number;
    directions: { [key: number]: Point };
}

/**
 * Pure Game Logic Engine for Snake (SRP)
 */
export class SnakeEngine {
    private canvasSize: [number, number];
    private scale: number;

    constructor(config: GameConfig) {
        this.canvasSize = config.canvasSize;
        this.scale = config.scale;
    }

    moveSnake(snake: Point[], dir: Point): Point[] {
        const snakeCopy: Point[] = JSON.parse(JSON.stringify(snake));
        const newSnakeHead: Point = [
            snakeCopy[0][0] + dir[0],
            snakeCopy[0][1] + dir[1]
        ];
        snakeCopy.unshift(newSnakeHead);
        return snakeCopy;
    }

    checkCollision(head: Point, snake: Point[]): boolean {
        // Wall collision
        if (
            head[0] * this.scale >= this.canvasSize[0] ||
            head[0] < 0 ||
            head[1] * this.scale >= this.canvasSize[1] ||
            head[1] < 0
        ) {
            return true;
        }

        // Self collision
        for (const segment of snake) {
            if (head[0] === segment[0] && head[1] === segment[1]) return true;
        }

        return false;
    }

    checkAppleCollision(head: Point, apple: Point): boolean {
        return head[0] === apple[0] && head[1] === apple[1];
    }

    generateRandomApple(snake: Point[]): Point {
        let newApple: Point;
        while (true) {
            newApple = [
                Math.floor(Math.random() * (this.canvasSize[0] / this.scale)),
                Math.floor(Math.random() * (this.canvasSize[1] / this.scale))
            ];
            // Ensure apple doesn't spawn on snake
            let onSnake = false;
            for (const segment of snake) {
                if (newApple[0] === segment[0] && newApple[1] === segment[1]) {
                    onSnake = true;
                    break;
                }
            }
            if (!onSnake) break;
        }
        return newApple;
    }
}
