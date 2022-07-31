import {
  MessageActionRow,
  Modal,
  ModalActionRowComponent,
  TextChannel,
  TextInputComponent,
  Client,
} from "discord.js";

import { Bot } from "..";
import { messageLogEmbed } from "../../templates/logMessageEmbed";
import { sendLogMessage } from "../utils/sendLogMessage";
import { sendMessage } from "../utils/sendMessage";
const bot: Client = Bot.getInstance();

const logChannel = process.env.LOG_CHANNEL_ID as string;

bot.on("interactionCreate", async (interaction) => {
  if (
    interaction.type === "MODAL_SUBMIT" &&
    (interaction as any).customId === "create_message_modal"
  ) {
    const channel = bot.channels.cache.get(logChannel) as TextChannel;

    const username = (
      (interaction as any).fields.getTextInputValue("user") as string
    ).trim();
    const message = (interaction as any).fields.getTextInputValue("message");

    const user =
      channel.guild.members.cache.find(
        (u) => u.user.username === username.replace(/#(\d{4})/, "")
      ) ||
      (await bot.users.fetch(username).catch(() => {
        return null;
      }));

    if (!user) {
      await (interaction as any).reply({
        content: "Usuário não encontrado!",
        ephemeral: true,
      });
      return;
    }
    await sendLogMessage(user, message, interaction.user);
    await sendMessage(user, message);

    await (interaction as any).reply({
      content: "Mensagem enviada!",
      ephemeral: true,
    });
    return;
  }

  if (!interaction.isCommand() && !interaction.isButton()) return;

  const modal = new Modal()
    .setCustomId("create_message_modal")
    .setTitle("Envie uma mensagem para um membro");

  const user = new TextInputComponent()
    .setCustomId("user")
    .setLabel("Para quem quer enviar a mensagem?")
    .setStyle("SHORT");
  const message = new TextInputComponent()
    .setCustomId("message")
    .setLabel("O que quer que eu diga por você?")
    .setStyle("PARAGRAPH");

  const firstActionRow =
    new MessageActionRow<ModalActionRowComponent>().addComponents(user);
  const secondActionRow =
    new MessageActionRow<ModalActionRowComponent>().addComponents(message);
  modal.addComponents(firstActionRow, secondActionRow);

  if (
    interaction.type === "MESSAGE_COMPONENT" &&
    (interaction as any).customId === "create_message_button"
  )
    await interaction.showModal(modal);
});
