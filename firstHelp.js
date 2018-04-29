'use strict';

const TelegramBot = require('node-telegram-bot-api');
const token = '582454263:AAGz7uCMCWIvPD6BNO7lq-2DaS_MOuw5dD4';
const bot = new TelegramBot(token, {polling: true}); // разобраться в polling
const answer = 'Приложите подорожник и отъебитесь, будьте так добры.';

bot.onText(/\/start/, function(msg) {
  const userId = msg.from.id;
  bot.sendMessage(userId, "Что у Вас случилось?");
});

bot.onText(/(.*[^/start])/, function(msg) {
  const userId = msg.from.id;
  bot.sendMessage(userId, answer);
});
