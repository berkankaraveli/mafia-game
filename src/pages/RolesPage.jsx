// src/components/RolesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
// Увери се, че пътят до твоя roles.js файл е правилен!
import { ROLES } from '../data/roles';
import './RolesPage.css';

const RolesPage = ({ user }) => {
  return (
    <div className="roles-page-screen">
      {/* Показваме TopBar само ако имаме потребител */}
      {user && <TopBar user={user} />}

      <div className="roles-content-container">
        <h1 className="page-title">ОПИСАНИЕ НА РОЛИТЕ</h1>

        <div className="roles-grid">
          {ROLES.map((role) => (
            <div key={role.id} className="role-card">
              <div className="role-image-wrapper">
                  {/* ПРОМЯНА: Тук директно използваме role.image,
                     защото в твоя roles.js те са вече импортирани обекти.
                  */}
                  <img 
                    src={role.image} 
                    alt={role.name} 
                    className="role-image" 
                  />
              </div>
              <h3 className="role-name">{role.name}</h3>
              <p className="role-description">{role.description}</p>
            </div>
          ))}
        </div>

        <Link to="/" className="back-button-fixed">
           НАЗАД КЪМ МЕНЮТО
        </Link>
      </div>
    </div>
  );
};

export default RolesPage;