import clsx from 'clsx'

import { Avatar } from '@/components/Avatar'

export const StageHome = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        'mb-8 flex flex-col-reverse items-center justify-between gap-6 md:flex-row md:items-end md:gap-8',
        className,
      )}
    >
      <div className="flex flex-col gap-2 text-center leading-tight md:text-left">
        <p>
          Hello there <span className="text-primary">🖖</span>, I'm
        </p>
        <h1 className="my-0">Nils Schönwald</h1>
      </div>
      <Avatar />
    </div>
  )
}
