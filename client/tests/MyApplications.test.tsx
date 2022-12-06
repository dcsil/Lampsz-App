import { UserType } from '../src/utils/types'
import { getAllByRole, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MyApplications from '../src/components/MyApplications'

jest.mock('react-router-dom', () => ({
  useNavigate: () => {
  }
}))

jest.mock('../src/hooks/AuthHook', () => ({
  useAuth: () => ({ userId: 1, userType: UserType.BUSINESS, username: 'TestUser' })
}))

describe('Test MyApplications page', () => {
  test('MyApplications component loads correctly', () => {
    const { getAllByRole } = render(<MyApplications/>)
    expect(getAllByRole('heading')).toHaveLength(1)
  })
})
