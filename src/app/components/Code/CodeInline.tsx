'use client'

import Lowlight from './highlight-js'

interface CodeInlineProps {
  children: string
  language?: string
  className?: string
}

export const CodeInline = ({
  children,
  language,
  className,
  ...props
}: CodeInlineProps) => {
  return (
    <Lowlight
      className={className}
      language={language}
      value={children}
      inline={true}
      markers={[]}
      {...props}
    />
  )
}
