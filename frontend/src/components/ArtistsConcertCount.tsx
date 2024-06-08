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
      <h1>Artists I've Seen</h1>
      {error && <p>{error}</p>}
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th className="artist">Artist</th>
              <th className="dash"></th>
              <th className="count">Show Count</th>
            </tr>
          </thead>
          <tbody>
            {data.sort((a, b) =>
              b.concert_count - a.concert_count || a.artist_name.localeCompare(b.artist_name)
            ).map((item, index) => (
              <tr key={index}>
                <td className="artist">{item.artist_name}</td>
                <td className="dash">-</td>
                <td className="count">{item.concert_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default ArtistConcertCount;
