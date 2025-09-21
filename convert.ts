import * as fs from "fs";
import { RatingsJson, Game } from './src/types';

const csvPath = './jatekok.csv';
const jsonPath = './public/ratings.json';
const publicDir = './public';

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

const csv = fs.readFileSync(csvPath, 'utf-8');
const lines = csv.trim().split('\n');

// Fejléc sor kihagyása
const dataLines = lines.filter(line => !line.toLowerCase().includes('név'));

const games: Game[] = dataLines.map(line => {
  const [name, ratingStr] = line.split(',');
  return {
    name: name.trim(),
    rating: Number(ratingStr)
  };
});

games.sort((a, b) => b.rating - a.rating);

const averageRating = games.reduce((sum, g) => sum + g.rating, 0) / games.length;

const result: RatingsJson = {
  averageRating: Number(averageRating.toFixed(3)),
  games
};

fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2), 'utf-8');
console.log('ratings.json');
