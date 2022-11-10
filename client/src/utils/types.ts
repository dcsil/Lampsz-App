import React from 'react'

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export interface NavItem {
  name: string
  href: string
}

export enum UserType {
  NONE,
  BUSINESS,
  INFLUENCER
}
