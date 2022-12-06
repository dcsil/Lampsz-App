import { UserType } from '../src/utils/types'
import { fireEvent, getAllByRole, render, screen } from '@testing-library/react'
import MyMarketingTasks from '../src/components/MyMarketingTasks'
import '@testing-library/jest-dom/extend-expect'
import dayjs from 'dayjs'

const testTextBoxInput = (getByRole: any, name: string): void => {
  const input = getByRole('textbox', { name: name })
  fireEvent.change(input, { target: { value: 'test' } })
  expect(input).toHaveValue('test')
}

jest.mock('react-router-dom', () => ({
  useNavigate: () => {
  }
}))

jest.mock('../src/hooks/AuthHook', () => ({
  useAuth: () => ({ userId: 1, userType: UserType.BUSINESS, username: 'TestUser' })
}))

jest.mock('../src/actions/marketingTask', () => ({
  getTasks: () => {
  },
  updateMarketingTask: () => {
  }
}))

describe('Test MyMarketingTasks page', () => {
  test('MyMarketingTasks component loads correctly', () => {
    const { getAllByRole, getByRole } = render(<MyMarketingTasks/>)
    expect(getByRole('button')).toHaveTextContent('Create New Task')
    expect(getAllByRole('heading')).toHaveLength(2)
  })

  test('MarketingTaskForm correctly sends request', () => {
    const { getByRole } = render(<MyMarketingTasks/>)
    fireEvent.click(getByRole('button'))

    // Fill out the form
    expect(screen.getByRole('spinbutton', { name: 'Task Compensation' })).toHaveValue(0)
    expect(screen.getByRole('textbox', { name: 'End Date' })).toHaveValue(dayjs().format('MM/DD/YYYY').toString())
    testTextBoxInput(screen.getByRole, 'Task Title')
    testTextBoxInput(screen.getByRole, 'Task Description')
    testTextBoxInput(screen.getByRole, 'Task Deliverables')
    testTextBoxInput(screen.getByRole, 'Location')

    fireEvent.click(screen.getByRole('button', { name: 'Create' }))
  })
})
