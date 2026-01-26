import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toTallyMarks } from '../utils/tallyMarks';
import './ArtistList.css';

interface ArtistListProps {
  refreshKey: number;
}

interface ArtistCount {
  artist_name: string;
  concert_count: string;
}

const ArtistList: React.FC<ArtistListProps> = ({ refreshKey }) => {
  const [artists, setArtists] = useState<ArtistCount[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('/artist-concert-count');
        // Sort by concert count descending, then alphabetically by name
        const sorted = response.data.sort(
          (a: ArtistCount, b: ArtistCount) => {
            const countDiff = parseInt(b.concert_count) - parseInt(a.concert_count);
            if (countDiff !== 0) return countDiff;
            return a.artist_name.localeCompare(b.artist_name);
          }
        );
        setArtists(sorted);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };
    fetchArtists();
  }, [refreshKey]);

  return (
    <div className="artist-list">
      <h2 className="artist-list-title">Artists Seen</h2>
      <div className="artist-list-content">
        {artists.map((artist, index) => (
          <div key={artist.artist_name} className="artist-row">
            <span className="artist-name">{artist.artist_name}</span>
            <span className="artist-tally">
              {toTallyMarks(parseInt(artist.concert_count))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
