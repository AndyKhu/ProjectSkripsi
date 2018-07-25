import axios from 'axios'

export default {
  test (context, filter) {
    return axios.post(`${context.$store.getters.ROOT_URL}/api/fortesting`, filter)
  }
}
