
import dotenv from 'dotenv';
dotenv.config();

export default {
  postgresPort: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  postgresPassword: process.env.POSTGRES_PASSWORD || (() => { throw new Error('POSTGRES_PASSWORD is required'); })(),
  postgresUser: process.env.POSTGRES_USER || 'tristan-streich',
  postgresDbName: process.env.POSTGRES_DB || 'ferrisDB',
  postgresHost: process.env.POSTGRES_HOST || 'postgres.ferris.place',
  serverPort: parseInt(process.env.SERVER_PORT || '2424', 10),
};
