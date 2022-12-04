import React from 'react'

// Types
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export type AuthCallback = (hasError: boolean, username?: string, userId?: number, userType?: UserType) => void
export type FormFieldEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>

// HTTP request/response data
export interface ErrorData {
  message: string
}

export interface AuthResponse {
  userId: number
  username: string
  userType: UserType
}

export interface RegisterValidation {
  username?: string[]
  email?: string[]
}

export interface NavItem {
  name: string
  href: string
}

export interface UserData {
  id: number
  username: string
}

export interface CompanyData {
  user: UserData
  companyName: string
  description: string
  industry: string
  location: string
  shortBio: string
  categories: string[]
}

export interface MarketingTask {
  company: CompanyData
  id: number
  compensation: number
  deliverables: string
  description: string
  endDate: string
  postedDate: string
  title: string
  location: string
  image: string
  active: boolean
}

export interface TaskApplication {
  id: number
  influencer: number
  marketingTask: MarketingTask
}

// Enums
export enum UserType {
  NONE,
  BUSINESS,
  INFLUENCER
}
