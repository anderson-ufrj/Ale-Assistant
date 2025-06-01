import createNextIntlPlugin from 'next-intl/plugin'


const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
  
  // Performance optimizations
  modularizeImports: {
    'firebase/auth': {
      transform: 'firebase/auth/{{member}}'
    },
    'firebase/firestore': {
      transform: 'firebase/firestore/{{member}}'
    },
    'firebase/analytics': {
      transform: 'firebase/analytics/{{member}}'
    },
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}'
    }
  },
  
  webpack: (config, { isServer }) => {
    // Tree-shake unused Firebase imports
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@firebase/auth': '@firebase/auth/dist/index.esm.js',
        '@firebase/firestore': '@firebase/firestore/dist/index.esm.js',
      }
    }
    
    return config
  }
}

export default withNextIntl(nextConfig)