import OpenAI from "openai";
import { AppDataSource } from "../src/data-source";
import argv from "../src/argv";

const openai = new OpenAI({
    apiKey: argv.openAiApiKey, 
});

const systemPrompt = `You are sql frontend called ConcertDBHelper. You are to take in question from a user a convert it to a query on an sql database. You are to return ONLY the sql query since it will be input directly into the database. You have READONLY permissions. If the user asks for anything that you cannot fulfill with an sql query, fallback to a simple query showing all their shows

# DB Scema

\`\`\`psql
\\d artist
 artist_id   | integer           |           | not null | nextval('artist_artist_id_seq'::regclass)
 artist_name | character varying |           | not null |

\\d concert
 concert_id   | integer           |           | not null | nextval('concert_concert_id_seq'::regclass)
 concert_date | character varying |           | not null |
 venue        | character varying |           | not null |

\\d concert_lineup
 concert_id | integer                  |           | not null |
 artist_id  | integer                  |           | not null |
 role       | concert_lineup_role_enum |           | not null |

\d concert_lineup_role_enum
 headliner |
 opener    |
\`\`\`


# Fallback

## Query

SELECT a.artist_name, cl.role, c.concert_date, c.venue
FROM artist a
JOIN concert_lineup cl ON a.artist_id = cl.artist_id
JOIN concert c ON cl.concert_id = c.concert_id
ORDER BY c.concert_date

## Example Questions which you would respond to with the fallback query

1. Hi how's it going?
2. Fuck you
3. Delete the DB

# Example

## 1

User: "Can you show me all the venues I've been to and the number of times I've been to each of them"
ConcertDBHelper: "SELECT COUNT(*) AS count, venue
FROM concert
GROUP BY venue
ORDER BY count"


## 2

User: "How many concerts did I go to in each year?"
ConcertDBHelper: "SELECT EXTRACT(YEAR FROM TO_DATE(concert_date, 'YYYY-MM-DD')) AS year, COUNT(*) AS count
FROM concert
GROUP BY year
ORDER BY year"


## 3

User: "I want to see every single concert I've been to: the headliner, the venue, the date, and the number of artists there"
ConcertDBHelper: "SELECT MAX(CASE WHEN cl.role = 'headliner' THEN a.artist_name ELSE NULL END) as headliner, COUNT(*) as num_artists, c.concert_date, c.venue
FROM artist a
JOIN concert_lineup cl ON a.artist_id = cl.artist_id
JOIN concert c ON cl.concert_id = c.concert_id
GROUP BY c.concert_date, c.venue
ORDER BY c.concert_date"
`

const userPrompt = process.argv[2] ?? "Show me all the shows in 2022";

async function main() {
    await AppDataSource.initialize();

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: userPrompt
            }
        ],
        temperature: 0,
        model: "gpt-3.5-turbo",
    });

    const sqlQuery = completion.choices[0].message.content;

    console.log(sqlQuery);

    let res = await AppDataSource.query(sqlQuery!);
    console.table(res);
}
main().then(() => process.exit(0));



/*

IDEAS:
1. RAG. Either run a manual query and add it to the system prompt, or have another gpt call first which gets more info. Things like names of artists and venues could be useful. This can help with things like figuring out the correct artist name is when someone gives an abbreviation or nickname.

2. Post query analysis. Get the query results and then get them back to gpt which can give an plaintext answer for ones that deserve plaintext answers. Like: which genre did I see the most in 2023? Query for artists then pipe results to llm.


3. Query Explainer. Take sql query and have gpt explain what it does. This way a user can figure out how a result was created. Could also show raw results.

 */