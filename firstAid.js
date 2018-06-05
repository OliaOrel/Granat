'use strict';

const mod = require("./tree.js");
const Node = mod.Node;
const Tree = mod.Tree;

const data = JSON
  .parse(require('fs')
  .readFileSync(__dirname + '/info.json'));
const answer = data;

const TelegramBot = require('node-telegram-bot-api');
const token = '582454263:AAGz7uCMCWIvPD6BNO7lq-2DaS_MOuw5dD4';
const bot = new TelegramBot(token, { polling: true });

const tree = new Tree("Что у Вас случилось?\nВыберите из списка:");
tree.build(answer, tree.root);

let cur = tree.root;

bot.onText(/(.*)/, function(msg) {
  const userId = msg.from.id;
  if (msg.text === "\/start") {
    cur = tree.root;
    tree.getChildren(cur, (str) => bot.sendMessage(userId, str));
  } else if (msg.text === "\/up") {
    if (cur.parent) {
      cur = cur.parent;
      tree.getChildren(cur, (str) => bot.sendMessage(userId, str));
    }
  } else {
    if (tree.findByIndex(cur, msg.text)) {
      cur = tree.findByIndex(cur, msg.text);
      tree.getChildren(cur, (str) => bot.sendMessage(userId, str));
    } else {
      bot.sendMessage(userId, "Не найдено :(")
    }
  }
});
