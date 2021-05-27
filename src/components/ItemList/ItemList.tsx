import styled from '@emotion/styled'
import { FC } from 'react'

import { upFromBreakpoint } from '../../utils/mixins'

const List = styled.div<{ minWidth: number }>`
  --minWidth: ${(p) => p.minWidth}px;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr;

  ${upFromBreakpoint('medium')} {
    grid-gap: 2rem;
  }

  @media (min-width: ${(p) => p.minWidth + 32}px) {
    grid-template-columns: repeat(auto-fill, minmax(var(--minWidth), 1fr));
  }
`

export const ItemList: FC<{ itemMinWidth?: number }> = ({
  itemMinWidth = 100,
  children,
}) => {
  return <List minWidth={itemMinWidth}>{children}</List>
}
