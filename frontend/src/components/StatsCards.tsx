import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StatsCards.css';

interface StatsCardsProps {
  refreshKey: number;
}

interface Stats {
  totalGigs: number;
  uniqueVenues: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ refreshKey }) => {
  const [stats, setStats] = useState<Stats>({ totalGigs: 0, uniqueVenues: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, [refreshKey]);

  return (
    <div className="stats-cards">
      <div className="stat-card rotate-slight-left">
        <div className="stat-number">{stats.totalGigs}</div>
        <div className="stat-label">Total Gigs</div>
      </div>
      <div className="stat-card rotate-slight-right">
        <div className="stat-number">{stats.uniqueVenues}</div>
        <div className="stat-label">Venues</div>
      </div>
    </div>
  );
};

export default StatsCards;
