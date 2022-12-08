import * as React from 'react'
import { useLoaderData } from 'react-router-dom'
import ProfileBase from './ProfileBase'

export default function Profile (): JSX.Element {
  const data = useLoaderData() as any
  const influencerItems = ['ShortBio', 'Description']
  const businessItems = ['ShortBio', 'Location', 'Industry', 'Description']

  return data.user.isInfluencer ? <ProfileBase items={influencerItems}/> : <ProfileBase items={businessItems}/>
}
