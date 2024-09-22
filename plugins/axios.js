export default function ({ $axios, $toast }) {
  $axios.onError((error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Ocorreu um erro inesperado. Por favor, tente novamente.'

    if (process.client) {
      $toast.error(message, {
        timeout: false,
      })
    } else {
      $toast.error('Erro de rede ou servidor não está respondendo.', {
        timeout: false,
      })
    }

    return Promise.reject(error)
  })
}
