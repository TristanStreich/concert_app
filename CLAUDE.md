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

## Skills & Agents

This project has specialized skills and agents to help with development:

### Skills
- **frontend-dev** (@.claude/skills/frontend-dev.md) - Frontend development workflow with visual feedback using screenshots

### Agents
- **puppeteer** (@.claude/agents/puppeteer.md) - **ALWAYS use this agent for ANY screenshot task.** Delegates screenshot work to a subagent to save context. Supports scrolling, clicking, hovering, and multi-viewport testing.

# Goals
## Your job
Your goal is improve this app both as a service AND as a developer.
When making changes if you find that you could make the workspace better for claude code to work on, do that.
Refer to https://code.claude.com/docs/en/best-practices for how to do that
## How to dev
- `npm run dev` - Start both frontend and backend in development mode with hot reload
- Backend: nodemon auto-restarts on TypeScript changes
- Frontend: chokidar rebuilds on React file changes (~8 second rebuild time)
- Server runs on port 2424 (configurable via `SERVER_PORT` env var)
- **Mobile verification:** Always test visual changes at mobile viewport (375x667) in addition to desktop. Use the **puppeteer agent** for all screenshots.

### Frontend Development Workflow
For frontend development with visual feedback, use the **frontend-dev** skill which:
- Starts the dev server
- Sets up screenshot-based feedback loop using Puppeteer
- Guides through iterative development with before/after screenshots

**Screenshots:** ALWAYS delegate to the **puppeteer agent** (Task tool with subagent_type=puppeteer) for ANY screenshot task. This saves context by using a subagent. Never run screenshot scripts directly.

## TODO
- [ ] Create a separate dev/test database so changes can be tested without affecting prod DB
