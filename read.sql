SELECT a.artist_name, cl.role, c.concert_date, c.venue
FROM artist a
JOIN concert_lineup cl ON a.artist_id = cl.artist_id
JOIN concert c ON cl.concert_id = c.concert_id
WHERE c.concert_date = '2023-09-03' AND c.venue = 'The Chapel';