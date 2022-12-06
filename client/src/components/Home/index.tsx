import * as React from 'react'
import { UserType } from '../../utils/types'
import { isAuthenticated } from '../../utils/utils'
import { useAuth } from '../../hooks/AuthHook'
import MarketingTaskList from './MarketingTaskList'
import HomePageGrid from './HomePageGrid'
import ApplicationList from './ApplicationList'

export default function Home (): JSX.Element {
  const auth = useAuth()

  return (
    <React.Fragment>
      {isAuthenticated(auth.userType)
        ? (auth.userType === UserType.BUSINESS
            ? <HomePageGrid listComp={<MarketingTaskList/>}/>
            : <HomePageGrid listComp={<ApplicationList/>}/>
          )
        : <div>Hello World</div>
      }
    </React.Fragment>
  )
}
