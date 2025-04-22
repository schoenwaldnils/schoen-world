import clsx from 'clsx/lite'
import { Link as NextLink } from 'next-view-transitions'
import { LinkProps } from 'next/link'

import css from './Link.module.css'
import { AnchorHTMLAttributes } from 'react'

export const Link = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NextLink>) => {
  const isExternal =
    typeof props.href === 'string' &&
    (props.href.startsWith('http') || props.href.startsWith('//'))

  if (isExternal) {
    const aProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
      ...props,
      href: props.href as string,
      target: props.target ?? '_blank',
      rel: props.rel ?? 'noopener noreferrer',
    }

    return (
      <a
        {...aProps}
        className={clsx(css.link, isExternal && css.external, className)}
      >
        {children}
      </a>
    )
  }

  return (
    <NextLink {...props} className={clsx(css.link, className)}>
      {children}
    </NextLink>
  )
}
