const express = require('express');
const { getPostInfo } = require('../controllers/finalPractice');

const finalPracticeRouter = express.Router();

finalPracticeRouter.get('/', getPostInfo);

module.exports = finalPracticeRouter;