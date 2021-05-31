import { addDecorator, getStorybook } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import { GlobalStyles } from '../src/components/GlobalStyles'
import { StoreProvider } from '../src/provider/Store/StoreProvider'

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  // layout: 'fullscreen',
}

addDecorator((Story) => (
  <>
    <StoreProvider>
      <GlobalStyles />
      <Story />
    </StoreProvider>
  </>
))

export { getStorybook }
