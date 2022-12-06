import { render } from '@testing-library/react'
import Home from '../src/components/Home'
import { UserType } from '../src/utils/types'
import '@testing-library/jest-dom/extend-expect'

const mock = { userType: UserType.NONE }
jest.mock('../src/hooks/AuthHook', () => ({
  useAuth: () => ({ userId: 1, userType: mock.userType, username: 'TestUser' })
}))

jest.mock('../src/actions/marketingTask', () => ({
  getTasks: () => {
  }
}))

describe('Test Home component', () => {
  test('Home component loads correctly when user not logged in', () => {
    mock.userType = UserType.NONE
    render(<Home/>)
  })

  test('Home component loads correctly when business user logs in', () => {
    mock.userType = UserType.BUSINESS

    const { getAllByRole } = render(<Home/>)
    expect(getAllByRole('heading')[0]).toHaveTextContent('TestUser')
    expect(getAllByRole('heading')[2]).toHaveTextContent('Your Marketing Tasks')
  })

  test('Home component loads correctly when influencer user logs in', () => {
    mock.userType = UserType.INFLUENCER

    const { getAllByRole } = render(<Home/>)
    expect(getAllByRole('heading')[0]).toHaveTextContent('TestUser')
    expect(getAllByRole('heading')[2]).toHaveTextContent('Your Applications')
  })
})
