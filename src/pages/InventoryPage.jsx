// src/pages/InventoryPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import AvatarCreator from '../components/AvatarCreator';
import { INVENTORY_CATEGORIES, INVENTORY_ITEMS } from '../data/inventoryData';
import './InventoryPage.css';

// --- ИКОНИ ---
// Пълният код за иконите е тук, без съкращения

// SVG икона за вратичка/изход (по-сложна версия, ако решиш да я ползваш)
const ExitIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2v-4h4v-2h-4V7h-2v4H8v2h4z"/ >
    <path fill="currentColor" d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67z" opacity=".3"/>
    <path d="M3 13h9.67l-2.58 2.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3z" fill="currentColor"/>
  </svg>
);

// По-проста икона за изход (която използваме в момента)
const SimpleExitIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);


const InventoryPage = ({ user, savedAvatar, onSave }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(INVENTORY_CATEGORIES[0].id);
  const [currentSelections, setCurrentSelections] = useState(savedAvatar);

  // State за видимостта на съобщението за успех
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
      if (savedAvatar) {
          setCurrentSelections(savedAvatar);
      }
  }, [savedAvatar]);

  // Ефект за автоматично скриване на съобщението след 3 секунди
  useEffect(() => {
      let timer;
      if (showSuccessMessage) {
          timer = setTimeout(() => {
              setShowSuccessMessage(false);
          }, 3000); // 3000ms = 3 секунди
      }
      return () => clearTimeout(timer);
  }, [showSuccessMessage]);


  const filteredItems = INVENTORY_ITEMS.filter(item => item.categoryId === activeCategoryId);

  const handleItemClick = (item) => {
    setCurrentSelections(prevSelections => ({
      ...prevSelections,
      [item.categoryId]: item.image
    }));
  };

  const handleSaveButtonClick = () => {
      if (onSave) {
          console.log("Запазване на аватара...", currentSelections);
          onSave(currentSelections);
          // Показваме съобщението
          setShowSuccessMessage(true);
      }
  };

  return (
    <div className="inventory-page-screen">
      {user && <TopBar user={user} />}

      <div className="inventory-layout-container">
        {/* --- ЛЯВА КОЛОНА --- */}
        <div className="inventory-sidebar-left">
          <div className="avatar-preview-area">
            <div className="avatar-header-container">
                <h3>ТВОЯТ АВАТАР</h3>
                <button
                    className="save-avatar-tick-btn"
                    onClick={handleSaveButtonClick}
                    title="Запази промените"
                >
                    ✓
                </button>
            </div>
            <div className="avatar-creator-wrapper">
                 <AvatarCreator selections={currentSelections} />
            </div>
          </div>
        </div>

        {/* --- ДЯСНА КОЛОНА --- */}
        <div className="inventory-main-content">
          <div className="tabs-and-exit-container">
              <div className="category-tabs-container">
                {INVENTORY_CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    className={`category-tab-btn ${activeCategoryId === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategoryId(category.id)}
                    title={category.name}
                  >
                    <span className="tab-icon">{category.icon}</span>
                  </button>
                ))}
              </div>
              <Link to="/" className="exit-door-btn" title="Назад към началото">
                  <SimpleExitIcon />
              </Link>
          </div>

          <div className="items-grid-scroll-area">
             <div className="items-grid">
              {activeCategoryId !== 'body' && (
                  <div
                    className={`inventory-item-card ${currentSelections[activeCategoryId] === null ? 'equipped' : ''}`}
                    onClick={() => handleItemClick({ categoryId: activeCategoryId, image: null, name: 'None' })}
                  >
                    <div className="item-image-placeholder none-option">None</div>
                    {currentSelections[activeCategoryId] === null && <div className="equipped-badge">✓</div>}
                  </div>
              )}
              {filteredItems.map(item => {
                const isEquipped = currentSelections[item.categoryId] === item.image;
                return (
                  <div
                    key={item.id}
                    className={`inventory-item-card ${isEquipped ? 'equipped' : ''}`}
                    onClick={() => handleItemClick(item)}
                    title={item.name}
                  >
                    {item.image && (
                        <img src={item.image} alt={item.name} className="item-thumbnail" />
                    )}
                      {isEquipped && <div className="equipped-badge">✓</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* --- ИЗСКАЧАЩО СЪОБЩЕНИЕ (TOAST) --- */}
      <div className={`success-toast-container ${showSuccessMessage ? 'active' : ''}`}>
          <div className="success-toast-content">
              <span className="toast-icon">✓</span>
              Твоите промени са запазени!
          </div>
      </div>

    </div>
  );
};

export default InventoryPage;