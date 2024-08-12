const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

const questionsRoute = require('./src/routes/questions');
const themesRoute = require('./src/routes/themes');
const {
  addQuestion,
  addTheme,
  createTables,
  defineTables,
} = require('./src/database');

app.use('/questions', questionsRoute);
app.use('/themes', themesRoute);

app.listen(port, () => {
  console.log(`Node.js HTTP server is running on port ${port}`);
});

defineTables();
// createTables();
// addTheme('video-game', 'video game');
// addQuestion(1, 'What a question?', ['ans1', 'ans2', 'ans3', 'ans4'], 3);
