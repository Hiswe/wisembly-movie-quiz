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
    id: `AAA`,
    name: `AAA`,
    score: 10000,
  },
  {
    id: `BBB`,
    name: `BBB`,
    score: 9000,
  },
  {
    id: `CCC`,
    name: `CCC`,
    score: 8000,
  },
  {
    id: `DDD`,
    name: `DDD`,
    score: 7000,
  },
  {
    id: `EEE`,
    name: `EEE`,
    score: 6000,
  },
  {
    id: `FFF`,
    name: `FFF`,
    score: 5000,
  },
  {
    id: `GGG`,
    name: `GGG`,
    score: 4000,
  },
  {
    id: `HHH`,
    name: `HHH`,
    score: 3000,
  },
  {
    id: `III`,
    name: `III`,
    score: 2000,
  },
  {
    id: `JJJ`,
    name: `JJJ`,
    score: 1000,
  },
]

dbInit.then(db =>
  db
    .defaults({
      highscores: defaultHighscores,
      game: [],
    })
    .write(),
)

module.exports = dbInit
