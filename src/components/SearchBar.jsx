import { useState } from 'react';

export default function SearchBar({ onSearch, initial = '' }) {
  const [q, setQ] = useState(initial);
  function submit(e){ e.preventDefault(); const t=q.trim(); if(t) onSearch(t); }
  return (
    <form onSubmit={submit} className="search">
      <input
        aria-label="Search movies by title"
        placeholder="Search for a movie…"
        value={q}
        onChange={(e)=>setQ(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
