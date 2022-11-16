import { SetState } from '../utils/types'

export const getBusinessProfile = (username: string, setCompanyName: SetState<string>, setDescription: SetState<string>): void => {
  setCompanyName('temp company')

  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed sodales erat. Suspendisse ' +
    'tempor egestas dolor, ac bibendum risus. Donec quam neque, mattis vel nibh sed, egestas blandit mauris. ' +
    'Nunc vitae finibus ante. Cras pretium scelerisque felis ac bibendum. Maecenas in eleifend ligula. Nulla facilisi. ' +
    'Proin eget blandit felis. Aliquam congue faucibus sapien, consequat accumsan velit consequat ac. Nam accumsan ' +
    'vehicula lacus, eget finibus felis. Fusce facilisis mattis dui vitae egestas. Vivamus ultrices rutrum odio, ' +
    'et dapibus risus. Nullam vel ex malesuada, tristique felis et, pellentesque erat.'
  setDescription(description)
}

export const getInfluencerProfile = (username: string, setInfluencerName: SetState<string>, setDescription: SetState<string>): void => {
  setInfluencerName('temp influencer')

  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed sodales erat. Suspendisse ' +
    'tempor egestas dolor, ac bibendum risus. Donec quam neque, mattis vel nibh sed, egestas blandit mauris. ' +
    'Nunc vitae finibus ante. Cras pretium scelerisque felis ac bibendum. Maecenas in eleifend ligula. Nulla facilisi. ' +
    'Proin eget blandit felis. Aliquam congue faucibus sapien, consequat accumsan velit consequat ac. Nam accumsan ' +
    'vehicula lacus, eget finibus felis. Fusce facilisis mattis dui vitae egestas. Vivamus ultrices rutrum odio, ' +
    'et dapibus risus. Nullam vel ex malesuada, tristique felis et, pellentesque erat.'
  setDescription(description)
}
