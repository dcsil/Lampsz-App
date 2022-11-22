import React from 'react'

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export type CSetState<T> = (_: T) => void

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

export enum UserType {
  NONE,
  BUSINESS,
  INFLUENCER
}
