import type { ChannelCommand, ChannelMessageParser, ChannelProvider } from "@wopr-network/plugin-types";
import type { EventPublisher } from "./event-publisher.js";

let publisher: EventPublisher | null = null;
let botNpub = "unknown";

export function setPublisher(p: EventPublisher | null): void {
  publisher = p;
}

export function setBotNpub(npub: string): void {
  botNpub = npub;
}

export function getBotNpub(): string {
  return botNpub;
}

const registeredCommands = new Map<string, ChannelCommand>();
const registeredParsers = new Map<string, ChannelMessageParser>();

export const nostrChannelProvider: ChannelProvider = {
  id: "nostr",

  registerCommand(cmd: ChannelCommand): void {
    registeredCommands.set(cmd.name, cmd);
  },

  unregisterCommand(name: string): void {
    registeredCommands.delete(name);
  },

  getCommands(): ChannelCommand[] {
    return Array.from(registeredCommands.values());
  },

  addMessageParser(parser: ChannelMessageParser): void {
    registeredParsers.set(parser.id, parser);
  },

  removeMessageParser(id: string): void {
    registeredParsers.delete(id);
  },

  getMessageParsers(): ChannelMessageParser[] {
    return Array.from(registeredParsers.values());
  },

  async send(channelId: string, content: string): Promise<void> {
    if (!publisher) throw new Error("Nostr publisher not initialized");

    if (channelId.startsWith("dm:")) {
      const recipientPubkey = channelId.slice(3);
      await publisher.publishDM(content, recipientPubkey);
    } else {
      throw new Error(`Unsupported Nostr channel format: ${channelId}`);
    }
  },

  getBotUsername(): string {
    return botNpub;
  },
};
