
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
       {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'www.themoviedb.org',
      },
      {
        protocol: 'https',
        hostname: 'imagetot.com',
      },
      {
        protocol: 'https',
        hostname: 'i3.extraimage.xyz',
      },
      {
        protocol: 'https',
        hostname: 'i4.extraimage.xyz',
      },
      {
        protocol: 'https',
        hostname: 'i5.extraimage.xyz',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'new2.imgpress.xyz',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      }
    ],
  },
};

export default nextConfig;
