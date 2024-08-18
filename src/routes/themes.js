const express = require('express');
const bodyParser = require('body-parser');

const { addTheme, getThemes } = require('../database');

const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/', jsonParser, async (req, res) => {
  // console.log(req.body);
  const { code, name, color } = req.body;

  const theme = await addTheme(code, name, color);

  res.send({ id: theme.id });
});

router.get('/', async (req, res) => {
  const themes = await getThemes();
  res.send([...themes]);
});

module.exports = router;
