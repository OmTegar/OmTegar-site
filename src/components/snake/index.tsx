"use client";

import React, { useRef, useEffect } from "react";
import { useSnakeGame } from "../../hooks/useSnakeGame";

interface SnakeProps {
  scoreSnake: (score: number) => void;
}

const Snake: React.FC<SnakeProps> = ({ scoreSnake }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    snake,
    apple,
    gameOver,
    isPlaying,
    startGame,
    changeDirection,
    config: { CANVAS_SIZE, SCALE }
  } = useSnakeGame(scoreSnake);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.focus();
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
        context.fillStyle = "#43d9ad";
        snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
        context.fillStyle = "#43d9ad";
        context.fillRect(apple[0], apple[1], 1, 1);
      }
    }
  }, [snake, apple, gameOver, CANVAS_SIZE, SCALE]);

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => changeDirection(e.keyCode)}
      className="relative outline-none flex justify-center items-center"
    >
      <canvas
        className="bg-[#010C15] border border-[#1E2D3D] rounded-lg shadow-2xl w-full max-w-[285px] h-auto"
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      {gameOver && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-[#43D9AD] py-3 w-full rounded-lg text-center text-2xl bg-[#011627]/[84%] inner-shadow-snake transition-all">
          GAME OVER!
        </div>
      )}
      <button
        onClick={startGame}
        className={`absolute text-sm bottom-10 left-1/2 -translate-x-1/2 bg-[#FEA55F] py-2.5 px-[14px] rounded-lg transition-all ${isPlaying ? "opacity-0 cursor-default" : "opacity-100"
          }`}
      >
        start-game
      </button>
    </div>
  );
};

export default Snake;
