// src/components/RolesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { ROLES } from '../data/roles';
import './RolesPage.css';

// Икона за изход (вратичка)
const SimpleExitIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);

const RolesPage = ({ user }) => {
  // State за избраната роля. Начално избираме първата.
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);

  // Ефект за предварително зареждане на картинките, за да няма мигане при смяна
  useEffect(() => {
    ROLES.forEach(role => {
        const img = new Image();
        img.src = role.image;
    });
  }, []);

  return (
    <div className="roles-page-screen">
      {user && <TopBar user={user} />}

      <div className="roles-layout-container">

        {/* --- ЛЯВА КОЛОНА: СПИСЪК С РОЛИ --- */}
        <div className="roles-sidebar-left">
            <h2 className="sidebar-title">СПИСЪК НА РОЛИТЕ</h2>
            <div className="roles-list-scroll">
                {ROLES.map((role) => (
                    <div 
                        key={role.id} 
                        className={`role-list-item ${selectedRole.id === role.id ? 'active' : ''}`}
                        onClick={() => setSelectedRole(role)}
                    >
                        {/* Малка иконка от голямата снимка */}
                        <div className="role-item-icon" style={{backgroundImage: `url(${role.image})`}}></div>
                        <div className="role-item-name">{role.name}</div>
                    </div>
                ))}
            </div>
        </div>


        {/* --- ДЯСНА КОЛОНА: ДЕТАЙЛИ ЗА РОЛЯТА --- */}
        <div className="roles-details-panel">
             {/* БУТОН ЗА ИЗХОД ГОРЕ ВДЯСНО */}
             <Link to="/" className="roles-exit-door-btn" title="Назад към началото">
                <SimpleExitIcon />
            </Link>

            {/* Голям банер със снимката */}
            <div className="role-banner-image" style={{backgroundImage: `url(${selectedRole.image})`}}>
                <div className="role-banner-overlay">
                    <h1 className="selected-role-title">{selectedRole.name}</h1>
                </div>
            </div>
            
            {/* Секция с описание */}
            <div className="role-description-container">
                <h3>ИНФОРМАЦИЯ И УМЕНИЯ</h3>
                <div className="role-description-box">
                    <p>{selectedRole.description}</p>
                    {/* Тук в бъдеще може да добавиш списък с конкретни умения, ако имаш такива в данните */}
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default RolesPage;