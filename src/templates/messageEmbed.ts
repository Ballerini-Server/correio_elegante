import { GuildMember, MessageEmbed } from "discord.js"

export function messageEmbed(member: GuildMember, message: string) {
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
