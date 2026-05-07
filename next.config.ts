import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; img-src 'self' https://images.pokemontcg.io https://tcgplayer-cdn.tcgplayer.com data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.stripe.com https://checkout.stripe.com; frame-src https://checkout.stripe.com;",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pokemontcg.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tcgplayer-cdn.tcgplayer.com",
        pathname: "/**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;