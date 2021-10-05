import styled from '@emotion/styled'
import { FC } from 'react'

import { Image } from '../Image'
import { ItemList as ItemListComponent } from './ItemList'

export default {
  title: 'Item List',
  component: ItemListComponent,
}

const TestBox = styled.div`
  background-color: #fff;
  border: 1px solid #808080;
  border-radius: 10px;

  img {
    display: block;
    border-radius: 8px;
  }
`

export const ItemList: FC = () => (
  <ItemListComponent itemMinWidth={140} gap={1.5}>
    {new Array(12).fill(undefined).map((val, key) => (
      <TestBox key={`test-${key}`}>
        <Image
          src={`https://picsum.photos/id/${10 + key}/320/320`}
          alt=""
          width={320}
          height={320}
          isExternal
        />
      </TestBox>
    ))}
  </ItemListComponent>
)
