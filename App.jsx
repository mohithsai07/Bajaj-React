import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import './App.css';

export default function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios
      .get('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then(res => {
        setDoctors(res.data);
        setFilteredDoctors(res.data);
      });
  }, []);

  useEffect(() => {
    let result = [...doctors];
    const q = searchParams.get('search') || '';
    if (q) result = result.filter(d => d.name.toLowerCase().includes(q.toLowerCase()));
    const mode = searchParams.get('mode') || '';
    if (mode) result = result.filter(d => d.consultation_type === mode);
    const sp = searchParams.get('specialties') || '';
    if (sp) {
      const arr = sp.split(',');
      result = result.filter(d => arr.every(s => (d.specialties || []).includes(s)));
    }
    const sort = searchParams.get('sort') || '';
    if (sort === 'fees') result.sort((a,b) => a.fees - b.fees);
    if (sort === 'experience') result.sort((a,b) => b.experience - a.experience);
    setFilteredDoctors(result);
  }, [searchParams, doctors]);

  return (
    <div className="app">
      <Header doctors={doctors} setSearchParams={setSearchParams} />
      <div className="main-content">
        <FilterPanel searchParams={searchParams} setSearchParams={setSearchParams} />
        <DoctorList doctors={filteredDoctors} />
      </div>
    </div>
  );
}