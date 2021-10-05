import styled from '@emotion/styled'
import { FC, forwardRef, LegacyRef, ReactNode } from 'react'

import { timings } from '../../data/config'

const ToggleContainer = styled.div<{ isLeft: boolean }>`
  position: relative;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  color: var(--Toggle-color);
  cursor: pointer;
  background-color: var(--Toggle-background);
  border-radius: 0.5rem;
  box-shadow: inset 0 0 0.25em #0005;
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
  ref?: LegacyRef<HTMLDivElement>
  left: ReactNode | string
  right: ReactNode | string
  isLeft: boolean
  toggleIsLeft: () => void
}> = forwardRef(({ left, right, isLeft, toggleIsLeft }, ref) => {
  return (
    <ToggleContainer ref={ref} isLeft={isLeft} onClick={toggleIsLeft}>
      <ToggleSide>{left}</ToggleSide>
      <ToggleSide>{right}</ToggleSide>
    </ToggleContainer>
  )
})

Toggle.displayName = 'Toggle'
