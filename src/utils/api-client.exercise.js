function client(endpoint, customConfig = {}) {
  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...customConfig,
    })
    .then(res => {
      const data = res.json()
      if (res.ok) {
        return data
      } else {
        Promise.reject(data)
      }
    })
}

export {client}

/*






























💰 spoiler alert below...



























































const config = {
    method: 'GET',
    ...customConfig,
  }
*/
