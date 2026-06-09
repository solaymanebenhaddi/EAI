import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NODE_ENV === 'development' ? '.next_dev' : '.next',
  output: 'export',
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default withNextIntl(nextConfig);
