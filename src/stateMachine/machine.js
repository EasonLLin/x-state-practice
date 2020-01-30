import { Machine } from 'xstate'
import { authMachine } from './authMachine'
import * as actions from 'actions/AuthActions'
import * as loginService from 'services/api/loginAPI'

export const machine = Machine(
  {
    id: 'main',
    type: 'parallel',
    states: { authMachine },
  },
  {
    actions,
    loginService,
  }
)
