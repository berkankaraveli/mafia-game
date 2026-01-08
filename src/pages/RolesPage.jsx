import React from 'react';
import { Link } from 'react-router-dom';
// Тук по-късно ще импортнем ROLES от data/roles.js и ще ги покажем

const RolesPage = () => {
  const pageStyle = {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    height: '100vh', color: 'white', fontSize: '2rem', textShadow: '2px 2px 4px black'
  };

  return (
    <div style={pageStyle}>
      <h1>ВСИЧКИ РОЛИ</h1>
      <p>(Тази страница е в процес на разработка)</p>
      <Link to="/" className="big-play-btn" style={{marginTop: '20px', textDecoration: 'none', maxWidth: '200px' ,marginRight: '100px'}}>НАЗАД</Link>
    </div>
  );
};

export default RolesPage;