import axios from './index.js'
import MockAdapter from 'axios-mock-adapter'

var mock = new MockAdapter(axios, { delayResponse: 500 })
// var mock = new MockAdapter(axios)

mock.onPost('/api/login').reply(function(config) {
  console.log('mock api')
  const data = JSON.parse(config.data)
  const username = data.username
  const password = data.password

  if (username === 'guest' && password === 'guest') {
    return [
      200,
      {
        success: true,
        data: {
          token: 'XXX',
        },
      },
    ]
  } else {
    return [
      200,
      {
        success: false,
        error: {
          error_message: 'user name not found',
        },
      },
    ]
  }
})

export const itemService = (context, e) => (callback, onReceive) => {
  onReceive(event => {
    console.log('receive context', context)
    console.log('receive e', e)
    console.log('receive event', event)
    switch (event.type) {
      case 'loginAPI':
        axios({
          url: `/login`,
          method: 'post',
          data: {
            username: e.username,
            password: e.password,
          },
        })
        break

      default:
        console.log('unhandled method call=', evt.type)
    }
  })
}

// const wrapTryCatch = async apiMethod => {
//   try {
//     const res = await apiMethod
//     if (res.data.success) {
//       return res.data
//     } else {
//       throw res
//     }
//   } catch (err) {
//     throw err
//   }
// }
