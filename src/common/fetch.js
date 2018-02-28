import fetch from 'isomorphic-fetch'

export default function(url, { timeout = 30000, ...options } = {}) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      const e = new Error(`Fetch timeout[${timeout}ms][${url}]`)
      e.code = 'timeout'
      reject(e)
    }, timeout)

    fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      ...options
    }).then(
      res => {
        clearTimeout(timeoutId)
        resolve(res)
      },
      err => {
        clearTimeout(timeoutId)
        reject(err)
      }
    )
  })
}
