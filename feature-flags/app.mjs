import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';
import express from 'express';

const app = express();
const cli = readline.createInterface({ input, output });

function displayCliMessage(...messages) {
  output.clearLine(-1);
  output.cursorTo(0);
  console.log(...messages);
  cli.prompt();
}

app.locals.featureFlags = {
  shouldDisplayGreeting: true,
};

app.get('/', (req, res, next) => {
  const { shouldDisplayGreeting } = res.app.locals.featureFlags;
  displayCliMessage('shouldDisplayGreeting', shouldDisplayGreeting);

  res.setHeader('Content-Type', 'text/plain');

  if (shouldDisplayGreeting) {
    const userName = req.query?.name ?? 'Anonymous';
    return res.end(`Greetings, ${userName}! It's hello from server!`);
  }

  return res.end('Hello from server!');
});

app.listen(3000, () => {
  displayCliMessage('Server is listening on port 3000');
});

cli.on('line', (command) => {
  if (command === 'toggle') {
    const { shouldDisplayGreeting } = app.locals.featureFlags;
    app.locals.featureFlags.shouldDisplayGreeting = !shouldDisplayGreeting;
    displayCliMessage('"shouldDisplayGreeting" flag is toggled!');
  }
});
