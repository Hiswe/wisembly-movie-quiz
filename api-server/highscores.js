'use strict'

const shortid = require('shortid')

const dbInit = require('./db')

module.exports = {
  list: listHighscores,
}

async function listHighscores(ctx) {
  const db = await dbInit
  const dbHighscores = await db.get(`highscores`).value()
  ctx.body = dbHighscores
}
