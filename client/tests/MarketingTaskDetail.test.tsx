import { cleanup, fireEvent, render } from '@testing-library/react'
import * as React from 'react'
import MarketingTaskDetail from '../src/components/MarketingTaskDetail'
import { UserType } from '../src/utils/types'

// Mocks
jest.mock('react-router-dom', () => ({
  useLoaderData: () => {
    return {
      company: {
        user: { id: 1 },
        companyName: 'TestName'
      },
      active: false,
      compensation: 0,
      title: 'TestTitle'
    }
  },
  useNavigate: () => {
  }
}))

jest.mock('../src/hooks/AuthHook', () => ({
  useAuth: () => ({ userId: 1, userType: UserType.BUSINESS })
}))

// Tests
afterEach(cleanup)

describe('Test MarketingTaskDetail page', () => {
  test('components renders overview tab properly', () => {
    const { getByRole, getAllByRole } = render(<MarketingTaskDetail/>)

    fireEvent.click(getByRole('tab', { name: 'Overview' }))
    const headings = getAllByRole('heading')
    expect(headings).toHaveLength(5)
    const titles = ['TestTitle', 'TestName', 'Task Image', 'Description', 'Deliverables']
    titles.forEach(title => expect(headings.map(h => h.textContent)).toContain(title))
  })

  test('components renders about company tab properly', () => {
    const { getByRole, getAllByRole } = render(<MarketingTaskDetail/>)

    fireEvent.click(getByRole('tab', { name: 'About the Company' }))
    const headings = getAllByRole('heading')
    expect(headings).toHaveLength(3)
  })

  test('components renders applicants tab properly', () => {
    const { getByRole, getAllByRole } = render(<MarketingTaskDetail/>)

    fireEvent.click(getByRole('tab', { name: 'Applicants' }))
    const headings = getAllByRole('heading')
    expect(headings).toHaveLength(2)
  })
})
