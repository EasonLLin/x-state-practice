import { SIGN_IN, SIGN_OUT } from '../constants/AuthTypes.js'

const initial = {
  status: null,
  isAuthenticated: false,
  username: null,
  password: null,
  showSignInForm: false,
  errText: null,
}

export default (state = initial, action) => {
  switch (action.type) {
    case SIGN_IN.REQUEST:
      return {
        ...state,
        status: 'request',
      }
    case SIGN_IN.SUCCESS:
      return {
        ...state,
        status: 'success',
        isAuthenticated: true,
      }
    case SIGN_IN.FAILURE:
      return {
        ...state,
        errText: action.text,
        status: 'failure',
      }
    case SIGN_IN.CANCEL:
      return {
        ...state,
        status: 'cancel',
      }
    case SIGN_OUT.REQUEST:
      return {
        ...state,
      }
    case SIGN_OUT.SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      }
    default:
      return state
  }
}
