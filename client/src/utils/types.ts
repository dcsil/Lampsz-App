import React from 'react'
import App from '../App'

// Types
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export type CSetState<T> = (_: T) => void

// Shared Props
export interface CommonProps {
  userType: UserType
  username: string
  userId: string
  appComponent: App
}

// HTTP request/response data
export interface ErrorData {
  message: string
}

export interface AuthResponse {
  userId: string
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

// Enums
export enum UserType {
  NONE,
  BUSINESS,
  INFLUENCER
}
