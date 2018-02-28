import { push } from 'react-router-redux'
import { requestStart, requestEnd } from '../redux/common'
import { alert } from '../common/util'

export default function api({ dispatch, getState }) {
  return next => async action => {
    const {
      types, // mandatory, [successType, requestType, failureType]，type: string or (dispatch, getState, [json]) => {}
      messages = [], // [errorMessage(errmsg as default), successMessage('' as default)]
      shouldCallAPI = () => true, // getState => {}
      callAPI, // mandatory, getState => fetch()
      isSuccess = () => false, // config success
      successCallback = () => {}, // success callback
      failConfirmCallback = () => {},
      ...rest
    } = action

    if (!(types && callAPI)) {
      return next(action)
    }

    if (
      !Array.isArray(types) ||
      !types.every(
        type => typeof type === 'string' || typeof type === 'function'
      )
    ) {
      throw new Error(
        'Expected types to be an array of three string or function.'
      )
    }
    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.')
    }

    if (!shouldCallAPI(getState)) {
      return
    }

    const [successType, requestType, failureType] = types
    const [errorMessage, successMessage] = messages

    if (!requestType) {
      dispatch(requestStart())
    } else if (typeof requestType === 'function') {
      requestType(dispatch, getState)
    } else {
      dispatch({ ...rest, type: requestType })
    }

    try {
      const response = await callAPI(getState)
      const json = await response.json()
      if (!requestType) {
        dispatch(requestEnd())
      }
      if (isSuccess(json) || json.code === 0) {
        if (typeof successType === 'function') {
          return successType(dispatch, getState, json)
        } else {
          successMessage && alert(successMessage, failConfirmCallback)
          dispatch({
            ...rest,
            type: successType,
            payload: json.data || json
          })
          await successCallback(json)
        }
      } else if (json.code === 1) {
        // unauthorized
        dispatch(push('/twitter/authorize'))
      } else {
        if (!failureType) {
          alert(errorMessage || json.message, () => failConfirmCallback(json))
        } else if (typeof failureType === 'function') {
          failureType(dispatch, getState, json)
        } else {
          dispatch({ ...rest, type: failureType })
        }
      }
    } catch (e) {
      console.log(e)
      dispatch(requestEnd())
      if (!failureType) {
        alert('exception, please try later!', failConfirmCallback)
      } else if (typeof failureType === 'function') {
        failureType(dispatch, getState, e)
      } else {
        dispatch({ ...rest, type: failureType })
      }
    }
  }
}
