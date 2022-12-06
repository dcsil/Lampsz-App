import BusinessLogin from '../src/components/Auth/BusinessLogin'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, getByRole, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import BusinessSignup from '../src/components/Auth/BusinessSignup'
import InfluencerAuthTab from '../src/components/Auth/InfluencerAuthTab'
import AuthTabs from '../src/components/Auth/AuthTabs'
import * as React from 'react'

// Utility functions
const testTextBoxInput = (getByRole: any, name: string): void => {
  const input = getByRole('textbox', { name: name })
  fireEvent.change(input, { target: { value: 'test' } })
  expect(input).toHaveValue('test')
}

const testPasswordInput = (id: string): void => {
  const passwordInput = document.getElementById(id)
  expect(passwordInput).toBeDefined()
  fireEvent.change(passwordInput!, { target: { value: 'test' } })
  expect(passwordInput).toHaveValue('test')
}

// Mock setup
const mockedLogin = jest.fn()
const mockedRegister = jest.fn()
jest.mock('../src/hooks/AuthHook', () => ({
  useAuth: () => {
    return {
      login: mockedLogin,
      register: mockedRegister
    }
  }
}))

// Tests
afterEach(cleanup)

describe('Test BusinessLogin page', () => {
  test('has correct title', () => {
    const { getByRole, getAllByRole } = render(
      <BrowserRouter>
        <BusinessLogin/>
      </BrowserRouter>
    )

    expect(getByRole('heading')).toHaveTextContent('Business Login')
    expect(getAllByRole('textbox')).toHaveLength(1)
  })

  test('login button correctly sends request', async () => {
    const { getByRole, getByText } = render(
      <BrowserRouter>
        <BusinessLogin/>
      </BrowserRouter>
    )

    // Input username and password
    testTextBoxInput(getByRole, 'Username')
    testPasswordInput('password')

    // Click sign in
    fireEvent.click(getByText('Sign In'))
    expect(mockedLogin).toBeCalled()
  })
})


describe('Test BusinessSignup page', () => {
  test('has correct title', () => {
    const { getByRole, getAllByRole } = render(
      <BrowserRouter>
        <BusinessSignup/>
      </BrowserRouter>
    )

    expect(getByRole('heading')).toHaveTextContent('Business Sign up')
    expect(getAllByRole('textbox')).toHaveLength(3)
  })

  test('sign up button correctly sends request', () => {
    const { getByRole, getByText } = render(
      <BrowserRouter>
        <BusinessSignup/>
      </BrowserRouter>
    )

    // Input register information
    testTextBoxInput(getByRole, 'Username')
    testTextBoxInput(getByRole, 'Company Name')
    testTextBoxInput(getByRole, 'Email Address')
    testPasswordInput('password')
    testPasswordInput('confirm-password')

    // Click sign up
    fireEvent.click(getByText('Sign Up'))
    expect(mockedRegister).toBeCalled()
  })
})


describe('Test AuthTabs', () => {
  test('correctly switches component', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <AuthTabs
          businessComp={<BusinessLogin/>}
          influencerComp={<InfluencerAuthTab label="Google Login"/>}
        />
      </BrowserRouter>
    )

    fireEvent.click(getByRole('tab', { name: 'Business' }))
    expect(getByRole('heading')).toHaveTextContent('Business Login')

    fireEvent.click(getByRole('tab', { name: 'Influencer' }))
    expect(getByRole('heading')).toHaveTextContent('Influencer Sign up')
  })
})
