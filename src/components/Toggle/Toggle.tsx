import styled from '@emotion/styled'
import { FC, ReactNode } from 'react'

import { timings } from '../../data/config'

const ToggleContainer = styled.div<{ isLeft: boolean }>`
  position: relative;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  box-shadow: inset 0 0 0.25em #0005;
  color: var(--Toggle-color);
  background-color: var(--Toggle-background);
  transition: color ${timings.transition}ms,
    background-color ${timings.transition}ms;

  ::after {
    --offset: 2px;
    content: '';
    position: absolute;
    top: var(--offset);
    left: var(--offset);
    width: calc(50% - var(--offset));
    height: calc(100% - (var(--offset) * 2));
    background-color: var(--Theme-themeColor);
    border-radius: calc(0.5rem - var(--offset));
    transform: translateX(${(p) => (p.isLeft ? '100%' : '0%')});
    transition: transform ${timings.animation}ms;
  }
`

const ToggleSide = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25em;
`

export const Toggle: FC<{
  left: ReactNode | string
  right: ReactNode | string
  isLeft: boolean
  toggleIsLeft: () => void
}> = ({ left, right, isLeft, toggleIsLeft }) => {
  return (
    <ToggleContainer isLeft={isLeft} onClick={toggleIsLeft}>
      <ToggleSide>{left}</ToggleSide>
      <ToggleSide>{right}</ToggleSide>
    </ToggleContainer>
  )
}
