const API_URL = 'https://www.omdbapi.com/';

function getKey() {
  const key = import.meta.env.VITE_OMDB_API_KEY;
  if (!key) throw new Error('Missing VITE_OMDB_API_KEY');
  return key;
}

export async function searchMovies(query, page = 1) {
  const url = `${API_URL}?apikey=${getKey()}&s=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();
  if (data.Response === 'False') return { results: [], total: 0, error: data.Error || 'No movies found.' };

  const results = (data.Search || []).map(m => ({
    id: m.imdbID,
    title: m.Title,
    year: m.Year,
    poster: m.Poster !== 'N/A' ? m.Poster : null,
    type: m.Type,
  }));
  return { results, total: Number(data.totalResults || 0), error: null };
}

export async function getMovie(id) {
  const url = `${API_URL}?apikey=${getKey()}&i=${encodeURIComponent(id)}&plot=full`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();
  if (data.Response === 'False') throw new Error(data.Error || 'Movie not found.');
  return {
    id: data.imdbID,
    title: data.Title,
    year: data.Year,
    rating: data.imdbRating,
    runtime: data.Runtime,
    genre: data.Genre,
    director: data.Director,
    actors: data.Actors,
    plot: data.Plot,
    poster: data.Poster !== 'N/A' ? data.Poster : null,
  };
}
