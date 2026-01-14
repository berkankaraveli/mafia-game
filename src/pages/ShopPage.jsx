// src/pages/ShopPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
// ПРОМЯНА: Импортираме и GOLD_PACKS
import { SHOP_BUNDLES, DIAMOND_PACKS, GOLD_PACKS } from '../data/shopData';
import './ShopPage.css';

// Икони за валути
const DiamondIcon = () => <span style={{color: '#00BFFF', textShadow: '0 0 5px #00BFFF'}}>💎</span>;
const GoldIcon = () => <span style={{color: 'gold', textShadow: '0 0 5px gold'}}>🟡</span>;

const SimpleExitIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);

const ShopPage = ({ user }) => {
  const [selectedBundle, setSelectedBundle] = useState(SHOP_BUNDLES[0]);

  const handleBundleClick = (bundle) => {
    setSelectedBundle(bundle);
  };

  const handleBuyBundle = () => {
      if (!user || !selectedBundle) return;
      const cost = selectedBundle.price;
      const currency = selectedBundle.currency;
      const userBalance = currency === 'diamonds' ? user.diamonds : user.gold;

      if (userBalance < cost) {
          alert(`Нямаш достатъчно ${currency === 'diamonds' ? 'диаманти' : 'злато'}!`);
      } else {
          alert(`Успешно купи "${selectedBundle.name}" за ${cost} ${currency === 'diamonds' ? 'диаманта' : 'злато'}! (Симулация)`);
      }
  };

  const handleBuyDiamonds = (pack) => {
      alert(`Симулация на плащане: ${pack.priceBG} за ${pack.diamonds} диаманта.`);
  };

  // НОВО: Функция за купуване на злато
  const handleBuyGold = (pack) => {
      alert(`Симулация на плащане: ${pack.priceBG} за ${pack.gold} злато.`);
  };


  return (
    <div className="shop-page-screen">
      {user && <TopBar user={user} />}

      {/* --- ГЛАВНА СЕКЦИЯ (ГОРНА) --- */}
      <div className="shop-main-section">
         {/* ... (Този код си остава същият като преди) ... */}
        <div className="shop-sidebar-left">
            <h2 className="section-title">ЕКСКЛУЗИВНИ ОФЕРТИ</h2>
            <div className="bundles-list-scroll">
                {SHOP_BUNDLES.map(bundle => (
                    <div
                        key={bundle.id}
                        className={`bundle-list-item ${selectedBundle?.id === bundle.id ? 'active' : ''} ${bundle.isFeatured ? 'featured-item' : ''}`}
                        onClick={() => handleBundleClick(bundle)}
                    >
                        <div className="bundle-icon-placeholder">
                            <img src={bundle.image} alt={bundle.name} onError={(e) => e.target.style.display='none'}/>
                        </div>
                        <div className="bundle-info-small">
                            <div className="bundle-name-small">{bundle.name}</div>
                            <div className="bundle-price-small">
                                {bundle.currency === 'diamonds' ? <DiamondIcon /> : <GoldIcon />}
                                {bundle.price}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="shop-preview-container">
            <Link to="/" className="shop-exit-door-btn" title="Назад към началото">
                <SimpleExitIcon />
            </Link>
            {selectedBundle ? (
                <div className="bundle-preview-content" style={{backgroundImage: `url(${selectedBundle.image})`}}>
                    <div className="preview-overlay">
                        <h1 className="preview-title">{selectedBundle.name}</h1>
                        <p className="preview-description">{selectedBundle.description}</p>
                        <div className="preview-items-list">
                            <h3>СЪДЪРЖАНИЕ:</h3>
                            <ul>
                                {selectedBundle.items.map((item, index) => (
                                    <li key={index}>{item.name} <span className="item-type">({item.type})</span></li>
                                ))}
                            </ul>
                        </div>
                        <div className="preview-actions">
                             <button className="preview-btn preview-mode-btn">👀 ПРЕГЛЕД НА ГЕРОЯ</button>
                             <button className={`preview-btn buy-btn ${selectedBundle.currency}`} onClick={handleBuyBundle}>
                                 КУПИ ЗА {selectedBundle.price} {selectedBundle.currency === 'diamonds' ? <DiamondIcon /> : <GoldIcon />}
                             </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="no-selection-placeholder">Избери оферта от списъка</div>
            )}
        </div>
      </div>


      {/* --- ДОЛНА СЕКЦИЯ (ВАЛУТИ) - ПРОМЕНЕНА СТРУКТУРА --- */}
      {/* Преименувахме класа на по-общ */}
      <div className="shop-currency-section">
          
          {/* КОЛОНА 1: ДИАМАНТИ */}
          <div className="currency-column diamonds-theme">
              <h2 className="section-title currency-title">ЗАРЕДИ ДИАМАНТИ</h2>
              {/* Преименувахме grid класа */}
              <div className="currency-grid">
                  {DIAMOND_PACKS.map(pack => (
                      // Преименувахме card класа и добавихме специфичен 'diamonds' клас
                      <div key={pack.id} className={`currency-card diamonds ${pack.isPopular ? 'popular' : ''}`} onClick={() => handleBuyDiamonds(pack)}>
                          {pack.isPopular && <div className="popular-badge">НАЙ-ПОПУЛЯРЕН</div>}
                          {/* Преименувахме icon класа */}
                          <div className="currency-icon-large">
                              <DiamondIcon />
                          </div>
                          <div className="currency-amount">
                              <DiamondIcon /> {pack.diamonds}
                          </div>
                          <button className="buy-currency-btn">
                              {pack.priceBG}
                          </button>
                          <div className="price-eur">({pack.priceEUR})</div>
                      </div>
                  ))}
              </div>
          </div>

          {/* КОЛОНА 2: ЗЛАТО (НОВО) */}
          <div className="currency-column gold-theme">
              <h2 className="section-title currency-title">КУПИ МОНЕТИ</h2>
              <div className="currency-grid">
                  {GOLD_PACKS.map(pack => (
                      // Тук ползваме 'gold' клас
                      <div key={pack.id} className={`currency-card gold ${pack.isPopular ? 'popular' : ''}`} onClick={() => handleBuyGold(pack)}>
                          {pack.isPopular && <div className="popular-badge">НАЙ-ПОПУЛЯРЕН</div>}
                          <div className="currency-icon-large">
                              <GoldIcon />
                          </div>
                          {/* Форматираме големите числа с toLocaleString за запетайки (напр. 10,000) */}
                          <div className="currency-amount">
                              <GoldIcon /> {pack.gold.toLocaleString()}
                          </div>
                          <button className="buy-currency-btn">
                              {pack.priceBG}
                          </button>
                          <div className="price-eur">({pack.priceEUR})</div>
                      </div>
                  ))}
              </div>
          </div>

      </div>

    </div>
  );
};

export default ShopPage;