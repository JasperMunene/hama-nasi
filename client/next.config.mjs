/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['images.unsplash.com', 'img.freepik.com', 'cdn.prod.website-files.com'],
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: {
          and: [/\.(js|ts)x?$/],
        },
        use: ["@svgr/webpack"],
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  