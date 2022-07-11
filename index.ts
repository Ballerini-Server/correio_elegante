import "dotenv/config";
import Discord from "discord.js";

const { BOT_TOKEN, channelId, correioLog, guildId, mailCommand } = process.env

const errorMessage = `Desculpa, eu não encontrei a pessoa que me pediu. Por favor, tente novamente, envie uma mensagem em um desses formatos:
\`<3correio 776083372787236864 Como você está elegante hoje!\`
\`<3correio Correio Elegante#2462 Como você está elegante hoje!\`
Para descobrir o Id da pessoa, você pode digitar \\ @Usuario#Number
`;

const welcomeMessage = `Oi! Bem vindo ao correio elegante 💗!
Envie uma mensagem em um desses formatos para mandar uma mensagem anônima!
\`<3correio 776083372787236864 Como você está elegante hoje!\`
\`<3correio Correio Elegante#2462 Como você está elegante hoje!\`
Para descobrir o Id da pessoa, você pode digitar \\ @Usuario#Number
`;

const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USERS', 'GUILD_MEMBER'],
});


let guild = client.guilds.cache.get(guildId)

client.on('ready', async () => {
  guild = client.guilds.cache.get(guildId)
  await client.user.setPresence({
    activity: {
      name: 'Apaixonado 💗! Envie <3correio para enviar um correio elegante 💗!',
    }
  });
})

async function sendMessage(user, message) {
  const channel = await client.channels.fetch(channelId);
  await channel.send(`
  > ** De:** Anônimo
    > ** Para:** <@${user.id}>
${message}
`)
}

async function sendLogMessage(user, message, from) {
  const channel = await client.channels.fetch(correioLog);
  await channel.send(`
  > ** De:**  <@${from.id}>
  > ** Para:** <@${user.id}>
${message}
`)
}

client.on('message', async (message) => {
  const result = message.mentions.users.get(client.user.id);
  if (result) {
    await message.author.send(welcomeMessage)
    return;
  }

  if (message.channel.id === channelId && !message.author.bot) {
    try {
      await message.delete()
    } catch { }
  }

  if (message.author.bot || !message.content.startsWith(mailCommand)) return;
  try {
    await message.delete()
  } catch { }

  let [command, userTag, ...msg] = message.content.split(' ');

  if (isNaN(userTag)) {
    const index = message.content.indexOf('#')

    if (index > 0) {
      userTag = message.content.slice(command.length + 1, index + 5)

      msg = message.content.slice(index + 5, message.content.length)
    } else {
      msg = msg.join(' ')
    }
  } else {
    msg = msg.join(' ')
  }

  guild.emojis.cache.map(emoji => {
    if (msg.includes(`:${emoji.name}:`)) {
      const regex = new RegExp(`<:${emoji.name}:([0-9]{18})>|:${emoji.name}:`, "g")
      msg = msg.replace(regex, emoji)
    }
  })

  try {
    let user;
    user = client.users.cache.find(u => {
      if (u.bot) return false;
      return u.tag === userTag || u.id === userTag
    })
    if (message.mentions.users.size > 0 && !user) {
      user = message.mentions.users.first();
    }
    if (user) {
      await sendMessage(user, msg)
      await sendLogMessage(user, msg, message.author)
      await message.author.send('Mensagem enviada com sucesso')
    } else {
      await message.author.send(errorMessage)
    }
  } catch (error) {
    await message.author.send(errorMessage)
    console.log(error)
  }

})

client.login(BOT_TOKEN)
