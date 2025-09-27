import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { searchMovies } from '../api/omdb';

export default function Home() {
  const [params, setParams] = useSearchParams();
  const initialQ = params.get('q') || '';

  const [query, setQuery]   = useState(initialQ);
  const [page, setPage]     = useState(1);
  const [items, setItems]   = useState([]);
  const [total, setTotal]   = useState(0);
  const [status, setStatus] = useState('idle'); // idle | loading | error | done
  const [error, setError]   = useState('');

  useEffect(() => {
    if (!query) return;
    let cancelled = false;
    (async () => {
      setStatus('loading'); setError('');
      try {
        const { results, total, error } = await searchMovies(query, page);
        if (cancelled) return;
        if (error) { setItems([]); setTotal(0); setStatus('error'); setError(error); }
        else { setItems(p => page===1 ? results : [...p, ...results]); setTotal(total); setStatus('done'); }
      } catch (e) { if (!cancelled) { setStatus('error'); setError(e.message || 'Network error'); } }
    })();
    return () => { cancelled = true; };
  }, [query, page]);

  function onSearch(term){ setParams({ q: term }); setQuery(term); setPage(1); }
  const canLoadMore = items.length < total && status === 'done';

  return (
    <div className="page">
      <SearchBar onSearch={onSearch} initial={initialQ} />
      {status==='idle'    && <p className="muted">Search for a movie…</p>}
      {status==='loading' && <p>Loading…</p>}
      {status==='error'   && <p className="error">{error}</p>}
      {status==='done'    && <>
        <MovieList items={items} />
        {canLoadMore && <div className="center"><button onClick={()=>setPage(p=>p+1)}>Load more</button></div>}
      </>}
    </div>
  );
}
