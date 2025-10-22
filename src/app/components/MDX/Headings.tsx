import { ComponentPropsWithoutRef } from 'react'

type HeadingProps = ComponentPropsWithoutRef<'h1'>

export const H1 = (props: HeadingProps) => <h1 {...props} />

export const H2 = (props: HeadingProps) => <h2 {...props} />

export const H3 = (props: HeadingProps) => <h3 {...props} />

export const H4 = (props: HeadingProps) => <h4 {...props} />
