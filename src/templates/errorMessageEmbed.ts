import { MessageEmbed } from "discord.js"

const errorMessage = `Desculpa, eu não encontrei a pessoa que me pediu. Por favor, tente novamente, envie uma mensagem em um desses formatos:

\`<3correio 776083372787236864 Como você está elegante hoje!\`
\`<3correio Correio Elegante#2462 Como você está elegante hoje!\`

Para descobrir o Id da pessoa, você pode digitar \\ @Usuario#Number
`;

export const errorMessageEmbed = () => {
  const embed = new MessageEmbed({
    type: 'rich',
    description: errorMessage
  })
  return embed;
}
