const TelegramApi = require('node-telegram-bot-api')

const {gameOptions, againOptions} = require('./options.js')

const token ='5545367755:AAHSBmUSoYJ91FcprdUNum9f4IBR_1T6Y7s';

const bot = new TelegramApi(token, {polling: true})

const chats = {};

bot.setMyCommands([
    {command: '/start', description: 'Приветствие'},
    {command: '/info', description: 'О нашем боте!'},
    {command: '/make_a_complaint', description: 'Подать жалобу!'},
    {command: '/game', description: 'Сыграть в игру!'}
]);



const startGame = async(chatId) => {
    await bot.sendMessage(chatId, 'Сейчас мы сыграем с тобой в игру, я загадаю число от 1 до 9, а ты попробуешь отгадать!')
    const randomNumber = Math.floor(Math.random()*10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай!', gameOptions)
}

const start = () => {
    
    bot.on('message', async msg =>{
        const text = msg.text;
        const chatId = msg.chat.id;
        const userName = msg.chat.username;
        // bot.sendMessage(chatId, `Здорова, бандит, слышал, что ты написал мне ${text}`)ж
    
    if(text ==='/start'){
        await bot.sendMessage(chatId, `Стартуем, ${userName}, ты не просто попал в этот чат!
    команды чата:
    /start
    /info
    /make_a_complaint
    /game`);
        return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/d06/e20/d06e2057-5c13-324d-b94f-9b5a0e64f2da/4.webp')

    }
    
    if(text ==='/info') {
        await bot.sendMessage(chatId, `${userName}, если тебя обижает жена или девушка, то тут ты в легкую можешь излить свою боль, найти поддержку и получить помощь по обращению в полицию!`);
        return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/1b5/0ab/1b50abf8-8451-40ca-be37-ffd7aa74ec4d/256/49.webp')
    }
    
        
    if(text ==='/make_a_complaint') {
        await bot.sendMessage(chatId, `Чтож, ${userName}, братишка, пацаны тоже плачут! Впиши жалобу и ничего не бойся, мы с тобой.`);
        return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/1b5/0ab/1b50abf8-8451-40ca-be37-ffd7aa74ec4d/256/49.webp')
    }

    if( text === '/game') {
        return startGame(chatId)
    }

    
    
    return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз.')

    });

    bot.on('callback_query', msg => {
        const data = msg.data;
        const playerName = msg.from.username;
        console.log(msg)
        const chatId = msg.message.chat.id;
        if( data === '/again') {return startGame(chatId)}
        if (data == chats[chatId]) {
            return bot.sendMessage(chatId, `Молодец, ${playerName}, ты отгадал число!`, againOptions)
        } else {
            return bot.sendMessage(chatId, `${playerName}, ты не отгадал число!`, againOptions)  
        }
    })

}

start();

