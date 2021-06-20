import styled from '@emotion/styled'
import { FC } from 'react'

import { upFromBreakpoint } from '../../../utils/mixins'
import { Select as SelectComponent } from './Select'

export default {
  title: 'Form / Select',
  component: SelectComponent,
  parameters: {
    percy: { skip: true },
  },
}

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem 2rem;

  ${upFromBreakpoint('small')} {
    grid-template-columns: auto 1fr;
  }
`

export const Select: FC = () => (
  <Table>
    <div>Default</div>
    <SelectComponent
      id="bla"
      label="Lorem Ipsum"
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ]}
    />

    <div>Disabled</div>
    <SelectComponent
      id="bla"
      label="Lorem Ipsum"
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ]}
      disabled
    />

    <div>Disabled with value</div>
    <SelectComponent
      id="bla"
      label="Lorem Ipsum"
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ]}
      disabled
      value="strawberry"
    />

    <div>With helper text</div>
    <SelectComponent
      id="bla"
      label="Lorem Ipsum"
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ]}
      helperText="some additional info"
    />

    <div />
    <div />

    <div>Secondary default</div>
    <SelectComponent
      id="bla"
      label="Lorem Ipsum"
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ]}
      secondary
    />

    <div>Secondary disabled</div>
    <SelectComponent
      id="bla"
      label="Lorem Ipsum"
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ]}
      disabled
      secondary
    />

    <div>Secondary disabled with value</div>
    <SelectComponent
      id="bla"
      label="Lorem Ipsum"
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ]}
      disabled
      value="strawberry"
      secondary
    />

    <div>Secondary with helper text</div>
    <SelectComponent
      id="bla"
      label="Lorem Ipsum"
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ]}
      helperText="some additional info"
      secondary
    />
  </Table>
)
