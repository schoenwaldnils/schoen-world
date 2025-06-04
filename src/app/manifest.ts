import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Schönwald',
    short_name: 'Schönwald',
    description: 'Frontend Developer based in Hamburg',
    start_url: '/',
    display: 'browser',
    background_color: '#424242',
    theme_color: '#ba3e48',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
