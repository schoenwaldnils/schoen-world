import styled from '@emotion/styled'
import { FC } from 'react'
import { IoSearch } from 'react-icons/io5'

import { upFromBreakpoint } from '../../../utils/mixins'
import { Input as InputComponent } from './Input'

export default {
  title: 'Form / Input',
  component: InputComponent,
}

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem 2rem;

  ${upFromBreakpoint('small')} {
    grid-template-columns: auto 1fr;
  }
`

export const Input: FC = () => (
  <Table>
    <div>Default</div>
    <InputComponent id="bla" label="Lorem Ipsum" />

    <div>With Icon</div>
    <InputComponent id="bla2" label="Lorem Ipsum" Icon={IoSearch} />

    <div>With error</div>
    <InputComponent id="bla2" label="Lorem Ipsum" error />

    <div>Disabled</div>
    <InputComponent id="bla" label="Lorem Ipsum" Icon={IoSearch} disabled />

    <div>Disabled with value</div>
    <InputComponent id="bla" label="Lorem Ipsum" disabled value="Some value" />

    <div>With helper text</div>
    <InputComponent
      id="bla"
      label="Lorem Ipsum"
      helperText="some additional info"
    />

    <div />
    <div />

    <div>Secondary default</div>
    <InputComponent id="bla" label="Lorem Ipsum" secondary />

    <div>Secondary with Icon</div>
    <InputComponent id="bla2" label="Lorem Ipsum" Icon={IoSearch} secondary />

    <div>With error</div>
    <InputComponent id="bla2" label="Lorem Ipsum" secondary error />

    <div>Secondary disabled</div>
    <InputComponent
      id="bla"
      label="Lorem Ipsum"
      Icon={IoSearch}
      disabled
      secondary
    />

    <div>Secondary disabled with value</div>
    <InputComponent
      id="bla"
      label="Lorem Ipsum"
      disabled
      value="Some value"
      secondary
    />

    <div>Secondary with helper text</div>
    <InputComponent
      id="bla"
      label="Lorem Ipsum"
      helperText="some additional info"
      secondary
    />
  </Table>
)
