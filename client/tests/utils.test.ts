import { getNavItems, getRequestConfig, hasError, isAuthenticated, isoToDate } from '../src/utils/utils'
import { UserType } from '../src/utils/types'
import dayjs from 'dayjs'

describe('utils.ts tests', () => {
  test("getNavItems() returns correct nav items when user isn't logged in", () => {
    const res = getNavItems(UserType.NONE)
    expect(res).toHaveLength(3)
    expect(res.map(item => item.name)).toContain('Login')
    expect(res.map(item => item.name)).toContain('Register')
  })

  test("getNavItems() returns correct nav items for business user", () => {
    const res = getNavItems(UserType.BUSINESS)
    expect(res).toHaveLength(3)
    expect(res.map(item => item.name)).toContain('Marketplace')
    expect(res.map(item => item.name)).toContain('My Marketing Tasks')
  })

  test("getNavItems() returns correct nav items for influencer user", () => {
    const res = getNavItems(UserType.INFLUENCER)
    expect(res).toHaveLength(3)
    expect(res.map(item => item.name)).toContain('Marketplace')
    expect(res.map(item => item.name)).toContain('My Applications')
  })

  test("isAuthenticated()", () => {
    expect(isAuthenticated(UserType.NONE)).toBeFalsy()
    expect(isAuthenticated(UserType.BUSINESS)).toBeTruthy()
    expect(isAuthenticated(UserType.INFLUENCER)).toBeTruthy()
  })

  test("hasError()", () => {
    expect(hasError('')).toBeFalsy()
    expect(hasError('test')).toBeTruthy()
  })

  test("isoToDate()", () => {
    expect(isoToDate(dayjs('2022-12-05').toISOString())).toBe('2022-12-05')
  })

  test("getRequestConfig()", () => {
    expect(getRequestConfig()).toHaveProperty('headers')
    expect(getRequestConfig().headers).toHaveProperty('X-CSRFTOKEN')
  })
})
