import { ComponentPropsWithoutRef } from 'react'

type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>

export const Blockquote = (props: BlockquoteProps) => <blockquote {...props} />
