import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/parishes/headquarters",
        destination: "/parishes/headquarter",
        permanent: true,
      },
      {
        source: "/parishes/headquarters/live",
        destination: "/parishes/headquarter/live",
        permanent: true,
      },
      {
        source: "/locations/headquarters",
        destination: "/locations/headquarter",
        permanent: true,
      },
      {
        source: "/parishes/pantego",
        destination: "/parishes/sharon-texas",
        permanent: true,
      },
      {
        source: "/parishes/pantego/live",
        destination: "/parishes/sharon-texas/live",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
