# Frontend Architecture

## Tech Stack
- React with TypeScript
- Create React App
- Axios for API calls

## Structure

### Entry Point
- `frontend/src/App.tsx` - Main application component

### Components (frontend/src/components/)

#### AddShowPopup.tsx
Form component to add new concerts to the database.

#### ArtistsConcertCount.tsx
Displays artist statistics and concert counts.

## Build Output
- Frontend builds to `frontend/build/`
- Backend serves this as static files via Express
- Client-side routing handled by catch-all route in backend
