'use strict'

const shortid = require('shortid')

const dbInit = require('./db')

module.exports = {
  list: listHighscores,
  create: createHighscores,
}

async function listHighscores(ctx) {
  const db = await dbInit
  const dbHighscores = await db.get(`highscores`).value()
  ctx.body = dbHighscores
}

async function createHighscores(ctx) {
  const db = await dbInit
  const dbHighscores = await db.get(`highscores`).value()
  const { highscore } = ctx.request.body
  const isValidHighscore = dbHighscores.slice(-1)[0].score < highscore.score
  ctx.assert(isValidHighscore, 403, `This isn't enough to be in the highscores`)
  if (!isValidHighscore) return
  const updatedHighscore = { id: shortid.generate(), ...highscore }
  dbHighscores.push(updatedHighscore)
  const updatedHighscores = dbHighscores
    .sort((a, b) => {
      // sort by score
      if (a.score > b.score) return -1
      if (a.score < b.score) return 1
      // Sort by name
      return a.name.localeCompare(b.name)
    })
    .slice(0, 10)
  await db.set(`highscores`, updatedHighscores).write()
  ctx.body = dbHighscores
}
