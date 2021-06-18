import styled from '@emotion/styled'
import { FC } from 'react'

const List = styled.div<{
  minWidth: number
  rowgap: number
  columngap: number
}>`
  --minWidth: ${(p) => p.minWidth}px;
  display: grid;
  grid-gap: ${(p) => `${p.rowgap}rem ${p.columngap}rem`};
  grid-template-columns: 1fr;

  @media (min-width: ${(p) => p.minWidth + 32}px) {
    grid-template-columns: repeat(auto-fill, minmax(var(--minWidth), 1fr));
  }
`

export const ItemList: FC<{
  itemMinWidth?: number
  gap?: number
  rowgap?: number
  columngap?: number
}> = ({
  itemMinWidth: minWidth = 100,
  gap = 1,
  rowgap = gap,
  columngap = gap,
  children,
}) => {
  return <List {...{ minWidth, rowgap, columngap }}>{children}</List>
}
