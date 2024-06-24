SELECT COUNT(*) AS count, venue
FROM concert
GROUP BY venue
ORDER BY count
