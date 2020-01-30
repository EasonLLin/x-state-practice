import _axios from 'axios'
const CLIENT_API_URL = '/api'

export class API {
  static singleton = null
  axios = null

  constructor(uri) {
    _axios.create({
      baseURL: uri,
      responseType: 'json',
      timeout: 30000,
    })
  }
}

export default _axios.create({
  baseURL: CLIENT_API_URL,
  responseType: 'json',
  timeout: 30000,
})
