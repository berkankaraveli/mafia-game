import React from 'react';
import { Link } from 'react-router-dom'; // Използваме Link вместо <a href>

const ShopPage = () => {
  // Временен стил за центриране
  const pageStyle = {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    height: '100vh', color: 'white', fontSize: '2rem', textShadow: '2px 2px 4px black'
  };

  return (
    <div style={pageStyle}>
      <h1>МАГАЗИН</h1>
      <p>(Тази страница е в процес на разработка)</p>
      {/* Бутон за връщане назад към началния екран */}
      <Link to="/" className="big-play-btn" style={{marginTop: '20px', textDecoration: 'none', maxWidth: '200px' ,marginRight: '100px'}}>
        НАЗАД
      </Link>
    </div>
  );
};

export default ShopPage;