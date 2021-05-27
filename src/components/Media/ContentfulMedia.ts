import { createElement, FC } from 'react'

import { IMedia } from '../../@types/generated/contentful.d'
import { Media } from '.'

export const ContentfulMedia: FC<IMedia> = ({ fields }) => {
  return createElement(Media, fields)
}
