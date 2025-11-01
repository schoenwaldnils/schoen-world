import { ComponentPropsWithoutRef } from 'react'

type HeadingProps = ComponentPropsWithoutRef<'h1'>

export const H1 = (props: HeadingProps) => <h1 className="h1" {...props} />

export const H2 = (props: HeadingProps) => <h2 className="h2" {...props} />

export const H3 = (props: HeadingProps) => <h3 className="h3" {...props} />

export const H4 = (props: HeadingProps) => <h4 className="h4" {...props} />
