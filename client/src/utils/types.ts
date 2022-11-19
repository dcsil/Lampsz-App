import React from 'react'

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export type CSetState<T> = (_: T) => void

export interface ErrorData {
  message: string
}

export interface RegisterValidation {
  username?: string[]
  confirmPassword?: string[]
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
