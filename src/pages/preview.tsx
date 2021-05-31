import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { CONTENT_TYPE, IPost } from '../@types/generated/contentful'
import { Article } from '../components/Article'
import { LoadingPage } from '../components/LoadingSpinner'
import { Page } from '../components/Page'
import { getEntryById } from '../utils/contentful'

// prettier-ignore
type ObjectType<T> =
  T extends 'post' ? IPost :
  never

const PageContentful: NextPage = () => {
  const router = useRouter()
  const { type, id, secret } = router.query

  const contentType = type as CONTENT_TYPE

  const [props, setProps] = useState<ObjectType<CONTENT_TYPE>>()

  const fetchProps = useCallback(async () => {
    const data = await getEntryById(id as string, true, secret)
    setProps(data as ObjectType<typeof contentType>)
  }, [id, secret])

  useEffect(() => {
    if (id && secret) {
      fetchProps()
    }
  }, [fetchProps, id, secret])

  if (!props) {
    return <LoadingPage />
  }

  if (contentType === 'post') {
    return <Article {...(props as ObjectType<typeof contentType>).fields} />
  }

  // eslint-disable-next-line jsx-a11y/accessible-emoji
  return <Page>Preview not found 🤔</Page>
}

export default PageContentful
