import axios from 'axios'

export default {
  test (context) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/fortesting`)
  }
}
