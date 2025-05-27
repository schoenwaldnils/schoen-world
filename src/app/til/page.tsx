import { TilPosts } from '@/components/til-posts'

export const metadata = {
  title: 'Today I Learned',
  description: 'Things I learn and want to remember.',
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Today I Learned
      </h1>
      <TilPosts />
    </section>
  )
}
