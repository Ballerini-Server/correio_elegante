import "dotenv/config";
import { Client } from "discord.js";

const { token, channelId, correioLog } = process.env

const client = new Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"],
});

async function sendMessage(user, message) {
  const channel = await client.channels.fetch(channelId);
  await channel.send(`
  > **De:** Anônimo
  > **Para:** <@${user.id}>
  ${message} 
  `)
}

async function sendLogMessage(user, message, from) {
  const channel = await client.channels.fetch(correioLog);
  await channel.send(`
  > **De:**  <@${from.id}>
  > **Para:** <@${user.id}>
  ${message} 
  `)
}

client.on('message', async (message) => {
  if (message.author.bot) return;
  const command = '<3correio';
  if (message.content.startsWith(command)) {
    const [, id, ...args] = message.content.split(' ');
    try {
      const user = await client.users.fetch(id)
      if (user) {
        await sendMessage(user, args.join(' '))
        await sendLogMessage(user, args.join(' '), message.author)
      } else {
        message.reply(`Desculpa, eu não encontrei a pessoa que me pediu. Por favor, tente novamente, envie uma mensagem em um desses formatos:
      \`<3correio 553414151758807064 Como você está elegante hoje!\`
      `)
      }
      message.delete()
    } catch (error) {
      console.log(error)
    }
  }

})


client.login(token)