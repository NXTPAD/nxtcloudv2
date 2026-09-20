export function onRequestGet(context) {
  return Response.json({
    ok: true,
    chains: ["Solana","Ethereum","Base","BNB Chain","Polygon","Arbitrum","Avalanche","Sui"],
    features: {
      dex: true,
      launchpad: true,
      ai: true,
      wallet: true
    }
  });
}
