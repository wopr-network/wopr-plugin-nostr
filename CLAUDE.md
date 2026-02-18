# wopr-plugin-nostr

`@wopr-network/wopr-plugin-nostr` — Nostr decentralized protocol channel plugin for WOPR.

## Commands

```bash
npm run build     # tsc
npm run dev       # tsc --watch
npm run check     # biome check + tsc --noEmit (run before committing)
npm run lint:fix  # biome check --fix src/
npm run format    # biome format --write src/
npm test          # vitest run
```

**Linter/formatter is Biome.** Never add ESLint/Prettier config.

## Architecture

```
src/
  index.ts              # Plugin entry — exports WOPRPlugin default
  channel-provider.ts   # Implements ChannelProvider interface
  relay-pool.ts         # SimplePool wrapper with health tracking
  event-handler.ts      # Incoming event processing (kind 1, kind 4)
  event-publisher.ts    # Outgoing event creation, signing, publishing
  crypto.ts             # NIP-04 encrypt/decrypt, key format conversion
  types.ts              # Plugin-local types + re-exports
```

## Key Details

- **Library**: nostr-tools v2.x — NIP-01 events, NIP-04 DMs, NIP-19 encoding
- Implements `ChannelProvider` from `@wopr-network/plugin-types`
- Private key configured via nsec (bech32) or hex in plugin config schema
- Default relays: relay.damus.io, relay.nostr.band, nos.lol, relay.snort.social

## Plugin Contract

Imports only from `@wopr-network/plugin-types`. Never import from `@wopr-network/wopr` core.

## Issue Tracking

All issues in **Linear** (team: WOPR). Issue descriptions start with `**Repo:** wopr-network/wopr-plugin-nostr`.
