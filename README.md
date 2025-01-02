# Next LLM CTF:
A llm ctf that takes inspiration from other AI based challenges such as Crucible from the Dreadnode team, TensorTrust, The Gandalf challenge from lakera, and the 2024 SaTML LLM CTF code that acted as the original prototype for this project.

## Deploy:
- Set the values in .env to match what you want
- `docker compose up -d --build`
- `npx prisma db push`
- Go to http://localhost:3000

## Ideas:

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


## Resources about prompt engineering and common attacks:
https://antematter.io/blogs/prompt-injection-llm-security-guide \
https://medium.com/tr-labs-ml-engineering-blog/prompt-injection-attacks-and-how-to-defend-against-them-1b3298b225c7 \
https://www.bugcrowd.com/blog/your-guide-to-common-prompt-defenses/ \
https://cookbook.openai.com/examples/how_to_use_guardrails

### AWS guides:
https://docs.aws.amazon.com/prescriptive-guidance/latest/llm-prompt-engineering-best-practices/common-attacks.html \
https://docs.aws.amazon.com/prescriptive-guidance/latest/llm-prompt-engineering-best-practices/best-practices.html

### Dreadnode Docs:
https://docs.dreadnode.io/
