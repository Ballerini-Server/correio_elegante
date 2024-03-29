import { GuildMember, TextChannel, User } from "discord.js";
import { Bot } from "..";
import { messageEmbed } from "../../templates/messageEmbed";

const bot = Bot.getInstance();
const logChannel = process.env.CHANNEL_ID as string;

export async function sendMessage(member: GuildMember | User, message: string) {
  const embed = messageEmbed(member, message)
  const channel = bot.channels.cache.get(logChannel) as TextChannel

  await channel.send({ embeds: [embed], content: `<@${member.id}>` })
}
