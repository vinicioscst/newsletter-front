export default function ({ $axios }) {
  $axios.onError((error) => {
    if (error.response) {
      return Promise.reject(error.response)
    }

    return Promise.reject(error)
  })
}
