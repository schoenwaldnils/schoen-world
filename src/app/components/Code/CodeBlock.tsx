import { ComponentPropsWithoutRef } from 'react'

import Lowlight from './highlight-js'

interface CodeBlockProps extends ComponentPropsWithoutRef<'div'> {
  children: string
  language?: string
}

export const CodeBlock = ({
  children,
  language,
  className,
  ...props
}: CodeBlockProps) => {
  return (
    <div className={className} {...props}>
      <Lowlight language={language} value={children} markers={[]} />
    </div>
  )
}
