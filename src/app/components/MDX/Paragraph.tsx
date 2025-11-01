import { ComponentPropsWithoutRef } from 'react'

type ParagraphProps = ComponentPropsWithoutRef<'p'>

export const Paragraph = (props: ParagraphProps) => (
  <p className="p" {...props} />
)
