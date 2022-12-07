import * as React from 'react'
import { useLoaderData } from 'react-router-dom'
import ProfileBase from './ProfileBase'

export default function Profile (): JSX.Element {
  const data = useLoaderData() as any
  const influencerItems = ['Location', 'Age', 'Subscribers', 'Views', 'Description']
  const businessItems = ['Location', 'Industry', 'Description']

  return (
    <React.Fragment>
      {data.user.is_influencer
        ? <ProfileBase items={influencerItems}/>
        : <ProfileBase items={businessItems}/>
      }
    </React.Fragment>
  )
}
