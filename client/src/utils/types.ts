import React from 'react'

// Types
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export type AuthCallback = (hasError: boolean, username?: string, userId?: string, userType?: UserType) => void
export type FormFieldEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>

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
