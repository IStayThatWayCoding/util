module.exports = {
    name: 'shutdown',
    aliases: ['s'],
    category: 'Owner',
    description: 'CAN ONLY BE USED BY OWNER: shuts down the bot',
    usage: `shutdown`,
    run: async (bot, message, args) => {

        const allowed = [
            "274021702411747328",
            "832122159333376062"
            
        ]
        if(!allowed.includes(message.author.id)) return message.channel.send("You must be the bot owner to use this command.")

        try {
            await message.channel.send("Shutting down...")
            process.exit()
        } catch (e) {
            message.channel.send(`ERROR: ${e.message}`)
        }
    }
}