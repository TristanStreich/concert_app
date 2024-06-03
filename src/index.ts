import "reflect-metadata";
import express from "express";
import path from 'path';
import { AppDataSource } from "./data-source";
import { Concert } from "./entity/Concert";
import { ConcertLineup } from "./entity/ConcertLineup";
import { Artist } from "./entity/Artist";
import { Role } from "./entity/RoleEnum";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.get('/getShow', async (req, res) => {
      const { concertDate, venue } = req.query;
      if (!concertDate || !venue) {
        return res.status(400).send('concertDate and venue query parameters are required');
      }
    
      try {
        const result = await AppDataSource
          .createQueryBuilder()
          .select('a.artist_name', 'artist_name')
          .addSelect('cl.role', 'role')
          .addSelect('c.concert_date', 'concert_date')
          .addSelect('c.venue', 'venue')
          .from('artist', 'a')
          .innerJoin('concert_lineup', 'cl', 'a.artist_id = cl.artist_id')
          .innerJoin('concert', 'c', 'cl.concert_id = c.concert_id')
          .where('c.concert_date = :concertDate', { concertDate })
          .andWhere('c.venue = :venue', { venue })
          .getRawMany();

        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // New endpoint to list all and the number of concerts they have been to
    app.get('/artist-concert-count', async (req, res) => {
      try {
        const result = await AppDataSource.createQueryBuilder()
          .select('a.artist_name', 'artist_name')
          .addSelect('COUNT(cl.concert_id)', 'concert_count')
          .from('artist', 'a')
          .leftJoin('concert_lineup', 'cl', 'a.artist_id = cl.artist_id')
          .groupBy('a.artist_name')
          .getRawMany();

        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    app.post('/add-show', async (req, res) => {
      const { concertDate, venue, artists } = req.body;
    
      try {
        // Create a new concert
        const concert = new Concert();
        concert.concert_date = concertDate;
        concert.venue = venue;
        await AppDataSource.manager.save(concert);
    
        // Ensure artists exist and create concert lineup
        for (const artistData of artists) {
          let artist = await AppDataSource.getRepository(Artist).findOne({
            where: { artist_name: artistData.artist_name },
          });
    
          if (!artist) {
            artist = new Artist();
            artist.artist_name = artistData.artist_name;
            await AppDataSource.manager.save(artist);
          }
    
          const concertLineup = new ConcertLineup();
          concertLineup.concert = concert;
          concertLineup.artist = artist;
          concertLineup.role = artistData.role;
          await AppDataSource.manager.save(concertLineup);
        }
    
        res.status(201).send('Show added successfully');
      } catch (error) {
        console.error('Error adding show:', error);
        res.status(500).send('Internal Server Error');
      }
    });
    

    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    });

    app.listen(2424, () => {
      console.log("Server is running on port 2424");
    });
  })
  .catch((error) => console.log(error));
