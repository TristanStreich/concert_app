import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <button className="header-icon-btn">
        <span className="material-symbols-outlined">menu</span>
      </button>
      <h1 className="header-title">My Concert Journal</h1>
      <button className="header-icon-btn">
        <span className="material-symbols-outlined">account_circle</span>
      </button>
    </header>
  );
};

export default Header;
