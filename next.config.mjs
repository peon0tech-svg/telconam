import nextra from 'nextra'

const withNextra = nextra({
  // Nextra configuration options
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    workerThreads: false,
    cpus: 1,
    webpackBuildWorker: true,
  },
  webpack: (config) => {
    // Disable JS/CSS minification to dramatically lower memory footprint during build
    config.optimization.minimize = false;
    return config;
  }
}

export default withNextra(nextConfig)
