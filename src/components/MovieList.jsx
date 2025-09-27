import MovieCard from './MovieCard';
export default function MovieList({ items }) {
  if (!items?.length) return <p className="muted">No movies found.</p>;
  return <div className="grid">{items.map(m => <MovieCard key={m.id} m={m} />)}</div>;
}
