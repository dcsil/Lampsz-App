import { UserType } from '../src/utils/types'
import { getAllByRole, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Nav from '../src/components/Nav'

jest.mock('react-router-dom', () => ({
  useNavigate: () => {
  }
}))

const mock = { userType: UserType.NONE }
jest.mock('../src/hooks/AuthHook', () => ({
  useAuth: () => ({ userId: 1, userType: mock.userType, username: 'TestUser' })
}))

describe('Test Nav component', () => {
  test('Nav component loads correctly for unauthenticated user', () => {
    mock.userType = UserType.NONE
    const { getAllByRole } = render(<Nav/>)
    const links = getAllByRole('link')
    expect(links).toHaveLength(5)
    const titles = ['Home', 'Login', 'Register']
    titles.forEach(title => expect(links.map(h => h.textContent)).toContain(title))
  })

  test('Nav component loads correctly for business user', () => {
    mock.userType = UserType.BUSINESS
    const { getAllByRole } = render(<Nav/>)
    const links = getAllByRole('link')
    expect(links).toHaveLength(5)
    const titles = ['Home', 'Marketplace', 'My Marketing Tasks']
    titles.forEach(title => expect(links.map(h => h.textContent)).toContain(title))
  })

  test('Nav component loads correctly for influencer user', () => {
    mock.userType = UserType.INFLUENCER
    const { getAllByRole } = render(<Nav/>)
    const links = getAllByRole('link')
    expect(links).toHaveLength(5)
    const titles = ['Home', 'Marketplace', 'My Applications']
    titles.forEach(title => expect(links.map(h => h.textContent)).toContain(title))
  })

  test('User menu does not shows up for unauthenticated user', () => {
    mock.userType = UserType.NONE
    const { getAllByRole } = render(<Nav/>)
    expect(getAllByRole('button')).toHaveLength(1)
  })
})
