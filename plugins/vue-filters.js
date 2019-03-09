import Vue from 'vue'

// this is overkill for a simple formating
// could be optimized later
import { Duration } from 'luxon'

Vue.filter(`duration`, value => {
  if (typeof value !== `number`) return `00:00`
  return Duration.fromObject({ seconds: value }).toFormat(`mm:ss`)
})

Vue.filter(`number`, value => {
  if (typeof value !== `number`) return `0`
  return new Intl.NumberFormat(`en-EN`).format(value)
})
