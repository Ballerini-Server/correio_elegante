import { Client } from "discord.js";

export class Bot {
  static bot: Client;
  static getInstance() {
    if (!Bot.bot)
      Bot.bot = new Client({
        intents: ['GUILD_MESSAGES', 'GUILDS'],
        partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER']
      });
    return Bot.bot
  }
}
