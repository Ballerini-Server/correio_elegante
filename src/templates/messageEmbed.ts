import { GuildMember, MessageEmbed, User } from "discord.js"

export function messageEmbed(member: GuildMember | User, message: string) {
  const embed = new MessageEmbed({
    description: `**Uma nova mensagem** 💗`,
    fields: [
      {
        name: 'Para:',
        value: `<@${member.id}>`
      },
      {
        name: 'De:',
        value: 'Anônimo'
      }
    ],
    footer: {
      text: message,
    }
  })
  return embed;
}
