var TelegramBot = require('node-telegram-bot-api');

var token = '728024267:AAHSCrzaKxxncCrUfzrZnu67qtvjZDcp0EM';
var bot = new TelegramBot(token, {polling: true});

var notes = [];
bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2];

    notes.push({ 'uid': userId, 'time': time, 'text': text });
    var cuDate = new Date();
    var myMessage = cuDate + ' Отлично! Я обязательно напомню, если не сдохну :)'
    bot.sendMessage(userId, myMessage);
    setInterval(function(){
        for (var i = 0; i < notes.length; i++){
            var curDate = new Date().getHours() + ':' + new Date().getMinutes();
                if ( notes[i]['time'] == curDate ) {
                    bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
                    notes.splice(i,1);
                }
            }
    },1000);
});
