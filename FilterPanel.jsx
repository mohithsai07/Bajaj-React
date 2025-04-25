// src/components/FilterPanel.jsx
import React, { useState, useEffect } from 'react';
import './FilterPanel.css';
const specialtiesList = [
  'General Physician','Dentist','Dermatologist','Paediatrician','Gynaecologist',
  'ENT','Diabetologist','Cardiologist','Physiotherapist','Endocrinologist',
  'Orthopaedic','Ophthalmologist','Gastroenterologist','Pulmonologist',
  'Psychiatrist','Urologist','Dietitian Nutritionist','Psychologist',
  'Sexologist','Nephrologist','Neurologist','Oncologist','Ayurveda','Homeopath'
];
export default function FilterPanel({ searchParams, setSearchParams }) {
  const [mode,setMode]=useState(searchParams.get('mode')||'');
  const [specs,setSpecs]=useState(searchParams.get('specialties')?.split(',')||[]);
  const [sort,setSort]=useState(searchParams.get('sort')||'');
  useEffect(()=>{
    const p={};
    if(searchParams.get('search'))p.search=searchParams.get('search');
    if(mode)p.mode=mode;
    if(specs.length)p.specialties=specs.join(',');
    if(sort)p.sort=sort;
    setSearchParams(p);
  },[mode,specs,sort]);
  const toggle=s=>setSpecs(prev=>prev.includes(s)?prev.filter(x=>x!==s):[...prev,s]);
  return (
    <aside className="filter-panel">
      <section>
        <h4 data-testid="filter-header-sort">Sort by</h4>
        <label><input type="radio" data-testid="sort-fees" checked={sort==='fees'} onChange={()=>setSort('fees')} /> Fees (Low→High)</label>
        <label><input type="radio" data-testid="sort-experience" checked={sort==='experience'} onChange={()=>setSort('experience')} /> Experience (High→Low)</label>
      </section>
      <section>
        <h4 data-testid="filter-header-speciality">Specialties</h4>
        <div className="checkbox-list">
          {specialtiesList.map(sp=><label key={sp}><input type="checkbox" data-testid={`filter-specialty-${sp.replace(/\s+/g,'-')}`} checked={specs.includes(sp)} onChange={()=>toggle(sp)} /> {sp}</label>)}
        </div>
      </section>
      <section>
        <h4 data-testid="filter-header-moc">Consultation type</h4>
        <label><input type="radio" data-testid="filter-video-consult" checked={mode==='Video Consult'} onChange={()=>setMode('Video Consult')} /> Video Consult</label>
        <label><input type="radio" data-testid="filter-in-clinic" checked={mode==='In Clinic'} onChange={()=>setMode('In Clinic')} /> In Clinic</label>
      </section>
    </aside>
  );
}