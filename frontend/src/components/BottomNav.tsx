import React from 'react';
import './BottomNav.css';

interface BottomNavProps {
  onAddClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onAddClick }) => {
  return (
    <nav className="bottom-nav">
      <button className="nav-item active">
        <span className="material-symbols-outlined">auto_stories</span>
        <span className="nav-label">Journal</span>
      </button>
      <button className="nav-item">
        <span className="material-symbols-outlined">location_on</span>
        <span className="nav-label">Venues</span>
      </button>

      <button className="add-button" onClick={onAddClick}>
        <span className="material-symbols-outlined">add</span>
      </button>

      <button className="nav-item">
        <span className="material-symbols-outlined">bar_chart</span>
        <span className="nav-label">Stats</span>
      </button>
      <button className="nav-item">
        <span className="material-symbols-outlined">settings</span>
        <span className="nav-label">Settings</span>
      </button>
    </nav>
  );
};

export default BottomNav;
