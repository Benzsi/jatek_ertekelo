import { useEffect, useState } from 'react';
import type { RatingsJSON, GameItem } from './interface';

function starsForRating(r: number) {
  const rounded = Math.round(r);
  return '⭐'.repeat(Math.max(0, Math.min(5, rounded)));
}

export default function App() {
  const [data, setData] = useState<RatingsJSON | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/ratings.json')
      .then(res => {
        if (!res.ok) throw new Error('Nem sikerült letölteni a ratings.json-t');
        return res.json();
      })
      .then((j: RatingsJSON) => setData(j))
      .catch(err => setError(String(err)));
  }, []);

  if (error)
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  if (!data)
    return <div className="container mt-4">Betöltés...</div>;

  const avg = data.averageRating;
  const avgSentence = `A játékok átlagos értékelése ${avg.toFixed(2)} (az oldalon szereplő játékok alapján).`;

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="h4">Játék értékelések</h1>
        <p className="lead">{avgSentence}</p>
      </header>
      <div className="row g-3">
        {data.games.map((g: GameItem, i: number) => {
          const bgClass = g.rating >= 4.8 ? 'high-rating' : g.rating < 4 ? 'low-rating' : '';
          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
              <div className={`card h-100 ${bgClass}`}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{g.name}</h5>
                  <p className="card-text mt-auto" aria-label={`Értékelés: ${g.rating}`}>
                    {starsForRating(g.rating)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}