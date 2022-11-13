import { SetState, UserType } from '../utils/types'

const tempMap = new Map<string, UserType>([
  ['0', UserType.NONE],
  ['1', UserType.BUSINESS],
  ['2', UserType.INFLUENCER]
])

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
  setAuth(localStorage.getItem('auth') === 'true')
  if (localStorage.getItem('userType') !== null) {
    // @ts-expect-error
    setUserType(tempMap.get(localStorage.getItem('userType')))
  } else {
    setUserType(UserType.NONE)
  }
}

export const businessLogin = (email: string, password: string, setAuth: SetState<boolean>, setUserType: SetState<UserType>): void => {
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
  localStorage.setItem('auth', 'true')
  localStorage.setItem('userType', UserType.BUSINESS.toString())
  setAuth(localStorage.getItem('auth') === 'true')
  // @ts-expect-error
  setUserType(tempMap.get(localStorage.getItem('userType')))
}

export const businessRegister = (email: string, username: string, password: string, setAuth: SetState<boolean>, setUserType: SetState<UserType>): void => {
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
  localStorage.setItem('auth', 'true')
  localStorage.setItem('userType', UserType.BUSINESS.toString())
  setAuth(localStorage.getItem('auth') === 'true')
  // @ts-expect-error
  setUserType(tempMap.get(localStorage.getItem('userType')))
}

export const influencerLogin = (setAuth: SetState<boolean>, setUserType: SetState<UserType>): void => {
  localStorage.setItem('auth', 'true')
  localStorage.setItem('userType', UserType.INFLUENCER.toString())
  setAuth(localStorage.getItem('auth') === 'true')
  // @ts-expect-error
  setUserType(tempMap.get(localStorage.getItem('userType')))
}

export const influencerRegister = (setAuth: SetState<boolean>, setUserType: SetState<UserType>): void => {
  localStorage.setItem('auth', 'true')
  localStorage.setItem('userType', UserType.INFLUENCER.toString())
  setAuth(localStorage.getItem('auth') === 'true')
  // @ts-expect-error
  setUserType(tempMap.get(localStorage.getItem('userType')))
}

export const logout = (setAuth: SetState<boolean>): void => {
  localStorage.setItem('auth', 'false')
  localStorage.setItem('userType', UserType.NONE.toString())
  setAuth(localStorage.getItem('auth') === 'true')
  // @ts-expect-error
  setUserType(tempMap.get(localStorage.getItem('userType')))
}
