import { ComponentPropsWithoutRef } from 'react'

export const Emphasis = (props: ComponentPropsWithoutRef<'em'>) => (
  <em {...props} />
)

export const Strong = (props: ComponentPropsWithoutRef<'strong'>) => (
  <strong {...props} />
)
