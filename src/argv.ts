
import dotenv from 'dotenv';
dotenv.config();

export default {
  postgresPort: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  postgresPassword: required('POSTGRES_PASSWORD'),
  postgresUser: process.env.POSTGRES_USER || 'tristan-streich',
  postgresDbName: process.env.POSTGRES_DB || 'ferrisDB',
  postgresHost: process.env.POSTGRES_HOST || 'postgres.ferris.place',
  serverPort: parseInt(process.env.SERVER_PORT || '2424', 10),
  openAiApiKey: required('OPEN_AI_API_KEY'),
};



function required(name: string): string {
  return process.env[name] || (() => { throw new Error(`${name} is required`); })();
}