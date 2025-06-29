import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	// Configurar para usar Bun como gestor de paquetes
	experimental: {
		// Deshabilitar el parcheo automático del lockfile que causa problemas con Bun
		disableOptimizedLoading: true
	}
};

export default nextConfig;
