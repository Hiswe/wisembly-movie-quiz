'use strict'

const rc = require('rc')
const fs = require('fs-extra')
const path = require('path')
const axios = require('axios')
const { ConcurrencyManager } = require('axios-concurrency')

const jsonFile = path.join(__dirname, `../api-server/movies.json`)
const config = rc(`quiz`)
const api = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
})
const MAX_CONCURRENT_REQUESTS = 2
// we have a limited number of requests at a time
// so slow it down to don't get errors
const manager = ConcurrencyManager(api, MAX_CONCURRENT_REQUESTS)

;(async () => {
  try {
    const moviesReq = Array.from({ length: 5 }).map((value, index) => {
      return api.get(`/movie/popular`, {
        params: {
          api_key: config.API_KEY,
          page: index + 1,
        },
      })
    })
    const moviesRes = await Promise.all(moviesReq)
    const movies = moviesRes
      .map(res => res.data.results)
      .reduce((acc, pages) => acc.concat(pages), [])
      .filter(movie => movie.original_language === `en`)
      .map(movie => movie.id)
    const fullMoviesWithActors = await Promise.all(
      movies.map(movieId => {
        return api.get(`/movie/${movieId}`, {
          params: {
            api_key: config.API_KEY,
            append_to_response: `credits`,
          },
        })
      }),
    )
    const result = fullMoviesWithActors
      .map(apiRes => apiRes.data)
      .map(movie => {
        if (!movie) {
          console.log(`no movie`)
          return false
        }
        return {
          id: movie.id,
          title: movie.title,
          image: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
          cast: movie.credits.cast.slice(0, 3).map(actor => actor.name),
        }
      })
      .filter(movie => movie !== false)
    await fs.outputJson(jsonFile, result, { spaces: 2 })

    manager.detach()
  } catch (error) {
    console.log(error)
  }
})()
