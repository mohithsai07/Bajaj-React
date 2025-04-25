// src/components/DoctorList.jsx
import React from 'react';
import DoctorCard from './DoctorCard';
import './DoctorList.css';
export default function DoctorList({ doctors }) {
  return <div className="doctor-list">{doctors.map((d,i)=><DoctorCard key={i} doctor={d}/>)}
  </div>;
}