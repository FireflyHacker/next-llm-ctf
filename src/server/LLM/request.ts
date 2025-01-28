// Example of LLM request with chat history (no streaming)

// curl http://localhost:11434/api/chat -d '{
//     "model": "llama3.2",
//     "stream": false,
//     "messages": [
//       {
//         "role": "user",
//         "content": "why is the sky blue?"
//       },
//       {
//         "role": "assistant",
//         "content": "due to rayleigh scattering."
//       },
//       {
//         "role": "user",
//         "content": "how is that different than mie scattering?"
//       }
//     ]
//   }'

// Response

// {
//     "model": "llama3.1",
//     "created_at": "2024-12-06T00:46:58.265747Z",
//     "message": { "role": "assistant", "content": "{\"age\": 22, \"available\": false}" },
//     "done_reason": "stop",
//     "done": true,
//     "total_duration": 2254970291,
//     "load_duration": 574751416,
//     "prompt_eval_count": 34,
//     "prompt_eval_duration": 1502000000,
//     "eval_count": 12,
//     "eval_duration": 175000000
//   }

// ------------------------------------------------------------------------------------------------

// Example of a simple chat request (no streaming)

// curl http://localhost:11434/api/chat -d '{
//     "model": "llama3.2",
//     "messages": [
//       {
//         "role": "user",
//         "content": "why is the sky blue?"
//       }
//     ],
//     "stream": false
//   }'

// Response

// {
//     "model": "llama3.2",
//     "created_at": "2023-12-12T14:13:43.416799Z",
//     "message": {
//       "role": "assistant",
//       "content": "Hello! How are you today?"
//     },
//     "done": true,
//     "total_duration": 5191566416,
//     "load_duration": 2154458,
//     "prompt_eval_count": 26,
//     "prompt_eval_duration": 383809000,
//     "eval_count": 298,
//     "eval_duration": 4799921000
//   }