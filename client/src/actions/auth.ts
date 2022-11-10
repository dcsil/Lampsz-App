import { SetState, UserType } from '../utils/types'

export const checkSession = (setAuth: SetState<boolean>, setUserType: SetState<UserType>): void => {
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
  setUserType(UserType.BUSINESS)
}

export const businessLogin = (email: string, password: string, setAuth: SetState<boolean>): void => {
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

export const businessRegister = (email: string, username: string, password: string, setAuth: SetState<boolean>): void => {
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

export const logout = (setAuth: SetState<boolean>): void => {
  setAuth(false)
}
