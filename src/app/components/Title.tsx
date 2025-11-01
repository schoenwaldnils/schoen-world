import { Rss as RssIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { HTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

export type TitleProps = HTMLAttributes<'div'> & {
  title: string
  rssLink?: string
  rssTitle?: string
}

export const Title = ({
  title,
  rssLink,
  rssTitle = 'Subscribe to RSS feed',
  className,
}: TitleProps) => {
  if (!rssLink) {
    return <h1 className={cn(className, 'h1')}>{title}</h1>
  }

  return (
    <div className={cn(className, 'flex items-center justify-between')}>
      <h1 className="h1">{title}</h1>
      <Link
        href="/rss.xml"
        target="_blank"
        className="rounded-sm bg-orange-400 p-1 text-white transition-colors hover:bg-orange-500"
        title={rssTitle}
      >
        <RssIcon size={16} strokeWidth={3} />
      </Link>
    </div>
  )
}
