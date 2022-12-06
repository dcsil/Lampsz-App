import { render } from '@testing-library/react'
import App from '../src/App'
import { UserType } from '../src/utils/types'

const mock = { toastOpen: false, isReadingCookie: false }
jest.mock('../src/hooks/ToastHook', () => ({
  useToast: () => ({
    toastOpen: mock.toastOpen,
    message: '',
    getToastMessage: () => {
    }
  })
}))

jest.mock('../src/hooks/AuthHook', () => ({
  useAuth: () => ({
    userId: 1,
    userType: UserType.BUSINESS,
    username: 'TestUser',
    session: () => {
    },
    isReadingCookie: mock.isReadingCookie
  })
}))

describe('Test main App component', () => {
  test('App loads correctly', () => {
    render(<App/>)
  })
})

export {}
