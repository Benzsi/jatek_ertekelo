export interface Game {
  name: string;
  rating: number;
}

export interface RatingsJson {
  averageRating: number;
  games: Game[];
}
