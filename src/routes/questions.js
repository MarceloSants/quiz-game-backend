const express = require('express');
const bodyParser = require('body-parser');

const { addQuestion, getQuestions } = require('../database');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/', jsonParser, async (req, res) => {
  const { themeId, title, answer1, answer2, answer3, answer4, correctAnswer } =
    req.body;

  const answers = [answer1, answer2, answer3, answer4];

  const questionId = await addQuestion(themeId, title, answers, correctAnswer);

  res.send({ id: questionId });
});

// router.get('/', async (req, res) => {
//   console.log('get all');

//   const questions = await getQuestions();
//   res.send([...questions]);
// });

router.get('/', async (req, res) => {
  const { count, themeId } = req.query;

  const questions = await getQuestions(count, themeId);
  res.send([...questions]);
});

router.get('/:count', async (req, res) => {
  console.log('get count');
  const { count } = req.params;

  const questions = await getQuestions(count);
  res.send([...questions]);
});

module.exports = router;
