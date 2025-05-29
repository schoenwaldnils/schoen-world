import Page from './[slug]/page'

export default function Home() {
  return <Page params={Promise.resolve({ slug: 'home' })} />
}
