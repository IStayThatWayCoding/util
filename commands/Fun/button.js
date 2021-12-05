const { MessageButton } = require('discord-buttons')

module.exports = {
    name: 'button',
    usage: `button`,
    run: async (bot, message, args) => {
        
        const button = new MessageButton()
        .setLabel('test')
        .setStyle('gray')
        .setID("btn1")
    
        message.channel.send("test", button)

    }
}