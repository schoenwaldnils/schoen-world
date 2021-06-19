import styled from '@emotion/styled'
import { ChangeEvent, FC, useCallback } from 'react'

import { Radio } from '../Form/Radio'

const RadioWrapper = styled.fieldset`
  display: flex;
  grid-gap: 1rem;
  border: 0;
  padding: 0;
`

export type Theme = 'dark' | 'light' | 'auto'

interface ThemeSwitchViewProps {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark?: boolean
}

export const ThemeSwitchView: FC<ThemeSwitchViewProps> = ({
  theme = 'auto',
  setTheme,
}) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setTheme(e.target.value as Theme)
      }
    },
    [setTheme],
  )

  const itemList = ['dark', 'light', 'auto']

  return (
    <div>
      Theme
      <RadioWrapper>
        {itemList.map((type) => (
          <Radio
            id={`theme-${type}`}
            name="theme"
            value={type}
            label={type}
            onChange={handleChange}
            checked={theme === type}
            key={`radio-${type}`}
          />
        ))}
      </RadioWrapper>
    </div>
  )
}
