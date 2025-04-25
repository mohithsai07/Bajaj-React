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

  // 1️⃣ Fetch & normalize data once
  useEffect(() => {
    axios
      .get('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then(res => {
        const normalized = res.data.map(doc => ({
          ...doc,
          // turn array of {name} into array of strings:
          specialties: doc.specialities?.map(s => s.name) || [],
          // parse numeric values:
          feesValue: Number(doc.fees.replace(/[^\d]/g, '')) || 0,
          experienceValue: Number(doc.experience.match(/\d+/)?.[0]) || 0
        }));
        setDoctors(normalized);
        setFilteredDoctors(normalized);
      });
  }, []);

  // 2️⃣ Central filter+sort whenever params or data change
  useEffect(() => {
    let result = [...doctors];

    // a) TEXT SEARCH
    const q = searchParams.get('search') || '';
    if (q) {
      result = result.filter(d =>
        d.name.toLowerCase().includes(q.toLowerCase())
      );
    }

    // b) MODE FILTER
    const mode = searchParams.get('mode') || '';
    if (mode) {
      result = result.filter(d =>
        mode === 'Video Consult' ? d.video_consult : d.in_clinic
      );
    }

    // c) SPECIALTIES FILTER
    const spParam = searchParams.get('specialties') || '';
    if (spParam) {
      const specs = spParam.split(',');
      result = result.filter(d =>
        specs.every(s => d.specialties.includes(s))
      );
    }

    // d) SORT
    const sortBy = searchParams.get('sort') || '';
    if (sortBy === 'fees') {
      result.sort((a, b) => a.feesValue - b.feesValue);
    } else if (sortBy === 'experience') {
      result.sort((a, b) => b.experienceValue - a.experienceValue);
    }

    setFilteredDoctors(result);
  }, [searchParams, doctors]);

  return (
    <div className="app">
      <Header doctors={doctors} setSearchParams={setSearchParams} />
      <div className="main-content">
        <FilterPanel
          doctors={doctors}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <DoctorList doctors={filteredDoctors} />
      </div>
    </div>
  );
}
