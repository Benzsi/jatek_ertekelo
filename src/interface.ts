import React from "react";
import { Game } from "./types";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  // Értékelés kerekítése
  const roundedRating = Math.round(game.rating);
  // Csillagok generálása
  const stars = "⭐".repeat(roundedRating);

  // Hátérszín logika
  let bgClass = "";
  if (game.rating >= 4.8) {
    bgClass = "bg-success bg-opacity-25"; // világoszöld
  } else if (game.rating < 4) {
    bgClass = "bg-warning bg-opacity-25"; // halványsárga
  }

  return (
    <div className={`card h-100 ${bgClass}`}>
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <h5 className="card-title text-center">{game.name}</h5>
        <div className="fs-4" aria-label={`Értékelés: ${game.rating}`}>{stars}</div>
      </div>
    </div>
  );
}
