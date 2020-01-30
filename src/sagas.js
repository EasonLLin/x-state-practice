import { delay } from 'redux-saga'
import {
  put,
  takeEvery,
  all,
  call,
  fork,
  take,
  cancel,
} from 'redux-saga/effects'
import { SIGN_IN, SIGN_OUT } from './constants/AuthTypes.js'
// import { loginAPI } from './services/api/loginAPI.js'

export default function* rootSaga() {
  yield all([call(watchRequestLogin), call(watchRequestSignOut)])
}

export function* watchRequestLogin() {
  yield takeEvery(SIGN_IN.REQUEST, loginFlow)
}

export function* watchRequestSignOut() {
  yield takeEvery(SIGN_OUT.REQUEST, signOutFlow)
}

export function* authorize({ username, password, history }) {
  try {
    // const response = yield call(loginAPI, {
    //   username: username,
    //   password: password,
    // })
    yield put({ type: SIGN_IN.SUCCESS })
    yield history.push('/protected')
  } catch (error) {
    if (error.response && error.response.data) {
      yield put({ type: SIGN_IN.FAILURE, text: error.response.data.text })
    } else {
      yield put({
        type: SIGN_IN.FAILURE,
      })
    }
  }
}

export function* loginFlow({ payload }) {
  const task = yield fork(authorize, {
    username: payload.username,
    password: payload.password,
    history: payload.history,
  })
  yield take(SIGN_IN.CANCEL)
  yield cancel(task)
}

export function* signOutFlow() {
  yield put({ type: SIGN_OUT.SUCCESS })
}
