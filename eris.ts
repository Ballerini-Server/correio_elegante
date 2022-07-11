import "dotenv/config";
import { Bot } from "./src/Bot";
import './src/Bot/events/ready.event'
import './src/Bot/events/interactionCreate.event'

const bot = Bot.getInstance()
bot.login(process.env.BOT_TOKEN as string);
