import path from 'path';
import { defineConfig, loadEnv } from 'vite'; // 1. Importa loadEnv nuevamente
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => { // 2. Usa una función de configuración
  // 3. Carga las variables de entorno. En Vercel, usará las configuradas en su panel.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
      },
    },
    base: '/', // Esto está bien para Vercel

    // 4. DEFINIR LAS VARIABLES para que React pueda acceder a ellas.
    // Esto es seguro porque en el servidor de Vercel se inyectan las variables reales.
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    }
  };
});
