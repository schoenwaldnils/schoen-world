import styled from '@emotion/styled'
import { FC } from 'react'

import { ItemList as ItemListComponent } from './ItemList'

export default {
  title: 'Item List',
  component: ItemListComponent,
}

const TestBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #808080;
  img {
    display: block;
    border-radius: 8px;
  }
`

export const ItemList: FC = () => (
  <ItemListComponent itemMinWidth={200}>
    {new Array(12).fill(undefined).map((val, key) => (
      <TestBox key={`test-${key}`}>
        <img src={`https://picsum.photos/id/${10 + key}/200/200`} alt="" />
      </TestBox>
    ))}
  </ItemListComponent>
)
