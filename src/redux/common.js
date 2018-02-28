import Immutable from 'seamless-immutable'
const REQUEST_START = 'common:REQUEST_START'
const REQUEST_END = 'common:REQUEST_END'

const initialState = Immutable({
  loading: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_START:
      return Immutable.set(state, 'loading', true)
    
    case REQUEST_END:
      return Immutable.set(state, 'loading', false)
    
    default:
      return state
  }
}

export const requestStart = () => ({
  type: REQUEST_START
})

export const requestEnd = () => ({
  type: REQUEST_END
})