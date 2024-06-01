INSERT INTO artist (artist_name) VALUES ('Osees');
INSERT INTO concert (concert_date, venue) VALUES ('2023-09-03', 'The Chapel');

INSERT INTO concert_lineup (concert_id, artist_id, role)
VALUES
((SELECT concert_id FROM concert WHERE concert_date='2023-09-03' AND venue='The Chapel'), (SELECT artist_id FROM artist WHERE artist_name='Osees'), 'headliner');