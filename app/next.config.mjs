/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Impede o Next de eliminar o binário do Prisma no build serverless
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
  },
  webpack(config) {
    // Inclui manualmente o binário do Prisma no pacote da Vercel
    config.externals.push("@prisma/client", "prisma");
    return config;
  },
};

export default nextConfig;
