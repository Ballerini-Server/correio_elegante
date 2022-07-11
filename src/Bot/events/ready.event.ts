import { TextChannel } from "discord.js";
import { Bot } from "..";
const bot = Bot.getInstance();

const logChannel = process.env.LOG_CHANNEL_ID as string;

bot.on('ready', async () => {
  bot.user?.setPresence({
    activities: [{
      name: 'Apaixonado 💗! Envie <3correio para enviar um correio elegante 💗!'
    }]
  })

  const guild = bot.guilds.cache.get(process.env.GUILD_ID as string);
  const channel = guild?.channels.cache.get(logChannel) as TextChannel

  if (channel)
    await channel.send({
      components: [{
        components: [{
          custom_id: 'create_message_button',
          style: 3,
          label: 'Enviar uma mensagem',
          type: 2
        }],
        type: 1,
      }]
    })
})
