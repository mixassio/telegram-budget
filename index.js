import TelegramBot from 'node-telegram-bot-api';

const token = '728024267:AAHSCrzaKxxncCrUfzrZnu67qtvjZDcp0EM';
const bot = new TelegramBot(token, {polling: true});


const IdMisha = 276986665;
const IdTanya = 378986745;
const dayLimit = 1000;
let currentMisha = 0;
let currentTania = 0;

bot.onText(/(.+) (\d+)/, function (msg, match) {
    const userId = msg.from.id;
    if (userId === IdMisha || userId === IdTanya) {
        const text = match[1];
        const cost = match[2];
        
        const messageTania = `Misha spended ${cost} \n His budget on today: ${currentMisha}`
        // const messageMisha = `text: ${text} cost: ${cost}`
        bot.sendMessage(IdMisha, messageMisha);
        bot.sendMessage(IdTanya, messageTania);
    } else {
        bot.sendMessage(userId, 'You are not our family. Get away!');
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