import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import ArtistList from './components/ArtistList';
import BottomNav from './components/BottomNav';
import AddShowPopup from './components/AddShowPopup';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddShowClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleShowAdded = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="App paper-texture">
      <Header />
      <StatsCards refreshKey={refreshKey} />
      <ArtistList refreshKey={refreshKey} />
      <BottomNav onAddClick={handleAddShowClick} />
      {isPopupOpen && (
        <AddShowPopup onClose={handlePopupClose} onShowAdded={handleShowAdded} />
      )}
    </div>
  );
}

export default App;
