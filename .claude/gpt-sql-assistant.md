# GPT SQL Assistant

## Overview
`scripts/gpt.ts` is a natural language to SQL query tool that allows users to ask questions about their concert data in plain English.

## How It Works

1. Takes user questions as command-line arguments
2. Uses OpenAI GPT-3.5-turbo to convert questions to SQL
3. Executes **read-only** queries against the database
4. Returns results in table format

## Usage

```bash
npm run gpt -- "Show me all concerts in 2023"
# or directly:
ts-node --swc scripts/gpt.ts "Show me all concerts in 2023"
```

## System Prompt Design

The GPT model is given:
- Full database schema
- Example queries with expected outputs
- A fallback query for non-SQL questions or unsafe requests
- Explicit instructions to return ONLY SQL (no explanations)

## Fallback Behavior

For questions that cannot be answered with SQL or are potentially harmful (e.g., "Delete the DB"), the assistant returns a safe fallback query that shows all concerts ordered by date.

## Example Queries

**User**: "Can you show me all the venues I've been to and the number of times I've been to each of them"

**Generated SQL**:
```sql
SELECT COUNT(*) AS count, venue
FROM concert
GROUP BY venue
ORDER BY count
```

**User**: "How many concerts did I go to in each year?"

**Generated SQL**:
```sql
SELECT EXTRACT(YEAR FROM TO_DATE(concert_date, 'YYYY-MM-DD')) AS year, COUNT(*) AS count
FROM concert
GROUP BY year
ORDER BY year
```

## Future Enhancement Ideas

The file includes commented ideas for improvements:
1. **RAG**: Add context about artist names/venues to help with abbreviations
2. **Post-query analysis**: Pipe results to GPT for natural language answers
3. **Query Explainer**: Have GPT explain what the generated SQL does
