import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removido output: 'export' para permitir uso de middleware com i18n
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(nextConfig);