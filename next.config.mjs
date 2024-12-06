/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ssl.pstatic.net",
        pathname: "/**",
      },
    ],
    domains: ["wekids-s3.s3.ap-northeast-2.amazonaws.com"],
  },
};

export default nextConfig;
