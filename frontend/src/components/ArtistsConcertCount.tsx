import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ArtistConcertCount {
  artist_name: string;
  concert_count: number;
}

const ArtistConcertCount: React.FC<{ refreshKey: number }> = ({ refreshKey }) => {
  const [data, setData] = useState<ArtistConcertCount[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ArtistConcertCount[]>('/artist-concert-count');
        setData(response.data);
      } catch (error) {
        setError('Error fetching data. Please try again.');
      }
    };

    fetchData();
  }, [refreshKey]);

  return (
    <div>
      <h2>Artist Concert Count</h2>
      {error && <p>{error}</p>}
      {data.length > 0 ? (
        <ul>
          {data.sort((a, b) => 
           b.concert_count - a.concert_count || a.artist_name.localeCompare(b.artist_name)
          ).map((item, index) => (
            <li key={index}>
              <strong>{item.artist_name}:</strong> {item.concert_count} concerts
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default ArtistConcertCount;
