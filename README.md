# NXT CLOUD V2

Unified NXT CLOUD application for:

- NXT DEX
- NXT Launchpad
- NXT AI

## Architecture

This repository intentionally starts as a lightweight Cloudflare-compatible web application. The UI is provider-agnostic so blockchain and AI infrastructure can be connected without rebuilding the product.

### Planned production integrations

- Solana wallet / transaction execution
- EVM wallet / transaction execution
- Sui wallet / transaction execution
- Live swap aggregation and quotes
- Token deployment contracts/programs per supported chain
- Cloudflare Worker API routes
- Cloudflare AI for NXT AI
- Persistent user/token data where appropriate

## Deployment

The project is deployable from GitHub through Cloudflare Pages. The current build has no npm build step: the repository root is the publish directory.

For production transaction execution, never expose private keys or provider secrets in client-side code. Keep API credentials in Cloudflare secrets and route privileged/provider operations through Workers.

## Status

Initial V2 foundation: unified responsive shell, navigation, wallet detection, DEX interface, launchpad wizard, and NXT AI interface.
