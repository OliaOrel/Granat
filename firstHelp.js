'use strict';

const data = JSON
  .parse(require('fs')
  .readFileSync(__dirname + '/info.json'));
const answer = data;

const TelegramBot = require('node-telegram-bot-api');
const token = '582454263:AAGz7uCMCWIvPD6BNO7lq-2DaS_MOuw5dD4';
const bot = new TelegramBot(token, {polling: true});

// const answer = 'Приложите подорожник.';

let userId;

bot.onText(/\/start/, function(msg) {
  userId = msg.from.id;
  bot.sendMessage(userId, "Что у Вас случилось?\nВыберите из списка:");
  choice(0, answer, (key) => {
    bot.sendMessage(userId, key);
    console.log(key);
  });
});

function choice(i, obj, callback) {
  const keys = Object.keys(obj);
  let key = keys[i];
  if (typeof callback === 'function') {
    callback(key);
  }
  i++;
  if (i < keys.length) {
    choice(i, obj, (key) => {
      bot.sendMessage(userId, key);
      console.log(key);
    });
  };
};



bot.onText(/(.*[^/start])/, function(msg) {
  bot.sendMessage(userId, "Some words");
});
