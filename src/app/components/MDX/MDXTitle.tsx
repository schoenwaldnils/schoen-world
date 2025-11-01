import { ComponentPropsWithoutRef } from 'react'

import { Title, TitleProps } from '@/components/Title'

export const MDXTitle = (
  props: ComponentPropsWithoutRef<'div'> & TitleProps,
) => <Title {...props} />
