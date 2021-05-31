import styled from '@emotion/styled'
import { FC } from 'react'

const StyledCode = styled.code`
  display: inline-flex;
  align-items: center;
  padding-right: 0.3em;
  padding-left: 0.3em;
  font-size: 0.9em;
  color: var(--CodeInline-color);
  background-color: var(--CodeInline-background);
`

export const CodeInline: FC = ({ children }) => {
  return <StyledCode>{children}</StyledCode>
}
