'use strict'

const shortid = require('shortid')
const shuffle = require('lodash.shuffle')

const dbInit = require('./db')
const movies = require('./movies.json')

module.exports = {
  readRandom: readRandomQuestion,
  flush: flushQuestions,
  answerQuestion: answerQuestion,
}

async function readRandomQuestion(ctx) {
  const db = await dbInit
  const isTrue = Math.random() > 0.5
  const shuffledMovies = shuffle(movies)
  const movie = shuffledMovies[0]
  const actor = isTrue
    ? shuffle(movie.cast)[0]
    : shuffle(shuffledMovies[1].cast)[0]

  const question = {
    id: shortid.generate(),
    text: `Is <strong>${actor}</strong> playing in <strong>${
      movie.title
    }</strong>?`,
    image: movie.image,
    expectedAnswer: isTrue,
  }
  const { expectedAnswer, ...questionWithoutAnswer } = question
  // no need to wait for the question to be persisted to send the response
  // don't send the `expected answer` so user can't track it on the network panel
  ctx.body = questionWithoutAnswer
  db.get(`game`)
    .push(question)
    .write()
}

async function flushQuestions(ctx) {
  const db = await dbInit
  await db.set(`game`, []).write()
  ctx.body = []
}

async function answerQuestion(ctx) {
  const db = await dbInit
  const { id } = ctx.params
  const { question } = ctx.request.body
  const dbQuestion = await db
    .get(`game`)
    .find({ id })
    .value()
  const isCorrect = dbQuestion.expectedAnswer === question.answer
  const questionUpdate = await db
    .get(`game`)
    .find({ id })
    .assign({ answer: question.answer, isCorrect })
    .write()
  ctx.body = questionUpdate
}
