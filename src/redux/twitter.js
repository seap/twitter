import Immutable from 'seamless-immutable'
import fetch from '../common/fetch'
import Cookie from 'js-cookie'
import { requestStart, requestEnd } from './common'
import {
  alert,
  toast,
  objToParam,
  checkPassport,
  getClient,
  invokeWxPayment
} from '../common/util'
const TWITTER_SERVICE = '//seayang.me/service/twitter'
// action types
const FETCH_TOKEN_SUCCESS = 'twitter:FETCH_TOKEN_SUCCESS'
const FETCH_TIMELINE_SUCCESS = 'twitter:FETCH_TIMELINE_SUCCESS'
const POST_TWEETING_SUCCESS = 'twitter:POST_TWEETING_SUCCESS'

const initialState = Immutable({
  list: []
})

export const fetchToken = callback => {
  return {
    types: [FETCH_TOKEN_SUCCESS],
    callAPI: () => fetch(`${TWITTER_SERVICE}/request/token`),
    successCallback: callback
  }
}

export const fetchTimeline = () => {
  return {
    types: [FETCH_TIMELINE_SUCCESS],
    callAPI: () => fetch(`${TWITTER_SERVICE}/timeline`)
  }
}

export const postTweeting = (text, callback) => {
  return {
    types: [POST_TWEETING_SUCCESS],
    callAPI: () =>
      fetch(`${TWITTER_SERVICE}/update`, {
        method: 'POST',
        body: JSON.stringify({
          text
        })
      }),
    successCallback: callback
  }
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_TOKEN_SUCCESS:
      return Immutable.set(state, 'token', payload)
    case FETCH_TIMELINE_SUCCESS:
      return Immutable.setIn(state, ['list'], payload)
    default:
      return state
  }
}
