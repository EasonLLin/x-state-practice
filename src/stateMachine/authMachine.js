import { send, assign } from 'xstate'
// import { loginAPI } from '../services/api/loginAPI'

const invokeFetchSubreddit = context => {
  const { subreddit } = context

  return fetch(`https://www.reddit.com/r/reactjs.json`)
    .then(response => response.json())
    .then(json => json.data.children.map(child => child.data))
}

export const authMachine = {
  id: 'auth',
  initial: 'idle',
  context: {
    token: null,
  },
  states: {
    invoke: [
      {
        id: 'loginService',
        src: 'loginService',
      },
    ],
    idle: {
      on: {
        SIGNIN: {
          target: 'signingIn',
        },
      },
    },
    signingIn: {
      invoke: {
        id: 'getSessionToken',
        src: 'loginAPI',
        // src: invokeFetchSubreddit,
        onDone: {
          target: 'signedIn',
          actions: assign((context, event) => {}),
        },
        onError: {
          target: 'idle',
          actions: assign((context, event) => {
            console.log('context on error', context)
          }),
        },
      },
    },
    signingOut: {
      on: {
        LOGOUT_SUCCESS: 'idle',
      },
    },
    signedIn: {
      on: {
        SIGNOUT: 'signingOut',
        FORCED_SIGNOUT: 'signingOut',
      },
    },
  },
}
