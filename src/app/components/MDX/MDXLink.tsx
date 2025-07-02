import { ComponentPropsWithoutRef } from 'react'

import { Link } from '@/components/Link'

type AnchorProps = ComponentPropsWithoutRef<'a'>

export const MDXLink = ({ href, ...props }: AnchorProps) =>
  href ? <Link href={href} {...props} /> : null
