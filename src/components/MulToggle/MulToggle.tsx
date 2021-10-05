import styled from '@emotion/styled'
import {
  FC,
  forwardRef,
  LegacyRef,
  ReactNode,
  useEffect,
  useState,
} from 'react'

import { timings } from '../../data/config'

const MulToggleContainer = styled.div`
  --offset: 2px;
  --borderRadius: 0.5em;
  display: inline-block;
  padding: var(--offset);
  overflow: hidden;
  color: var(--Toggle-color);
  cursor: pointer;
  background-color: var(--Toggle-background);
  border-radius: var(--borderRadius);
  box-shadow: inset 0 0 0.25em #0005;
  transition: color ${timings.transition}ms,
    background-color ${timings.transition}ms;
`

const Grid = styled.div<{ numberItems: number }>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${(p) => p.numberItems}, 1fr);
`

const Toggle = styled.div<{ numberItems: number; left: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% / ${(p) => p.numberItems});
  height: 100%;
  background-color: var(--Theme-themeColor);
  border-radius: calc(var(--borderRadius) - var(--offset));
  transform: translateX(calc(100% * ${(p) => p.left - 1}));
  transition: transform ${timings.animation}ms;
`

const MulToggleSide = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25em;
`

type Item = {
  id: string
  node: ReactNode
}

export const MulToggle: FC<{
  ref?: LegacyRef<HTMLDivElement>
  items: Item[]
  value: string
  setValue: (value: string) => void
  className?: string
}> = forwardRef(({ items, value, setValue, className }, ref) => {
  const [selectedKey, setSelectedKey] = useState<number>()

  useEffect(() => {
    const newKey = items.findIndex((i) => i.id === value)
    setSelectedKey(newKey + 1)
  }, [items, value])

  return (
    <MulToggleContainer ref={ref} className={className}>
      <Grid numberItems={items.length}>
        {items.map((i) => (
          <MulToggleSide key={i.id} onClick={() => setValue(i.id)}>
            {i.node}
          </MulToggleSide>
        ))}
        {!!selectedKey && (
          <Toggle numberItems={items.length} left={selectedKey} />
        )}
      </Grid>
    </MulToggleContainer>
  )
})

MulToggle.displayName = 'MulToggle'
