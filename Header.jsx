import React, { useState, useEffect } from 'react';
import './Header.css';

export default function Header({ doctors, setSearchParams }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setSearchParams({});
      return;
    }
    const matches = doctors
      .filter(d => d.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3);
    setSuggestions(matches);
  }, [query, doctors]);

  const select = name => {
    setQuery(name);
    setSuggestions([]);
    setSearchParams({ search: name });
  };

  return (
    <header className="site-header">
      <div className="container">
        <input
          data-testid="autocomplete-input"
          className="search-input"
          type="text"
          placeholder="Search doctor by name"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && select(query)}
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s, i) => (
            <li
              key={i}
              data-testid="suggestion-item"
              onClick={() => select(s.name)}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
