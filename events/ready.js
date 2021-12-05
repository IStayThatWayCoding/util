module.exports = bot => {
    console.log(`${bot.user.username} is online`);
    
    bot.user.setActivity("my beta phase.", {
      type: "STREAMING",
      url: "https://www.twitch.tv/istaythatway"
    });
}