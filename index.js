import TelegramBot from 'node-telegram-bot-api';

const token = '728024267:AAHSCrzaKxxncCrUfzrZnu67qtvjZDcp0EM';
const bot = new TelegramBot(token, {polling: true});

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
    if (users(userId)) {
        const text = match[1];
        const cost = match[2];
        bot.sendMessage(userId, `${text}, ${cost}`);
        /*
        users[userId].current -= cost;
        const message = `${users[userId].name} потратил ${cost} на ${text} \n Остаток бюджета на сегодня: ${users[userId].current}`;
        bot.sendMessage(userId, message);
        bot.sendMessage(users[userId].otherUser, message);
        */
    } else {
        bot.sendMessage(userId, 'Вы не из нашей семьи, проваливайте!');
    }
    
    
});

/*
bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
    const userId = msg.from.id;
    const text = match[1];
    const time = match[2];

    notes.push({ 'uid': userId, 'time': time, 'text': text });
    const cuDate = new Date();
    const myMessage = `User: ${userId} Отлично! Я обязательно напомню:)`
    bot.sendMessage(userId, myMessage);
    setInterval(function(){
        for (let i = 0; i < notes.length; i++){
            const curDate = new Date().getHours() + ':' + new Date().getMinutes();
                if ( notes[i]['time'] == curDate ) {
                    bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
                    notes.splice(i,1);
                }
            }
    }, 1000);
});
*/