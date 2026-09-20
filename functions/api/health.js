export function onRequestGet(context) {
  return Response.json({
    ok: true,
    service: "NXT CLOUD V2",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
}
