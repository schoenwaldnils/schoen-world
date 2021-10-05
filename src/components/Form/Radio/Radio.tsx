import styled from '@emotion/styled'
import { ChangeEvent, FC, InputHTMLAttributes } from 'react'

const Wrapper = styled.label`
  display: flex;
  align-items: center;
`

const Label = styled.div`
  margin-left: 0.5em;
  text-transform: capitalize;
`

const Input = styled.input`
  position: relative;
  display: flex;
  width: 1.35em;
  height: 1.35em;
  margin: 0;
  color: var(--Radio-color, inherit);
  cursor: pointer;
  border: 1px solid var(--Radio-borderColor, currentcolor);
  border-radius: 1em;
  appearance: none;

  ::after {
    content: '';
    flex-shrink: 0;
    display: block;
    width: 0.75em;
    height: 0.75em;
    margin: auto;
    cursor: pointer;
    background-color: var(--Radio-colorActive, var(--Theme-themeColor, red));
    border-radius: 1em;
    opacity: 0;
    transition: opacity 150ms;
  }

  :checked::after {
    opacity: 1;
  }

  :disabled {
    cursor: default;
    border: 1px solid var(--Radio-colorDisabled, #888);
  }

  :disabled::after {
    cursor: default;
    background-color: var(--Radio-colorDisabled, #aaa);
  }

  :disabled + ${Label} {
    color: var(--Radio-colorDisabled, #888);
    cursor: default;
  }
`

export const Radio: FC<
  InputHTMLAttributes<HTMLInputElement> & {
    id: string
    label: string
    name: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
  }
> = ({ id, label, name, onChange, ...props }) => {
  return (
    <Wrapper htmlFor={id}>
      <Input {...props} id={id} name={name} type="radio" onChange={onChange} />
      <Label>{label}</Label>
    </Wrapper>
  )
}
