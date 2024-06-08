import { useState } from 'react';
import './App.css';
import ArtistsConcertCount from './components/ArtistsConcertCount';
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
    <div className="App">
      <main>
        <ArtistsConcertCount refreshKey={refreshKey} />
      </main>
      <button className="add-show-button" onClick={handleAddShowClick}><strong>+</strong></button>
      {isPopupOpen && (
        <AddShowPopup onClose={handlePopupClose} onShowAdded={handleShowAdded} />
      )}
    </div>
  );
}

export default App;
