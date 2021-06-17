import { createElement, FC } from 'react'

import { IMedia } from '../../@types/generated/contentful.d'
import { Media } from '.'

export const ContentfulMedia: FC<IMedia> = ({ fields }) => {
  if (!fields.asset.fields.file.url.includes('http')) {
    fields.asset.fields.file.url = `https:${fields.asset.fields.file.url}`
  }

  return createElement(Media, fields)
}
