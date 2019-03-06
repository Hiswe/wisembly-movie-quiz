'use strict'

const rc = require('rc')
const axios = require('axios')

const config = rc(`wisembly`)
const request = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
})

;(async () => {
  try {
    const moviesReq = Array.from({ length: 50 }).map((value, index) => {
      return request.get(`/movie/popular`, {
        params: {
          api_key: config.API_KEY,
          page: index + 1,
        },
      })
    })
    const moviesRes = await Promise.all(moviesReq)
    // console.log(moviesRes)
  } catch (error) {
    // console.log(error)
  }
})()

// const instance = axios
