import { GuildMember, TextChannel, User } from "discord.js";
import { Bot } from "..";
import { messageLogEmbed } from "../../templates/logMessageEmbed";

const bot = Bot.getInstance();
const logChannel = process.env.LOG_CHANNEL_ID as string;

export async function sendLogMessage(member: GuildMember | User, message: string, from: User) {
  const embed = messageLogEmbed(member, message, from)

  const channel = bot.channels.cache.get(logChannel) as TextChannel

  await channel.send({ embeds: [embed] })

}
