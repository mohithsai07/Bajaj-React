import React, { useState, useEffect, useMemo } from 'react';
import './FilterPanel.css';

export default function FilterPanel({ doctors, searchParams, setSearchParams }) {
  // build unique specialties list from normalized doctors[]
  const specialtiesList = useMemo(() => {
    return Array.from(
      new Set(doctors.flatMap(d => d.specialties))
    );
  }, [doctors]);

  const [mode, setMode] = useState(searchParams.get('mode') || '');
  const [specs, setSpecs] = useState(
    searchParams.get('specialties')?.split(',') || []
  );
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '');

  // whenever filters change, push into URL
  useEffect(() => {
    const p = {};
    if (searchParams.get('search')) p.search = searchParams.get('search');
    if (mode) p.mode = mode;
    if (specs.length) p.specialties = specs.join(',');
    if (sortBy) p.sort = sortBy;
    setSearchParams(p);
  }, [mode, specs, sortBy]);

  const toggleSpec = spec =>
    setSpecs(prev =>
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    );

  return (
    <aside className="filter-panel">
      <section>
        <h4 data-testid="filter-header-sort">Sort</h4>
        <label>
          <input
            type="radio"
            data-testid="sort-fees"
            checked={sortBy === 'fees'}
            onChange={() => setSortBy('fees')}
          /> Fees (Low→High)
        </label>
        <label>
          <input
            type="radio"
            data-testid="sort-experience"
            checked={sortBy === 'experience'}
            onChange={() => setSortBy('experience')}
          /> Experience (High→Low)
        </label>
      </section>

      <section>
        <h4 data-testid="filter-header-speciality">Speciality</h4>
        <div className="checkbox-list">
          {specialtiesList.map(spec => {
            const id = `filter-specialty-${spec.replace(/[\s/]+/g, '-')}`;
            return (
              <label key={spec}>
                <input
                  type="checkbox"
                  data-testid={id}
                  checked={specs.includes(spec)}
                  onChange={() => toggleSpec(spec)}
                />{' '}
                {spec}
              </label>
            );
          })}
        </div>
      </section>

      <section>
        <h4 data-testid="filter-header-moc">Consultation Mode</h4>
        <label>
          <input
            type="radio"
            data-testid="filter-video-consult"
            checked={mode === 'Video Consult'}
            onChange={() => setMode('Video Consult')}
          /> Video Consult
        </label>
        <label>
          <input
            type="radio"
            data-testid="filter-in-clinic"
            checked={mode === 'In Clinic'}
            onChange={() => setMode('In Clinic')}
          /> In Clinic
        </label>
      </section>
    </aside>
);
}
