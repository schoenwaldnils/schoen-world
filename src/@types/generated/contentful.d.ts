// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from 'contentful'
import { Document } from '@contentful/rich-text-types'

export interface IAuthorFields {
  /** Name */
  name: string

  /** Rich Text */
  richText: Document

  /** Avatar */
  avatar?: Asset | undefined
}

export interface IAuthor extends Entry<IAuthorFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'author'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ICodeBlockFields {
  /** Internal Name */
  internalName: string

  /** Code */
  code: string

  /** Syntax */
  syntax?: 'html' | 'css' | 'react' | 'shell' | 'yaml' | undefined
}

export interface ICodeBlock extends Entry<ICodeBlockFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'codeBlock'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ICodePenEmbedFields {
  /** Internal Name */
  internalName: string

  /** Title */
  title: string

  /** Id */
  id: string

  /** Username */
  username: string

  /** Default Panes */
  defaultPanes?: ('html' | 'css' | 'js' | 'result')[] | undefined

  /** height */
  height?: number | undefined
}

export interface ICodePenEmbed extends Entry<ICodePenEmbedFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'codePenEmbed'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IGalleryFields {
  /** Title */
  title?: string | undefined

  /** Image */
  image?: Asset[] | undefined
}

export interface IGallery extends Entry<IGalleryFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'gallery'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IMediaFields {
  /** Internal Name */
  internalName: string

  /** Alt Text */
  altText?: string | undefined

  /** Description */
  description?: string | undefined

  /** Asset */
  asset: Asset

  /** Youtube Video ID */
  youtubeVideoId?: string | undefined

  /** Float */
  float?: 'left' | 'right' | undefined

  /** width */
  width?: number | undefined

  /** Align horizontal */
  alignHorizontal?: 'left' | 'center' | 'right' | undefined
}

export interface IMedia extends Entry<IMediaFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'media'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IPageFields {
  /** Title */
  title: string

  /** Slug */
  slug: string

  /** Image */
  image?: Asset | undefined

  /** Description */
  description: string

  /** Rich Text */
  richText: Document
}

export interface IPage extends Entry<IPageFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'page'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IPagePhotoFields {
  /** Title */
  title?: string | undefined

  /** Gallery */
  gallery?: IGallery | undefined

  /** content */
  content?: Document | undefined
}

export interface IPagePhoto extends Entry<IPagePhotoFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'pagePhoto'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IPostFields {
  /** Title */
  title: string

  /** Slug */
  slug: string

  /** Date */
  date?: string | undefined

  /** Tags */
  tags?: string[] | undefined

  /** Image */
  image?: Asset | undefined

  /** Description */
  description: string

  /** Rich Text */
  richText: Document

  /** Author */
  author?: IAuthor | undefined
}

export interface IPost extends Entry<IPostFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'post'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export type CONTENT_TYPE =
  | 'author'
  | 'codeBlock'
  | 'codePenEmbed'
  | 'gallery'
  | 'media'
  | 'page'
  | 'pagePhoto'
  | 'post'

export type LOCALE_CODE = 'en-US'

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'en-US'
