
import {ADD, REDUCE} from '../types'


let initState = {
  num: 0
}

const demo = function(state = initState, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
    case REDUCE:
      return {
        ...state,
        num: state.num - 1
      }
    default:
      return state
  }
}

export default demo
