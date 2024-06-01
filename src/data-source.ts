import { DataSource } from "typeorm";
import { ConcertLineup } from "./entity/ConcertLineup";
import { Concert } from "./entity/Concert";
import { Artist } from "./entity/Artist";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres.ferris.place",
  port: 5432,
  username: "tristan-streich",
  password: "ferris",
  database: "ferrisDB",
  synchronize: true,
  logging: false,
  entities: [Concert, ConcertLineup, Artist],
  migrations: [],
  subscribers: [],
});
