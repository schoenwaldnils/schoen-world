import type { Metadata } from 'next'

import CatchAllPage, {
  generateMetadata as catchAllGenerateMetadata,
} from './[...path]/page'

const homeParams = Promise.resolve({ path: ['home'] })

export const generateMetadata = (): Promise<Metadata> =>
  catchAllGenerateMetadata({ params: homeParams })

export default function HomePage() {
  return <CatchAllPage params={homeParams} />
}
