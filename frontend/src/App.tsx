import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ConcertDetails from './components/ConcertDetails';
import ArtistsConcertCount from './components/ArtistsConcertCount';
import AddShowPopup from './components/AddShowPopup';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showsUpdated, setShowsUpdated] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddShowClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleShowAdded = () => {
    setShowsUpdated(!showsUpdated);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="App">
      <button onClick={handleAddShowClick}>Add New Show</button>
      <main>
      {isPopupOpen && (
        <AddShowPopup onClose={handlePopupClose} onShowAdded={handleShowAdded} />
      )}
        {/* <ConcertDetails refreshKey={refreshKey} /> */}
        <ArtistsConcertCount refreshKey={refreshKey} />
      </main>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. Testing. Testing
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
