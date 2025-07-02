import { ComponentPropsWithoutRef, ReactElement } from 'react'

import { CodeBlock } from '../Code/CodeBlock'
import { CodeInline } from '../Code/CodeInline'

interface CodeProps extends ComponentPropsWithoutRef<'code'> {
  className?: string
}

const childrenToString = (children: unknown): string => {
  if (Array.isArray(children)) {
    return children.map(childrenToString).join('')
  }
  if (typeof children === 'string') {
    return children
  }
  if (typeof children === 'number') {
    return children.toString()
  }
  return ''
}

export const Code = ({ className, children, ...props }: CodeProps) => {
  const language = className?.replace('language-', '') || undefined
  const codeString = childrenToString(children)

  // If there's no className or it's not a language class, treat as inline code
  if (!className || !className.startsWith('language-')) {
    return <CodeInline {...props}>{codeString}</CodeInline>
  }

  // Otherwise, treat as block code
  return <CodeBlock language={language}>{codeString}</CodeBlock>
}

export const Pre = ({
  children,
  ...props
}: ComponentPropsWithoutRef<'pre'>) => {
  // Extract the code element from pre
  if (children && typeof children === 'object' && 'props' in children) {
    const codeElement = children as ReactElement<{
      className?: string
      children: unknown
    }>
    if (codeElement.props) {
      const { className, children: codeChildren } = codeElement.props
      const language = className?.replace('language-', '') || undefined
      const codeString = childrenToString(codeChildren)

      return <CodeBlock language={language}>{codeString}</CodeBlock>
    }
  }

  // Fallback to regular pre
  return <pre {...props}>{children}</pre>
}
