import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function photonDebugProxy() {
  return {
    name: 'autofenix-photon-debug-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const requestUrl = new URL(req.url || '/', 'http://localhost');
        if (!requestUrl.pathname.startsWith('/__geocoding/photon')) {
          next();
          return;
        }

        const isReverse = requestUrl.pathname === '/__geocoding/photon/reverse';
        const isSearch = requestUrl.pathname === '/__geocoding/photon' || requestUrl.pathname === '/__geocoding/photon/';
        if (!isReverse && !isSearch) {
          next();
          return;
        }

        const upstreamUrl = new URL(
          isReverse ? 'https://photon.komoot.io/reverse' : 'https://photon.komoot.io/api/',
        );
        upstreamUrl.search = requestUrl.search;
        const query = requestUrl.searchParams.get('q') || '';
        const startedAt = Date.now();

        console.info(
          `[AutoFênix][Photon] → ${isReverse ? 'reverse' : 'search'} ${query || requestUrl.searchParams.toString()}`,
        );

        try {
          const upstreamResponse = await fetch(upstreamUrl, {
            headers: {
              Accept: 'application/json',
              'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
            },
          });
          const body = await upstreamResponse.text();
          const elapsedMs = Date.now() - startedAt;

          res.statusCode = upstreamResponse.status;
          res.setHeader('Content-Type', upstreamResponse.headers.get('content-type') || 'application/json');
          res.setHeader('Cache-Control', 'no-store');

          if (!upstreamResponse.ok) {
            console.error(
              `[AutoFênix][Photon] ✗ HTTP ${upstreamResponse.status} em ${elapsedMs}ms; consulta="${query}"; resposta=${body.slice(0, 500)}`,
            );
          } else {
            console.info(
              `[AutoFênix][Photon] ✓ HTTP ${upstreamResponse.status} em ${elapsedMs}ms; consulta="${query}"; bytes=${body.length}`,
            );
          }

          res.end(body);
        } catch (error) {
          console.error(
            `[AutoFênix][Photon] ✗ Erro de rede após ${Date.now() - startedAt}ms; consulta="${query}":`,
            error,
          );
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Não foi possível conectar ao serviço Photon.', detail: error.message }));
        }
      });
    },
  };
}

// O proxy de desenvolvimento registra no terminal do VS Code a resposta real do Photon.
// Em produção, o front-end consulta diretamente o endpoint público.
export default defineConfig({
  plugins: [react(), photonDebugProxy()],
});
