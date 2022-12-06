import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import MarketingTaskDetail from '../src/components/MarketingTaskDetail'
import { UserType } from '../src/utils/types'
import '@testing-library/jest-dom/extend-expect'

// Mocks
const mock = { active: false, userType: UserType.BUSINESS }
jest.mock('react-router-dom', () => ({
  useLoaderData: () => {
    return {
      company: {
        user: { id: 1 },
        companyName: 'TestName'
      },
      active: mock.active,
      compensation: 0,
      title: 'TestTitle'
    }
  },
  useNavigate: () => {
  }
}))

jest.mock('../src/actions/marketingTask', () => ({
  changeMarketingTaskState: () => {
  },
  getMarketingTaskApplicants: () => {
  },
  deleteMarketingTask: () => {
  }
}))

jest.mock('../src/hooks/AuthHook', () => ({
  useAuth: () => ({ userId: 1, userType: mock.userType })
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

  test('Re-open task button works correctly', () => {
    mock.active = false
    const { getByRole } = render(<MarketingTaskDetail/>)

    const reopenButton = getByRole('button', { name: 'Re-open Task' })
    expect(reopenButton).toBeInTheDocument()
    fireEvent.click(reopenButton)
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
  })

  test('Close task button works correctly', () => {
    mock.active = true
    const { getByRole } = render(<MarketingTaskDetail/>)

    const closeButton = getByRole('button', { name: 'Close Task' })
    expect(closeButton).toBeInTheDocument()
    fireEvent.click(closeButton)
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
  })

  test('Delete task button works correctly', () => {
    mock.active = true
    const { getByRole } = render(<MarketingTaskDetail/>)

    const closeButton = getByRole('button', { name: 'Delete Task' })
    expect(closeButton).toBeInTheDocument()
    fireEvent.click(closeButton)
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
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
    expect(document.getElementsByClassName('MuiDataGrid-main')).toHaveLength(1)
  })
})
