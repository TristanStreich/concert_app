# Backend Architecture

## Tech Stack
- Express.js server with TypeORM
- PostgreSQL database
- TypeScript

## Data Model (src/entity/)

### Concert
- Stores concert date and venue
- Has one-to-many relationship with ConcertLineup

### Artist
- Stores artist names with unique constraint
- Has one-to-many relationship with ConcertLineup

### ConcertLineup
- Junction table linking concerts to artists with roles
- Composite primary key: (concert_id, artist_id, role)
- Role enum: "headliner" or "opener"

## Database Connection (src/data-source.ts)
- TypeORM DataSource configured with entities
- Uses `synchronize: true` (auto-creates/updates schema)
- Connection details come from environment variables via `argv.ts`

## Database Schema

```
artist (artist_id, artist_name)
concert (concert_id, concert_date, venue)
concert_lineup (concert_id, artist_id, role)
  - role ENUM: 'headliner' | 'opener'
```

Relationships:
- Concert ↔ ConcertLineup (one-to-many)
- Artist ↔ ConcertLineup (one-to-many)

## API Endpoints (src/index.ts)

### GET /getShow?concertDate=&venue=
Returns the lineup for a specific show with artist names and roles.

### GET /artist-concert-count
Lists all artists with their total concert counts.

### POST /add-show
Adds a new concert with artists. Creates artists if they don't exist.

Request body:
```json
{
  "concertDate": "2024-01-15",
  "venue": "Red Rocks",
  "artists": [
    {"artist_name": "Foo Fighters", "role": "headliner"},
    {"artist_name": "The Strokes", "role": "opener"}
  ]
}
```

### GET *
Catch-all route that serves the React frontend for client-side routing.

## Configuration (src/argv.ts)

Loads environment variables from `.env`:
- **Required**: `POSTGRES_PASSWORD`, `OPEN_AI_API_KEY`
- **Optional with defaults**:
  - `POSTGRES_PORT` (default: 5432)
  - `POSTGRES_USER` (default: 'tristan-streich')
  - `POSTGRES_DB` (default: 'ferrisDB')
  - `POSTGRES_HOST` (default: 'postgres.ferris.place')
  - `SERVER_PORT` (default: 2424)
