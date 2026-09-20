export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return Response.json({
        ok: true,
        service: "NXT CLOUD V2",
        version: "2.0.0",
        timestamp: new Date().toISOString()
      });
    }

    if (url.pathname === "/api/config") {
      return Response.json({
        ok: true,
        chains: [
          "Solana",
          "Ethereum",
          "Base",
          "BNB Chain",
          "Polygon",
          "Arbitrum",
          "Avalanche",
          "Sui"
        ],
        features: {
          dex: true,
          launchpad: true,
          ai: true,
          wallet: true
        }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
