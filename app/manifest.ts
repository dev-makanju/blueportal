import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'InstaShop',
    short_name: 'InstaShop',
    description: 'PWA built with passion for InstaShop',
    start_url: '/',
    display: 'standalone',
    background_color: '#eee',
    theme_color: '#88226F',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}