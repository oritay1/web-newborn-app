# web-newborn-app — לוח הימורים לחשיפת מין

Participants upload a photo, write who they are to the baby, and pick a pink bear (girl) or a blue bear (boy).
Each participant can vote once; after voting they see everyone's guesses.

## Structure

```
server/   Node.js + Express (MVC)
  src/routes/        endpoint definitions
  src/controllers/   request/response handling
  src/services/      business logic
  src/models/        Mongoose schemas
  src/middlewares/   error handling
  src/config/        env + DB connection
client/   React (Vite)
  src/components/<Name>/<Name>.jsx + <Name>.css
  src/api/           calls to the server
```

## Local development

```bash
npm run install:all
cp server/.env.example server/.env   # set MONGODB_URI
npm run dev:server                    # http://localhost:4000
npm run dev:client                    # http://localhost:5173 (proxies /api to the server)
```

## API

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/health` | health check |
| GET | `/api/votes/status/:voterId` | has this voter voted |
| POST | `/api/votes` | create a vote `{ voterId, relation, photo, guess }` |
| GET | `/api/votes` | all votes (needs an `x-voter-id` header of someone who already voted) |

## Production

`npm run build` builds the client, and `npm start` runs the server, which also serves `client/dist`.
