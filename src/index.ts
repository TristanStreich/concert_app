import "reflect-metadata";
import express from "express";
import path from 'path';
import { AppDataSource } from "./data-source";
import { ConcertLineup } from "./entity/ConcertLineup";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.get("/items", async (req, res) => {
      const items = await AppDataSource.getRepository(ConcertLineup).find();
      res.json(items);
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
