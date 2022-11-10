export const checkSession = (setAuth: (_: boolean) => void): void => {
  // const url = '/api/check-session'

  // fetch(url)
  //   .then(res => {
  //     if (res.status === 200) {
  //       return res.json()
  //     }
  //   })
  //   .then(() => {
  //     setAuth(true)
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  setAuth(true)
}

export const businessLogin = (email: string, password: string, setAuth: (_: boolean) => void): void => {
  // const request = new Request('/api/company_login', {
  //   method: 'post',
  //   body: JSON.stringify({ email, password }),
  //   headers: {
  //     Accept: 'application/json, text/plain, */*',
  //     'Content-Type': 'application/json'
  //   }
  // })

  // fetch(request)
  //   .then(res => {
  //     if (res.status === 200) {
  //       return res.json();
  //     }
  //   })
  //   .then(res => {
  //     console.log(res);
  //   })
  setAuth(true)
}

export const businessRegister = (email: string, username: string, password: string, setAuth: (_: boolean) => void): void => {
  // const request = new Request('/api/company_register', {
  //   method: 'post',
  //   body: JSON.stringify({ email, username, password }),
  //   headers: {
  //     Accept: 'application/json, text/plain, */*',
  //     'Content-Type': 'application/json'
  //   }
  // })

  // fetch(request)
  //   .then(res => {
  //     if (res.status === 200) {
  //       return res.json();
  //     }
  //   })
  //   .then(res => {
  //     console.log(res);
  //   })
  setAuth(true)
}

export const logout = (setAuth: (_: boolean) => void): void => {
  setAuth(false)
}
