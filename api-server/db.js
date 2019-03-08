'use strict'

const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

// this could be easily replaced with a real DB
// • for the exercice it wil be enough
// • it saves us for requiring a DB server
// • or to make a docker image
const adapter = new FileAsync(`async-db.json`)
const dbInit = low(adapter)

const defaultHighscores = [
  {
    name: `AAA`,
    score: 10000,
  },
  {
    name: `BBB`,
    score: 9000,
  },
  {
    name: `CCC`,
    score: 8000,
  },
  {
    name: `DDD`,
    score: 7000,
  },
  {
    name: `EEE`,
    score: 6000,
  },
  {
    name: `FFF`,
    score: 5000,
  },
  {
    name: `GGG`,
    score: 4000,
  },
  {
    name: `HHH`,
    score: 3000,
  },
  {
    name: `III`,
    score: 2000,
  },
  {
    name: `JJJ`,
    score: 1000,
  },
]

dbInit.then(db =>
  db
    .defaults({
      highscores: defaultHighscores,
    })
    .write(),
)

module.exports = dbInit
