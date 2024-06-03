import { DataSource } from "typeorm";
import { ConcertLineup } from "./entity/ConcertLineup";
import { Concert } from "./entity/Concert";
import { Artist } from "./entity/Artist";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres.ferris.place",
  port: 5432,
  username: "tristan-streich",
  password: "ferris", // TODO: read from env var on all of these
  database: "ferrisDB",
  synchronize: true,
  logging: false,
  entities: [Concert, ConcertLineup, Artist],
  migrations: [],
  subscribers: [],
});
