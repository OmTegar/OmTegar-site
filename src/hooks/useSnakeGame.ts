"use client";

import { useState, useCallback } from "react";
import { useInterval } from "@/components/snake/useInterval";
import { SnakeEngine, Point } from "@/lib/game/SnakeEngine";
import {
    CANVAS_SIZE,
    SNAKE_START,
    APPLE_START,
    SCALE,
    SPEED,
    DIRECTIONS,
} from "@/components/snake/constants";

const engine = new SnakeEngine({
    canvasSize: CANVAS_SIZE as [number, number],
    snakeStart: SNAKE_START as Point[],
    appleStart: APPLE_START as Point,
    scale: SCALE,
    directions: DIRECTIONS as { [key: number]: Point },
});

export function useSnakeGame(onScoreUpdate?: (score: number) => void) {
    const [snake, setSnake] = useState<Point[]>(SNAKE_START as Point[]);
    const [apple, setApple] = useState<Point>(APPLE_START as Point);
    const [dir, setDir] = useState<Point>([0, -1]);
    const [speed, setSpeed] = useState<number | null>(null);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const endGame = useCallback(() => {
        setSpeed(null);
        setGameOver(true);
        setIsPlaying(false);
    }, []);

    const gameLoop = useCallback(() => {
        const nextSnake = engine.moveSnake(snake, dir);
        const head = nextSnake[0];

        // Check collision with walls or self
        if (engine.checkCollision(head, snake)) {
            endGame();
            return;
        }

        // Check apple
        if (engine.checkAppleCollision(head, apple)) {
            const newApple = engine.generateRandomApple(nextSnake);
            setApple(newApple);
        } else {
            nextSnake.pop();
        }

        setSnake(nextSnake);
        if (onScoreUpdate) onScoreUpdate(nextSnake.length - 2);
    }, [snake, apple, dir, endGame, onScoreUpdate]);

    useInterval(gameLoop, speed);

    const startGame = () => {
        setSnake(SNAKE_START as Point[]);
        setApple(APPLE_START as Point);
        setDir([0, -1]);
        setSpeed(SPEED);
        setGameOver(false);
        setIsPlaying(true);
    };

    const changeDirection = (keyCode: number) => {
        if (keyCode >= 37 && keyCode <= 40) {
            const nextDir = (DIRECTIONS as { [key: number]: Point })[keyCode];
            // Prevent reversing (180 degree turn)
            if (nextDir[0] + dir[0] !== 0 || nextDir[1] + dir[1] !== 0) {
                setDir(nextDir);
            }
        }
    };

    return {
        snake,
        apple,
        gameOver,
        isPlaying,
        startGame,
        changeDirection,
        config: { CANVAS_SIZE, SCALE }
    };
}
