const Telegraf = require('telegraf')

const app = new Telegraf('728024267:AAHSCrzaKxxncCrUfzrZnu67qtvjZDcp0EM')
app.hears('hi', ctx => {
    return ctx.reply('Hey!');
   });
   
app.startPolling();