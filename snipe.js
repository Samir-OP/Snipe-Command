const Discord = require('discord.js');
const bot = new Discord.Client()
const db = require('quick.db');

bot.on('ready', () => {
    console.log(`Dude. I'm ready.`)
})

bot.on('messageDelete', async (message) => {
    db.set(`snipemsg_${message.channel.id}`, message.content)
    db.set(`snipesender_${message.channel.id}`, message.author.id)
})

bot.on('message', message => {
    if(message.content === '!snipe') {
        let msg = db.get(`snipemsg_${message.channel.id}`)
        let senderid = db.get(`snipesender_${message.channel.id}`)
        if(!msg) {
            return message.channel.send(`There is nothing to snipe. BOOMER`)
        }
        let embed = new Discord.MessageEmbed()
        .setTitle(bot.users.cache.get(senderid).username, bot.users.cache.get(senderid).displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(msg)
        .setColor("RANDOM")
        .setTimestamp()
        message.channel.send(embed)
    }
})