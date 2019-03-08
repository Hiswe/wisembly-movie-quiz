'use strict'

const shortid = require('shortid')

const dbInit = require('./db')

module.exports = {
  readRandom: readRandomQuestion,
  flush: flushQuestions,
  answerQuestion: answerQuestion,
}

async function readRandomQuestion(ctx) {
  const db = await dbInit
  const isTrue = Math.random() > 0.5
  const question = {
    id: shortid.generate(),
    text: `is this true?`,
    image: false,
    expectedAnswer: isTrue,
  }
  const { expectedAnswer, ...questionWithoutAnswer } = question
  // no need to wait for the question to be persisted to send the response
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
