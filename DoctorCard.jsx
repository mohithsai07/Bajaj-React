import React from 'react';
import { FaMapMarkerAlt, FaHospital } from "react-icons/fa";
import './DoctorCard.css';

export default function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">
      <div className="doctor-info">
        <h3>{doctor.name}</h3>
        <p>{doctor.degree}</p>
        <p><FaMapMarkerAlt /> {doctor.location}</p>
        <p><FaHospital /> {doctor.clinic_name}</p>
        <p>
          <strong>Specialties: </strong>
          {doctor.specialties && doctor.specialties.length > 0
            ? doctor.specialties.join(', ')
            : 'No specialties available'}
        </p>
        <p><strong>Fees: </strong>₹{doctor.fees}</p>
        <p><strong>Experience: </strong>{doctor.experience} years</p>
      </div>
    </div>
  );
}
