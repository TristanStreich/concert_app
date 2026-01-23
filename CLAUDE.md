# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

This is a concert tracking app with an Express + TypeORM backend and React frontend.

`npm run build` - Build both frontend and backend

## Architecture Documentation

For detailed architecture information, see:
- @.claude/backend-architecture.md - API endpoints, data model, database schema
- @.claude/frontend-architecture.md - React components and structure
- @.claude/gpt-sql-assistant.md - Natural language to SQL query tool

# Goals
## Your job
Your goal is improve this app both as a service AND as a developer.
When making changes if you find that you could make the workspace better for claude code to work on, do that.
Refer to https://code.claude.com/docs/en/best-practices for how to do that
## How to dev
- `npm run dev` - Start both frontend and backend in development mode with hot reload
- Backend: nodemon auto-restarts on TypeScript changes
- Frontend: chokidar rebuilds on React file changes
- Server runs on port 2424 (configurable via `SERVER_PORT` env var)
- TODO: we need to find out how to best make the development loop work with you
