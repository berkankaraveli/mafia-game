// src/components/InventoryPage.jsx
import React, { useState } from 'react';
// ПРОМЯНА 1: Добавяме Link към импортите
import { Link } from 'react-router-dom'; 
import TopBar from '../components/TopBar';
import AvatarCreator from '../components/AvatarCreator';
import { INVENTORY_CATEGORIES, INVENTORY_ITEMS, DEFAULT_SELECTIONS } from '../data/inventoryData';
import './InventoryPage.css';

const InventoryPage = ({ user }) => {
  // ... (Целият код за състоянието и функциите си остава същият) ...
  const [activeCategoryId, setActiveCategoryId] = useState(INVENTORY_CATEGORIES[0].id);
  const [currentSelections, setCurrentSelections] = useState(DEFAULT_SELECTIONS);
  const filteredItems = INVENTORY_ITEMS.filter(item => item.categoryId === activeCategoryId);
  const handleItemClick = (item) => {
    setCurrentSelections(prevSelections => ({
      ...prevSelections,
      [item.categoryId]: item.image
    }));
  };

  return (
    <div className="inventory-page-screen">
      {user && <TopBar user={user} />}

      <div className="inventory-layout-container">
        
        {/* --- ЛЯВА КОЛОНА: АВАТАР И БУТОН НАЗАД --- */}
        <div className="inventory-sidebar-left">
          <div className="avatar-preview-area">
            <h3>ТВОЯТ АВАТАР</h3>
            <div className="avatar-creator-wrapper">
                 <AvatarCreator selections={currentSelections} />
            </div>
          </div>

        </div>

        {/* --- ДЯСНА КОЛОНА: ИНВЕНТАР --- */}
        {/* ... (Останалата част от кода си остава същата) ... */}
        <div className="inventory-main-content">
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
            {/* ПРОМЯНА 2: Добавяме бутона НАЗАД под аватара */}
          <Link to="/" className="back-to-home-btn">
              ← НАЗАД КЪМ НАЧАЛОТО
          </Link>

      </div>
      
    </div>
    
  );
};

export default InventoryPage;