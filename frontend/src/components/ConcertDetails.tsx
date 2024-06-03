import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ConcertDetail {
  artist_name: string;
  role: string;
  concert_date: string;
  venue: string;
}

const ConcertDetails: React.FC<{ refreshKey: number }> = ({ refreshKey }) => {
  const [concertDate, setConcertDate] = useState('');
  const [venue, setVenue] = useState('');
  const [results, setResults] = useState<ConcertDetail[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async () => {
    try {
      setError(null);
      const response = await axios.get<ConcertDetail[]>('/getShow', {
        params: { concertDate, venue },
      });
      setResults(response.data);
    } catch (error) {
      setError('Error fetching concert details. Please try again.');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchDetails();
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get<ConcertDetail[]>('/api/concert-lineups/details');
        setResults(response.data);
      } catch (error) {
        setError('Error fetching concert details. Please try again.');
      }
    };

    fetchDetails();
  }, [refreshKey]); // Use refreshKey to trigger a refresh

  return (
    <div>
      <h2>Search Concert Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Concert Date:</label>
          <input
            type="date"
            value={concertDate}
            onChange={(e) => setConcertDate(e.target.value)}
          />
        </div>
        <div>
          <label>Venue:</label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <div>
        <h3>Results:</h3>
        {results.length > 0 ? (
          <ul>
            {results.map((detail, index) => (
              <li key={index}>
                <strong>Artist:</strong> {detail.artist_name}, <strong>Role:</strong> {detail.role}, <strong>Date:</strong> {detail.concert_date}, <strong>Venue:</strong> {detail.venue}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default ConcertDetails;
