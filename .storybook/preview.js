import { addDecorator, getStorybook } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import { GlobalStyles } from '../src/components/GlobalStyles'

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  // layout: 'fullscreen',
}

addDecorator((Story) => (
  <>
    <GlobalStyles />
    <Story />
  </>
))

export { getStorybook }
