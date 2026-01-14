// src/pages/GuildPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { MOCK_GUILDS, GUILD_CREATION_COST } from '../data/guildsData';
import './GuildPage.css';

// Икона за хора/членове
const MembersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

// НОВО: Икона за изход (вратичка) - същата като в Инвентара
const SimpleExitIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);

const GuildPage = ({ user }) => {
  const [selectedGuild, setSelectedGuild] = useState(null);
  const [isCreatingMode, setIsCreatingMode] = useState(false);
  const [newGuildName, setNewGuildName] = useState('');

  const handleGuildClick = (guild) => {
    setSelectedGuild(guild);
    setIsCreatingMode(false);
  };

  const handleCreateModeClick = () => {
      setIsCreatingMode(true);
      setSelectedGuild(null);
  };

  const handleCreateSubmit = (e) => {
      e.preventDefault();
      if (!user) return;

      if (user.gold < GUILD_CREATION_COST) {
          alert("Нямаш достатъчно злато!");
          return;
      }
      if (newGuildName.trim().length < 3) {
          alert("Името трябва да е поне 3 символа.");
          return;
      }

      alert(`Успешно създаде гилдия: ${newGuildName}! (Симулация)`);
      setNewGuildName('');
      setIsCreatingMode(false);
  };


  return (
    <div className="guild-page-screen">
      {user && <TopBar user={user} />}

      <div className="guild-layout-container">

        {/* --- ЛЯВА КОЛОНА: СПИСЪК С ГИЛДИИ --- */}
        <div className="guild-sidebar-left">
            <div className="guild-list-header">
                <h3>РЕГИСТЪР</h3>
                <button className="create-guild-btn-small" onClick={handleCreateModeClick} title="Създай собствена гилдия">
                    + СЪЗДАЙ
                </button>
            </div>
            <div className="guild-list-scroll-area">
                {MOCK_GUILDS.map(guild => {
                    const isFull = guild.membersCount >= guild.capacity;
                    const isActive = selectedGuild?.id === guild.id;
                    return (
                        <div
                            key={guild.id}
                            className={`guild-list-item ${isActive ? 'active' : ''} ${isFull ? 'full' : ''}`}
                            onClick={() => handleGuildClick(guild)}
                        >
                            <div className="guild-item-name">{guild.name}</div>
                            <div className="guild-item-members">
                                <MembersIcon />
                                <span>{guild.membersCount}/{guild.capacity}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>


        {/* --- ДЯСНА КОЛОНА: ДЕТАЙЛИ И БУТОН ЗА ИЗХОД --- */}
        <div className="guild-main-content">
            
            {/* НОВО: Хедър на дясната колона с бутона за изход */}
            <div className="guild-right-header">
                 <Link to="/" className="exit-door-btn-guild" title="Назад към началото">
                      <SimpleExitIcon />
                 </Link>
            </div>

            {/* НОВО: Обвивка за скролващото се съдържание */}
            <div className="guild-content-scroll-wrapper">
                <div className="guild-details-panel">

                    {/* ВАРИАНТ 1: Режим СЪЗДАВАНЕ */}
                    {isCreatingMode && (
                        <div className="create-guild-form-container">
                            <h2>СЪЗДАВАНЕ НА ГИЛДИЯ</h2>
                            <p className="guild-lore-text">Готов ли си да поведеш свои хора? Основаването на нова фракция изисква ресурси и репутация.</p>

                            <form onSubmit={handleCreateSubmit} className="creation-form">
                                <div className="form-group">
                                    <label htmlFor="guildName">Име на Гилдията:</label>
                                    <input
                                        type="text"
                                        id="guildName"
                                        value={newGuildName}
                                        onChange={(e) => setNewGuildName(e.target.value)}
                                        placeholder="Напр. Черните Ястреби..."
                                        maxLength={30}
                                    />
                                </div>

                                <div className="cost-display">
                                    Цена за създаване: <span className="gold-cost">{GUILD_CREATION_COST} 🟡</span>
                                </div>

                                {user && user.gold < GUILD_CREATION_COST && (
                                    <p className="error-text">Нямаш достатъчно злато!</p>
                                )}

                                <button
                                    type="submit"
                                    className="confirm-create-btn"
                                    disabled={!user || user.gold < GUILD_CREATION_COST || newGuildName.length < 3}
                                >
                                    ОСНОВИ ГИЛДИЯТА
                                </button>
                            </form>
                        </div>
                    )}

                    {/* ВАРИАНТ 2: Избрана е ГИЛДИЯ */}
                    {!isCreatingMode && selectedGuild && (
                        <div className="guild-info-container">
                            <h1 className="selected-guild-name">{selectedGuild.name}</h1>
                            <div className="guild-meta-info">
                                <div className="meta-item">Лидер: <span className="highlight">{selectedGuild.leader}</span></div>
                                <div className="meta-item">Членове: <span className="highlight">{selectedGuild.membersCount} / {selectedGuild.capacity}</span></div>
                                <div className="meta-item">Мин. Ниво: <span className="highlight">{selectedGuild.minLevel}</span></div>
                            </div>

                            <div className="guild-description-box">
                                <h3>ОПИСАНИЕ</h3>
                                <p>{selectedGuild.description}</p>
                            </div>

                            <div className="guild-actions">
                                {selectedGuild.membersCount < selectedGuild.capacity ? (
                                    <button className="join-guild-btn main-action-btn">
                                        {selectedGuild.isOpen ? 'ВЛЕЗ В ГИЛДИЯТА' : 'КАНДИДАТСТВАЙ'}
                                    </button>
                                ) : (
                                    <button className="guild-full-btn" disabled>ГИЛДИЯТА Е ПЪЛНА</button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ВАРИАНТ 3: Нищо не е избрано */}
                    {!isCreatingMode && !selectedGuild && (
                        <div className="no-selection-placeholder">
                            <h3>ЗАЛАТА НА ГИЛДИИТЕ</h3>
                            <p>Избери гилдия от регистъра вляво или създай своя собствена фракция.</p>
                            <div style={{marginTop: '40px', opacity: 0.5, fontSize: '2rem'}}>
                                ←
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
      </div>
      {/* ПРЕМАХНАТО: Долната навигация вече я няма */}
    </div>
  );
};

export default GuildPage;