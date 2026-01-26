import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './AddShowPopup.css';
import AutocompleteInput from './AutocompleteInput';

interface Artist {
  artist_name: string;
  role: string;
}

const AddShowPopup: React.FC<{ onClose: () => void; onShowAdded: () => void }> = ({ onClose, onShowAdded }) => {
  const [concertDate, setConcertDate] = useState('');
  const [venue, setVenue] = useState('');
  const [venues, setVenues] = useState<string[]>([]);
  const [artists, setArtists] = useState<Artist[]>([{ artist_name: '', role: 'headliner' }]);
  const popupRef = useRef<HTMLDivElement>(null);

  // Fetch venues on mount
  useEffect(() => {
    axios.get('/venues')
      .then(res => setVenues(res.data))
      .catch(err => console.error('Error fetching venues:', err));
  }, []);

  const handleArtistChange = (index: number, field: string, value: string) => {
    const newArtists = [...artists];
    newArtists[index] = { ...newArtists[index], [field]: value };
    setArtists(newArtists);
  };

  const addArtist = () => {
    setArtists([...artists, { artist_name: '', role: 'opener' }]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('/add-show', {
        concertDate,
        venue,
        artists,
      });
      onShowAdded();
      onClose();
    } catch (error) {
      console.error('Error adding show:', error);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="popup">
      <div className="popup-inner" ref={popupRef}>
        <h2>Add New Show</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Date:</label>
            <input
              type="date"
              value={concertDate}
              onChange={(e) => setConcertDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Venue:</label>
            <AutocompleteInput
              value={venue}
              onChange={setVenue}
              suggestions={venues}
              placeholder="Start typing venue name..."
              required
            />
          </div>
          <div>
            <label>Artists:</label>
            {artists.map((artist, index) => (
              <div key={index} className="artist-entry">
                <input
                  type="text"
                  placeholder="Artist Name"
                  value={artist.artist_name}
                  onChange={(e) => handleArtistChange(index, 'artist_name', e.target.value)}
                  required
                />
                <select
                  value={artist.role}
                  onChange={(e) => handleArtistChange(index, 'role', e.target.value)}
                >
                  <option value="headliner">Headliner</option>
                  <option value="opener">Opener</option>
                </select>
              </div>
            ))}
            <button type="button" className="add-artist-btn" onClick={addArtist}>+ Add Artist</button>
          </div>
          <div className="popup-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Add Show</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShowPopup;
