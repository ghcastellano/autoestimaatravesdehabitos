"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
}

const COLORS = ["#0d9488", "#a855f7", "#f97316", "#f43f5e", "#22c55e", "#eab308", "#ec4899"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface Piece {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotation: number;
  size: number;
}

export function Confetti({ isActive, duration = 2000 }: ConfettiProps) {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isActive) {
      const newPieces: Piece[] = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: randomBetween(5, 95),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: randomBetween(0, 0.5),
        rotation: randomBetween(0, 360),
        size: randomBetween(6, 12),
      }));
      setPieces(newPieces);
      setShow(true);

      const timer = setTimeout(() => {
        setShow(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, duration]);

  return (
    <AnimatePresence>
      {show && (
        <div className="confetti-container">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{
                top: "-5%",
                left: `${piece.x}%`,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                top: "105%",
                rotate: piece.rotation + 720,
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: randomBetween(1.5, 2.5),
                delay: piece.delay,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
