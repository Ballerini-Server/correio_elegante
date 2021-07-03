import "dotenv/config";
import Discord from "discord.js";

const { token, channelId, correioLog, guildId } = process.env
const mailCommand = '<3correio';

const errorMessage = `Desculpa, eu não encontrei a pessoa que me pediu. Por favor, tente novamente, envie uma mensagem em um desses formatos:
\`<3correio 553414151758807064 Como você está elegante hoje!\`
\`<3correio balle#1404 Como você está elegante hoje!\`
Para descobrir o Id da pessoa, você pode digitar \\ @Usuario#Number
`

const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USERS', 'GUILD_MEMBER'],
});


let guild = client.guilds.cache.get(guildId)

client.on('ready', () => {
  guild = client.guilds.cache.get(guildId)
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
    userTag = message.content.slice(command.length + 1, index + 5)
    msg = message.content.slice(index + 5, message.content.length)
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
    const user = client.users.cache.find(u => {
      if (u.bot) return false;
      return u.tag === userTag || u.id === userTag
    })
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

client.login(token)