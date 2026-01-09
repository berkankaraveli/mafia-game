// src/components/RolesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { ROLES } from '../data/roles';
import './RolesPage.css';
// Импортираме задната картинка
import zadnaImage from '/assets/zadna.png';

const RolesPage = ({ user }) => {
  return (
    <div className="roles-page-screen">
      {user && <TopBar user={user} />}

      <div className="roles-content-container">
        <h1 className="page-title">ОПИСАНИЕ НА РОЛИТЕ</h1>
        
        <div className="roles-grid">
          {ROLES.map((role) => (
            // --- ГЛАВЕН КОНТЕЙНЕР (Определя размера) ---
            <div key={role.id} className="role-card-container">
              {/* --- ВЪТРЕШЕН КОНТЕЙНЕР (Той се върти) --- */}
              <div className="role-card-inner">
                
                {/* ПРЕДНА ЧАСТ (Снимката) */}
                <div className="role-card-front">
                  <img 
                    src={role.image} 
                    alt={role.name} 
                    className="role-image-full" 
                  />
                </div>

                {/* ЗАДНА ЧАСТ (zadna.png + Текст) */}
                <div 
                    className="role-card-back" 
                    style={{ backgroundImage: `url(${zadnaImage})` }}
                >
                  {/* Текстов слой, който ще се появява със закъснение */}
                  <div className="role-text-overlay-back-delayed">
                    <h3 className="role-name">{role.name}</h3>
                    <p className="role-description">{role.description}</p>
                  </div>
                </div>

              </div>
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