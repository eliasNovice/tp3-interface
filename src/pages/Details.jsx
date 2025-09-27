import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovie } from '../api/omdb';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie]   = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError]   = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setStatus('loading');
      try { const m = await getMovie(id); if (!cancelled){ setMovie(m); setStatus('done'); } }
      catch(e){ if (!cancelled){ setError(e.message || 'Error'); setStatus('error'); } }
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (status==='loading') return <p>Loading…</p>;
  if (status==='error')   return <><button onClick={()=>navigate(-1)}>&larr; Back</button><p className="error">{error}</p></>;

  return (
    <div className="page">
      <button onClick={()=>navigate(-1)}>&larr; Back</button>
      <div className="details">
        <div className="poster-lg">
          {movie.poster ? <img src={movie.poster} alt={`${movie.title} poster`} /> : <div className="noPoster">No poster</div>}
        </div>
        <div className="info">
          <h1>{movie.title} <span className="muted">({movie.year})</span></h1>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p><strong>Runtime:</strong> {movie.runtime}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Actors:</strong> {movie.actors}</p>
          <p className="plot">{movie.plot}</p>
        </div>
      </div>
    </div>
  );
}
