import { DataSource } from "typeorm";
import { ConcertLineup } from "./entity/ConcertLineup";
import { Concert } from "./entity/Concert";
import { Artist } from "./entity/Artist";
import argv from "./argv";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: argv.postgresHost,
  port: argv.postgresPort,
  username: argv.postgresUser,
  password: argv.postgresPassword,
  database: argv.postgresDbName,
  synchronize: true,
  logging: false,
  entities: [Concert, ConcertLineup, Artist],
  migrations: [],
  subscribers: [],
});
