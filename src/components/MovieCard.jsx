import { Link } from 'react-router-dom';

export default function MovieCard({ m }) {
  return (
    <Link to={`/movie/${m.id}`} className="card">
      <div className="poster">
        {m.poster ? <img src={m.poster} alt={`${m.title} poster`} loading="lazy" /> : <div className="noPoster">No poster</div>}
      </div>
      <div className="meta">
        <h3>{m.title}</h3>
        <p className="muted">{m.year}</p>
      </div>
    </Link>
  );
}
