import { Sys } from 'contentful'

import { CONTENT_TYPE } from '../@types/generated/contentful'

export const getContentType = ({ sys }: { sys: Sys }): CONTENT_TYPE => {
  return sys.contentType.sys.id as CONTENT_TYPE
}
