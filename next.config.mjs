import { withSerwist } from "@serwist/turbopack";

/**
 * Exportar configuración de Next.js con Serwist
 */
export default withSerwist({
  output: "standalone",
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    /**
     * Reescribe los imports de barril (`import { Box } from "@mui/material"`) al
     * módulo concreto. Hay 664 archivos importando del barril de @mui/material:
     * sin esto, cada uno arrastra el índice completo del paquete al grafo.
     */
    optimizePackageImports: [
      "@mui/material",
      "@mui/icons-material",
      "@mui/x-data-grid",
      "@mui/x-date-pickers",
      "date-fns",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'resources.apymsa.com.mx',
      },
    ],
  },

  async rewrites() {
    const tdcGatewayUrl = process.env.NEXT_PUBLIC_TDC_GATEWAY_URL;

    // Avoid invalid rewrite destinations when env vars are missing in local checks.
    if (!tdcGatewayUrl) {
      return [];
    }

    return [
      {
        source: "/api/tdc/:path*",
        destination: `${tdcGatewayUrl}/api/v1/:path*`,
      },
    ];
  },
});
