import fs from 'fs';
import TelegramBot from 'node-telegram-bot-api';

const token = '728024267:AAHSCrzaKxxncCrUfzrZnu67qtvjZDcp0EM';
const bot = new TelegramBot(token, {polling: true});
var originalLog = console.log;

console.log = function(str){
  originalLog(str);
  //fs.writeFileSync('data.txt', str, { flag: 'as'});
}
console.log('hello');
const dayLimit = 1000;
let users = {
    276986665: {
        name: 'Миша',
        current: dayLimit,
        otherUser: 378986745,
    },
    378986745: {
        name: 'Таня',
        current: dayLimit,
        otherUser: 276986665,
    }
}

bot.onText(/(.+) (\d+)/, function (msg, match) {
    const userId = msg.from.id;
    if (users[userId]) {
        const text = match[1];
        const cost = match[2];
        users[userId].current -= cost;
        const message = `${users[userId].name} потратил ${cost} на ${text} \n Остаток бюджета на сегодня: ${users[userId].current}`;
        bot.sendMessage(userId, message);
        bot.sendMessage(users[userId].otherUser, message);
    } else {
        bot.sendMessage(userId, 'Вы не из нашей семьи, проваливайте!');
    }

    setInterval(() => {
        console.log(new Date().toString());
        if (new Date().getHours() === 4) {
            users[276986665].current += dayLimit;
            users[378986745].current += dayLimit;
            const message = `Доброе утро, лимит увеличен на ${dayLimit} рублей.\n Бюджет на сегодня:\n ${users[276986665].name}: ${users[276986665].current} рублей.\n ${users[378986745].name}: ${users[378986745].current} рублей.`;
            bot.sendMessage(276986665, message);
            bot.sendMessage(378986745, message);
        }
    }, 60000);

});
