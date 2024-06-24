SELECT MAX(CASE WHEN cl.role = 'headliner' THEN a.artist_name ELSE NULL END) as headliner, COUNT(*) as num_artists, c.concert_date, c.venue
FROM artist a
JOIN concert_lineup cl ON a.artist_id = cl.artist_id
JOIN concert c ON cl.concert_id = c.concert_id
GROUP BY c.concert_date, c.venue
ORDER BY c.concert_date
