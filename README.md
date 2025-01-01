## Deploy:
- Set the values in .env to match what you want
- `docker compose up -d --build`
- `npx prisma db push`
- Go to http://localhost:3000

## Ideas

- Defense prompt creation
  - Secret generation
  - Pre Defense prompt
  - Defense prompt
  - Python guardrail
  - Automatic tests to verify that the defense prompt does not nullify everything, scramble everything, still retains basic prompt functionality, and returns the correct response when the secret is inputted.
- Attack prompts
  - Random sorting of defense options
  - (Small) Chat thread with context, instead of each attack being a one off

- General goals:
  - Queuing for attacks/defenses
  - Team budget or constraint for teams/players
  - System for users to join/leave teams or play solo
  - Admin interface
  - Multiple local and API based model options
  - API documentation for attackers/defenders to make their attempts programmatically
