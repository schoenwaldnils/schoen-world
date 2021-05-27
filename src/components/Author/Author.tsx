import styled from '@emotion/styled'
import { Paper } from '@material-ui/core'
import { FC } from 'react'

import { IAuthorFields } from '../../@types/generated/contentful'
import { colors } from '../../data/colors'
import { upFromBreakpoint } from '../../utils/mixins'
import { Image } from '../Image'
import { RichText } from '../RichText'
import { Headline4 } from '../Typography'

const AuthorContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  background-color: ${colors.avatarBackground};

  ${upFromBreakpoint('small')} {
    grid-template-columns: 160px auto;
  }
`

const Content = styled.div`
  flex-grow: 1;

  > * + * {
    margin-top: 0.5em;
  }
`

export const Author: FC<IAuthorFields> = ({ name, avatar, richText }) => {
  const imgSrc = avatar?.fields?.file?.url
  return (
    <Paper component={AuthorContainer} elevation={3}>
      <Image
        src={imgSrc || 'https://www.gravatar.com/avatar/0?d=mp'}
        width={200}
        alt={name}
      />
      <Content>
        <Headline4>Author: {name}</Headline4>
        <RichText content={richText} />
      </Content>
    </Paper>
  )
}
