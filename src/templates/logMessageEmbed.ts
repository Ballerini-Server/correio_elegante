import { GuildMember, MessageEmbed, User } from "discord.js"

export function messageLogEmbed(member: GuildMember | User, message: string, from: User) {
  const embed = new MessageEmbed({
    description: `**Uma nova mensagem** 💗`,
    fields: [
      {
        name: 'Para:',
        value: `<@${member.id}>`
      },
      {
        name: 'De:',
        value: `<@${from.id}>`
      }
    ],
    footer: {
      text: message,
    }
  })
  return embed;
}
