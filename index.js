import TelegramBot from 'node-telegram-bot-api';

const token = '728024267:AAHSCrzaKxxncCrUfzrZnu67qtvjZDcp0EM';
const bot = new TelegramBot(token, {polling: true});

const notes = [];
bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
    const userId = msg.from.id;
    const text = match[1];
    const time = match[2];

    notes.push({ 'uid': userId, 'time': time, 'text': text });
    const cuDate = new Date();
    const myMessage = cuDate + ' Отлично! Я обязательно напомню, если не сдохну :)'
    bot.sendMessage(userId, myMessage);
    setInterval(function(){
        for (let i = 0; i < notes.length; i++){
            const curDate = new Date().getHours() + ':' + new Date().getMinutes();
                if ( notes[i]['time'] == curDate ) {
                    bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
                    notes.splice(i,1);
                }
            }
    },1000);
});
