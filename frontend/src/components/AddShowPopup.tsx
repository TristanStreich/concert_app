import React, { useState } from 'react';
import axios from 'axios';

interface Artist {
  artist_name: string;
  role: string;
}

const AddShowPopup: React.FC<{ onClose: () => void; onShowAdded: () => void }> = ({ onClose, onShowAdded }) => {
  const [concertDate, setConcertDate] = useState('');
  const [venue, setVenue] = useState('');
  const [artists, setArtists] = useState<Artist[]>([{ artist_name: '', role: 'headliner' }]);

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

  return (
    <div className="popup">
      <div className="popup-inner">
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
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Artists:</label>
            {artists.map((artist, index) => (
              <div key={index}>
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
            <button type="button" onClick={addArtist}>Add Artist</button>
          </div>
          <button type="submit">Add Show</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddShowPopup;
