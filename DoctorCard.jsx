import React from 'react';
import { FaMapMarkerAlt, FaHospital } from 'react-icons/fa';
import './DoctorCard.css';

export default function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card" data-testid="doctor-card">
      <div className="card-header">
        <div className="doctor-title">
          <h3 data-testid="doctor-name">{doctor.name}</h3>
          <p data-testid="doctor-specialty">
            {doctor.specialties.length
              ? doctor.specialties.join(', ')
              : 'No specialties available'}
          </p>
        </div>
        <button className="book-btn-header" data-testid="book-appointment-button">
          Book Appointment
        </button>
      </div>

      <p data-testid="doctor-experience" className="experience">
        {doctor.experienceValue} years experience
      </p>

      <div className="doctor-meta">
        <FaHospital className="meta-icon" />
        <span className="meta-text">{doctor.clinic.name}</span>
      </div>
      <div className="doctor-meta">
        <FaMapMarkerAlt className="meta-icon" />
        <span className="meta-text">{doctor.clinic.address.locality}, {doctor.clinic.address.city}</span>
      </div>

      <div className="card-footer">
        <p data-testid="doctor-fee" className="fee">
          ₹{doctor.feesValue}
        </p>
      </div>
    </div>
  );
}
