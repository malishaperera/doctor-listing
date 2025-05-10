import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        domains: [
            'vethdqzaejfxrgwztqrt.supabase.co', //Supabase host
            'zoqzmmbdvljjjxtnprkm.supabase.co', // Original Supabase host from  code
            'via.placeholder.com' // Keep if using placeholder images
        ],
    },
};

export default nextConfig;
