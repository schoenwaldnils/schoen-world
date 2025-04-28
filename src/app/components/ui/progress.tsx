'use client'

import { Root, Indicator } from '@radix-ui/react-progress'
import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export const Progress = ({
  className,
  value,
  ...props
}: ComponentProps<typeof Root>) => {
  return (
    <Root
      data-slot="progress"
      className={cn(
        'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
        className,
      )}
      {...props}
    >
      <Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </Root>
  )
}
