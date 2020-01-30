import { SIGN_IN, SIGN_OUT } from '../constants/AuthTypes.js'
import { send, assign } from 'xstate'
// import { loginAPI } from 'services/api/loginAPI'

export const signOut = assign(() => {
  return { type: SIGN_OUT.REQUEST }
})

export const signIn = assign((context, event) => {
  console.log('authParams', context)
  // try {
  //   loginAPI(context).then(res => {
  //     if (res.success) {
  //       console.log('success', res)
  //       send('')
  //     } else {
  //       console.log('should show err msg')
  //     }
  //   })
  // } catch (err) {
  //   console.error('error', err)
  // }
})

export const cancelSignIn = assign(() => {
  return { type: SIGN_IN.CANCEL }
})
