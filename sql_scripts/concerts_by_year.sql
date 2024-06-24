SELECT EXTRACT(YEAR FROM TO_DATE(concert_date, 'YYYY-MM-DD')) AS year, COUNT(*) AS count
FROM concert
GROUP BY year
ORDER BY year;
