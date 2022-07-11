import { MessageEmbed } from "discord.js"

const welcomeMessage = `Oi! Bem vindo ao correio elegante 💗!
Envie uma mensagem em um desses formatos para mandar uma mensagem anônima!

\`<3correio 776083372787236864 Como você está elegante hoje!\`
\`<3correio Correio Elegante#2462 Como você está elegante hoje!\`

Para descobrir o Id da pessoa, você pode digitar \\ @Usuario#Number
`;

export const wellcomeMessageEmbed = () => {
  const embed = new MessageEmbed({
    type: 'rich',
    description: welcomeMessage
  })
  return embed;
}
