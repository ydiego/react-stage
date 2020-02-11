import { SET_HEADERS, SET_APP_ENV, SET_USER_DATA } from '../types'

const initialState = {
  isApp: false, // 是否是app环境
  headers: {}, // 接口请求头配置
  userData: {} // 用户信息
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_HEADERS: {
      return {
        ...state,
        headers: action.payload || {}
      }
    }
    case SET_APP_ENV: {
      return {
        ...state,
        isApp: action.isApp
      }
    }
    case SET_USER_DATA: {
      return {
        ...state,
        userData: action.payload || {}
      }
    }
    default:
      return state
  }
}
