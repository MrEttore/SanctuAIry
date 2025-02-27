import { app } from '#app.js';
import { ollama } from '#ollama.js';

const port = process.env.PORT ?? '3000';
const {
  config: { host },
} = ollama;

app.listen(port, () => {
  console.log(`SanctuAIry running at http://localhost:${port}.\nOllama running at ${host}.`);
});
