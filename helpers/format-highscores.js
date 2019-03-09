'use strict'

module.exports = function formatHighscores(highscores) {
  return highscores.sort((a, b) => a.score < b.score).slice(0, 10)
}
