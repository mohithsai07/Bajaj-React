// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import './Header.css';
export default function Header({ doctors, setSearchParams }) {
  const [query,setQuery] = useState('');
  const [sugg,setSugg] = useState([]);
  useEffect(()=>{
    if(!query.trim()){ setSugg([]); setSearchParams({}); return; }
    setSugg(doctors.filter(d=>d.name.toLowerCase().includes(query.toLowerCase())).slice(0,5));
  },[query,doctors]);
  const pick = name=>{ setQuery(name); setSugg([]); setSearchParams({search:name}); };
  return (
    <header className="site-header">
      <div className="container">
        <input data-testid="autocomplete-input" className="search-input"
          value={query} onChange={e=>setQuery(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&pick(query)}
          placeholder="Search doctor by name" />
        <span className="search-icon">🔍</span>
      </div>
      {sugg.length>0&&(
        <ul className="suggestions-list">
          {sugg.map((s,i)=><li key={i} data-testid="suggestion-item" onClick={()=>pick(s.name)}>{s.name}</li>)}
        </ul>
      )}
    </header>
  );
}