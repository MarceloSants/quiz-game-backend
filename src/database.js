const { sequelize } = require('./config/sequelize');
const { defineQuestions } = require('./models/question');
const { defineThemes } = require('./models/theme');

async function addTheme(code, name, color) {
  const newTheme = await sequelize.models.themes.create({
    code: code,
    name: name,
    color: color,
  });

  return newTheme;
}

async function getThemes() {
  const themes = await sequelize.models.themes.findAll();

  return themes;
}

async function addQuestion(themeId, title, answers, correctAnswer) {
  const question = await sequelize.models.questions.create({
    themeId: themeId,
    title: title,
    answer1: answers[0],
    answer2: answers[1],
    answer3: answers[2],
    answer4: answers[3],
    correctAnswer,
  });

  return question.id;
}

async function getQuestions(count = -1, themeId = null) {
  const questionCount = parseInt(count);
  const themeIdParsed = parseInt(themeId);
  var questions = [];

  if (count > 0) {
    if (themeId !== null) {
      questions = await getQuestionWithTheme(questionCount, themeIdParsed);
    } else {
      questions = await getQuestionByCount(questionCount);
    }
  } else {
    questions = await getAllQuestion();
  }
  questions = await sequelize.models.questions.findAll();

  return questions;
}

async function getQuestionWithTheme(count, themeId) {
  console.log('getQuestionWithTheme');
  console.log('count: ' + count + ' :: ' + 'themeId: ' + themeId);
  const questions = await sequelize.models.questions.findAll({
    where: {
      themeId: themeId,
    },
    order: sequelize.literal('rand()'),
    limit: count,
  });

  return questions;
}

async function getQuestionByCount(count) {
  console.log('getQuestionByCount');
  console.log(count);
  const questions = await sequelize.models.questions.findAll({
    order: sequelize.literal('rand()'),
    limit: count,
  });

  return questions;
}

async function getAllQuestion() {
  console.log('getAllQuestion');
  const questions = await sequelize.models.questions.findAll();

  return questions;
}

function defineTables() {
  defineThemes();
  defineQuestions();
}

async function createTables() {
  await sequelize.sync({ force: true });
}

module.exports = {
  addTheme,
  getThemes,
  addQuestion,
  getQuestions,
  defineTables,
  createTables,
};
